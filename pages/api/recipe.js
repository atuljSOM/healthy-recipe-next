import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const { protein = "all" } = req.query;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
  const cacheKey = "recipe:" + protein + ":" + today;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.status(200).json(cached);
  } catch (err) {
    console.warn("Redis lookup failed:", err);
  }

  try {
    const searchParams = new URLSearchParams({
      number: 5,
      sort: "random",
      instructionsRequired: "true",
      fillIngredients: "true",
      addRecipeInformation: "true",
      addRecipeNutrition: "true",
      minProtein: "15",
      maxCalories: "500",
      apiKey,
    });

    if (protein !== "all") {
      searchParams.append("query", protein);
    }

    const searchUrl = "https://api.spoonacular.com/recipes/complexSearch?" + searchParams.toString();
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const candidates = searchData?.results || [];

    let recipe = null;

    for (const candidate of candidates) {
      const infoUrl = `https://api.spoonacular.com/recipes/${candidate.id}/information?includeNutrition=true&apiKey=${apiKey}`;
      const infoRes = await fetch(infoUrl);
      const fullData = await infoRes.json();

      const ingredients = fullData.extendedIngredients?.map(i => i.original.toLowerCase()) || [];

      const containsRealProtein = (proteinType) => {
        const meatRegex = {
          chicken: /chicken (breast|thigh|meat|cutlet|drumstick|tender|ground)/,
          beef: /beef|steak|ground beef/,
          tofu: /tofu/,
          chickpea: /chickpea/,
          egg: /egg(?!nog)/,
          paneer: /paneer/,
          pork: /pork|bacon/,
          fish: /salmon|cod|tilapia|fish/,
          shrimp: /shrimp|prawn/
        };

        if (!proteinType || !meatRegex[proteinType]) return true; // skip filter if 'all'
        return ingredients.some(ing => meatRegex[proteinType].test(ing));
      };

      if (protein === "all" || containsRealProtein(protein)) {
        recipe = fullData;
        break;
      }
    }

    if (!recipe) throw new Error("No valid recipe found");

    const nutrients = recipe?.nutrition?.nutrients?.map(n =>
      n.name + ": " + n.amount + " " + n.unit
    ) || [];

    const responseData = {
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.extendedIngredients?.map(i => i.original) || [],
      steps: recipe.analyzedInstructions?.[0]?.steps?.map(s => s.step) || [],
      calories: Math.round(
        recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0
      ),
      nutrients,
      affiliateLink: recipe.sourceUrl || null,
    };

    await redis.set(cacheKey, responseData, { ex: 86400 });

    res.status(200).json(responseData);
  } catch (err) {
    console.error("❌ Recipe fetch error:", err);
    res.status(500).json({ title: "Recipe Error", ingredients: [], steps: [], calories: 0, nutrients: [] });
  }
}
