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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://eocampaign1.com/form/df92807e-70ef-11f0-8bd4-b7e922d54320.js";
    script.async = true;
    script.setAttribute("data-form", "df92807e-70ef-11f0-8bd4-b7e922d54320");
    document.getElementById("eo_form_container")?.appendChild(script);
  }, []);

   const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const pstNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
      const tomorrow = new Date(pstNow);
      tomorrow.setDate(pstNow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
  
      const diff = tomorrow - pstNow;
      const hours = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, "0");
      const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };
  
    updateCountdown(); // Initial call
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
       <Head>
        <title>Healthy Recipe of the Day | Daily Healthy Meals</title>
        <meta name="description" content="Discover a new healthy recipe each day based on your favorite protein source." />
        <meta name="keywords" content="healthy recipes, daily meals, easy cooking, high protein, recipe generator" />
        <meta name="author" content="DailyHealthyRecipe Team" />
      
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Today's Healthy Recipe" />
        <meta property="og:description" content="Fresh and unexpected recipes every day!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dailyhealthyrecipe.com" />
        <meta property="og:image" content="https://dailyhealthyrecipe.com/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

      
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      
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


      <main className="min-h-screen bg-gray-50 px-4 py-6">
        {/* Header Section */}
        <header className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 px-4 bg-white shadow-sm mb-6 gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
            <div className="ml-4 leading-snug text-center">
              <div className="text-2xl font-extrabold text-pink-500 drop-shadow-[2px_2px_0_#581c87] tracking-wide">
                DAILY HEALTHY
              </div>
              <div className="text-2xl font-extrabold text-pink-500 drop-shadow-[2px_2px_0_#581c87] tracking-wide">
                RECIPE
              </div>
            </div>
          </div>

                    {/* Header Controls: Countdown Timer and Protein Selector */}
          <div className="hidden sm:flex items-center justify-end gap-6 w-full">
            
            {/* Countdown Timer (Standalone, Left Side) */}
            <div className="text-right text-sm font-semibold text-emerald-700">
              <div className="uppercase tracking-wider text-xs text-gray-500">Next recipe in:</div>
              <div className="text-lg font-bold">{timeLeft}</div>
            </div>
          
            {/* Protein Dropdown with Tagline (Right Side) */}
            <div className="flex flex-col items-end">
              <p className="text-sm font-medium text-gray-600 mb-1 italic text-right">{tagline}</p>
              <label htmlFor="protein-choice-desktop" className="sr-only">Protein Choice</label>
              <select
                id="protein-choice-desktop"
                value={proteinChoice}
                onChange={(e) => setProteinChoice(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-[200px]"
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
            </div>
          </div>



        </header>

        <div className="w-full max-w-6xl mx-auto flex flex-col space-y-10">
          <section className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-emerald-700 leading-tight text-center">
              <span className="block">Today's Healthy Recipe,</span>
              <span className="block">Fresh and Unexpected</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700">Start your daily ritual of healthy eating. One nutritious recipe every day.</p>
          </section>

          <section className="flex sm:hidden flex-col items-center gap-2 mt-6">
            {(() => {
              const taglines = [
                "Fuel today with your favorite protein",
                "What's your protein mood today?",
                "Pick your protein power!",
                "Choose your protein adventure",
                "Tap into your inner tofu... or beef."
              ];
              const random = taglines[Math.floor(Math.random() * taglines.length)];
              return <p className="text-sm font-medium text-gray-600 italic text-center">{random}</p>;
            })()}
            <label htmlFor="protein-choice-mobile" className="sr-only">Protein Choice</label>
            <select
              id="protein-choice-mobile"
              value={proteinChoice}
              onChange={(e) => setProteinChoice(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-[200px]"
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

          {/* EmailOctopus Embed Script */}
           <section className="flex justify-center mt-10">
              <div id="eo_form_container" className="flex justify-center w-full"></div>
            </section>

          {/* Mobile Countdown Timer */}
          <section className="sm:hidden text-center text-sm font-semibold text-emerald-700 mt-4">
            <div className="uppercase tracking-wider text-xs text-gray-500">Next recipe in:</div>
            <div className="text-lg font-bold">{timeLeft}</div>
          </section>


          {/* Recipe Content */}
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
