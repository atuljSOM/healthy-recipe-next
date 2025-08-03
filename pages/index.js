import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function HealthyRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [proteinChoice, setProteinChoice] = useState("all");

  useEffect(() => {
    fetch(`/api/recipe?protein=${proteinChoice}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("Failed to fetch recipe", err));
  }, [proteinChoice]);

  return (
    <>
      <Head>
        <title>Healthy Recipe of the Day | Daily Healthy Meals</title>
        <meta name="description" content="Discover a new healthy recipe each day based on your favorite protein source." />
        <meta name="keywords" content="healthy recipes, daily meals, high protein, recipe generator" />
        <meta name="author" content="DailyHealthyRecipe Team" />
        <meta property="og:title" content="Healthy Recipe of the Day" />
        <meta property="og:description" content="Daily high-protein, low-calorie recipes powered by Spoonacular." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={recipe?.image || "/default-image.jpg"} />
        <link rel="icon" href="/favicon.ico" />

        {recipe && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Recipe",
                name: recipe.title,
                image: recipe.image,
                author: { "@type": "Organization", name: "DailyHealthyRecipe" },
                description: `A healthy and delicious recipe featuring ${proteinChoice}`,
                prepTime: "PT10M",
                cookTime: "PT20M",
                totalTime: "PT30M",
                recipeIngredient: recipe.ingredients,
                recipeInstructions: recipe.steps.map((step) => ({ "@type": "HowToStep", text: step })),
                nutrition: { "@type": "NutritionInformation", calories: recipe.calories + " calories" }
              })
            }}
          />
        )}
      </Head>

      <main className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
        <div className="w-full max-w-6xl flex flex-col space-y-10">
          <section className="text-center">
            <h1 className="text-4xl font-extrabold text-emerald-700">🥗 Healthy Recipe of the Day</h1>
            <p className="mt-4 text-lg text-gray-700">Start your daily ritual of healthy eating. One nutritious recipe every day.</p>
          </section>

          <section className="text-center">
            <label htmlFor="protein-choice" className="block text-gray-600 font-semibold mb-2">Choose your protein:</label>
            <select
              id="protein-choice"
              value={proteinChoice}
              onChange={(e) => setProteinChoice(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Proteins</option>
              <option value="chicken">Chicken</option>
              <option value="egg">Egg</option>
              <option value="chickpea">Chickpea</option>
              <option value="tofu">Tofu</option>
              <option value="paneer">Paneer</option>
              <option value="beef">Beef</option>
              <option value="pork">Pork</option>
              <option value="fish">Fish</option>
              <option value="shrimp">Shrimp</option>
            </select>
          </section>

          <hr className="border-gray-300" />

          {recipe ? (
            recipe.title === "Recipe Error" ? (
              <div className="text-center text-red-500 text-lg font-medium">
                No matching recipe found. Try a different protein.
              </div>
            ) : (
              <section className="space-y-8 text-gray-800">
                <h2 className="text-2xl font-bold text-center">{recipe.title}</h2>
                {recipe.image && <img src={recipe.image} alt={recipe.title} className="rounded-xl shadow mx-auto max-h-96" />}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
                    <h3 className="font-semibold text-lg mb-2">Steps</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm">
                  <p><strong>Calories:</strong> {recipe.calories ?? "N/A"} kcal</p>
                  <div className="mt-2">
                    <h4 className="font-semibold">Nutritional Info</h4>
                    {recipe.nutrients?.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {recipe.nutrients.map((n, i) => <li key={i}>{n}</li>)}
                      </ul>
                    ) : (
                      <p className="text-sm italic text-gray-500">No nutritional breakdown available.</p>
                    )}
                  </div>

                  {recipe.affiliateLink && (
                    <a href={recipe.affiliateLink} target="_blank" rel="noopener noreferrer" className="block mt-4 text-emerald-600 hover:underline">
                      View Full Recipe Source
                    </a>
                  )}
                </div>
              </section>
            )
          ) : (
            <p className="text-center text-gray-500 italic">Loading your recipe...</p>
          )}

          <footer className="pt-10 border-t mt-10 text-sm text-gray-500 text-center">
            <p>© {new Date().getFullYear()} DailyHealthyRecipe</p>
            <div className="mt-2 space-x-4">
              <a href="/about" className="hover:underline">About</a>
              <a href="/privacy" className="hover:underline">Privacy</a>
              <a href="/terms" className="hover:underline">Terms</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
