// pages/index.js

import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function HomePage() {
  const [recipe, setRecipe] = useState(null);
  const [proteinChoice, setProteinChoice] = useState("all");
  const [timeLeft, setTimeLeft] = useState("");

  // Fetch daily recipe
  useEffect(() => {
    fetch(`/api/recipe?protein=${proteinChoice}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(err => console.error("Error fetching recipe", err));
  }, [proteinChoice]);

  // Countdown to midnight PST
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

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Daily Healthy Recipe | Fresh Recipe Every Day</title>
        <meta name="description" content="Discover a new healthy recipe each day. Choose your protein and start cooking." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-rose-50 text-gray-900 font-sans px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Header */}
          <section className="text-center space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Discover a New Recipe Every Day
            </h1>
            <p className="text-gray-600 text-lg">
              Tired of eating the same thing? Explore new flavors and healthy recipes, one day at a time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <select
                value={proteinChoice}
                onChange={(e) => setProteinChoice(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm"
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

              <div className="bg-red-400 text-white rounded-lg px-4 py-2 text-sm font-semibold shadow">
                Next recipe in: <span className="font-mono">{timeLeft}</span>
              </div>
            </div>
          </section>

          {/* Recipe Section */}
          {recipe && recipe.title !== "Recipe Error" ? (
            <section className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-center">Today’s Recipe</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  {recipe.image && (
                    <img src={recipe.image} alt={recipe.title} className="rounded-xl w-full object-cover shadow" />
                  )}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{recipe.title}</h3>
                    <p className="text-sm text-gray-600">{recipe.calories} kcal</p>
                    {recipe.nutrients?.length > 0 && (
                      <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                        {recipe.nutrients.map((n, i) => <li key={i}>{n}</li>)}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-semibold text-md mb-1">Ingredients</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm">
                      {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-md mb-1">Steps</h4>
                    <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                      {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                  </div>

                  {recipe.affiliateLink && (
                    <a href={recipe.affiliateLink} target="_blank" rel="noopener noreferrer"
                      className="text-emerald-600 text-sm hover:underline block mt-4">
                      View full recipe →
                    </a>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <p className="text-center italic text-gray-500">Loading recipe...</p>
          )}

          {/* Subscribe */}
          <section className="bg-white bg-opacity-80 backdrop-blur rounded-xl p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Subscribe</h3>
            <p className="text-sm text-gray-600 mb-4">Get a recipe in your inbox every day</p>
            <div id="eo_form_container" className="flex justify-center"></div>
          </section>

          {/* Footer */}
          <footer className="pt-10 text-center text-gray-400 text-sm border-t">
            <p>© {new Date().getFullYear()} DailyHealthyRecipe</p>
            <div className="space-x-4 mt-2">
              <a href="/terms" className="hover:underline">Terms</a>
              <a href="/privacy" className="hover:underline">Privacy</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
