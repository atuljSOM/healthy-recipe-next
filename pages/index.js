// pages/index.js

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
  let scriptEl = null;

  const loadScript = () => {
    const container = document.getElementById("eo_form_container");
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://eocampaign1.com/form/df92807e-70ef-11f0-8bd4-b7e922d54320.js";
    script.async = true;
    script.setAttribute("data-form", "df92807e-70ef-11f0-8bd4-b7e922d54320");
    container.appendChild(script);

    scriptEl = script;
  };

  loadScript();

  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      loadScript();
    }, 300);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    if (scriptEl?.remove) {
      scriptEl.remove();
    }
  };
}, []);


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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      
        {/* Favicon & Browser Icons */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      
        {/* Open Graph (optional, for social sharing) */}
        <meta property="og:title" content="Daily Healthy Recipe" />
        <meta property="og:description" content="Get a new, healthy recipe every day – powered by your favorite protein." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://www.dailyhealthyrecipe.com" />
      </Head>

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
                recipeInstructions: recipe.steps.map((step) => ({
                  "@type": "HowToStep",
                  text: step
                })),
                nutrition: {
                  "@type": "NutritionInformation",
                  calories: recipe.calories + " calories"
                }
              })
            }}
          />
        )}



      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-purple-100 to-rose-50 text-gray-900 font-sans py-10">

               <header className="w-screen px-4 flex items-center justify-between py-4 border-b border-gray-200 relative z-20 bg-white bg-opacity-70 backdrop-blur">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Daily Healthy Recipe logo"
            className="w-14 h-14 object-contain"
          />
          <div className="leading-snug text-left">
            <div className="text-xl sm:text-2xl font-extrabold text-purple-700 drop-shadow-md tracking-tight">
              Dailyhealthyrecipe.com
            </div>
          </div>
        </div>
      
        {/* Right: Menu Icon */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded hover:bg-purple-100 transition"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-purple-700" />
          </button>
      
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 border border-gray-100">
              <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                About
              </Link>
              <Link href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                Contact
              </Link>
            </div>
          )}
        </div>
      </header>

                
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 space-y-12">


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
                className="border border-purple-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 bg-purple-50 text-gray-800 shadow-sm"
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

              <div className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-semibold shadow">
                Next recipe in: <span className="font-mono">{timeLeft}</span>
              </div>

            </div>
          </section>

          {/* Recipe Section */}
          {recipe && recipe.title !== "Recipe Error" ? (

           <section className="w-full bg-[#f9f9f9] py-10 px-4 md:px-12">
  <h2 className="text-2xl font-bold text-center mb-10">Today's Healthy Recipe,Fresh and Unexpected</h2>

  <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
    {/* Floating Card */}
    <div className="md:col-span-7">
      <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 relative z-10">
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="rounded-2xl w-full h-auto object-cover max-h-[420px] shadow mb-6"
          />
        )}

        <h3 className="text-2xl font-bold mb-3 text-gray-800">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{recipe.calories} kcal</p>

        {recipe.nutrients?.length > 0 && (
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {recipe.nutrients.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        )}
      </div>
    </div>

    {/* Ingredients + Steps */}
    <div className="md:col-span-5 space-y-10">
      <div>
        <h4 className="text-lg font-semibold mb-2 text-gray-800">Ingredients</h4>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-2 text-gray-800">Steps</h4>
        <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2">
          {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </div>

      {recipe.affiliateLink && (
        <a
          href={recipe.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline block"
        >
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
            <h3 className="text-xl font-semibold mb-2">Subscribe to Daily Recipes</h3>
            <p className="text-sm text-gray-600 mb-4">Delivered fresh to your inbox every morning.</p>
            <div id="eo_form_container" className="flex justify-center w-full"></div>
          </section>


          {/* Footer */}
          <footer className="pt-10 text-center text-gray-400 text-sm border-t">
            <p>© {new Date().getFullYear()} DailyHealthyRecipe</p>
            <div className="space-x-4 mt-2">
              <a href="/terms" className="hover:underline">Terms</a>
              <a href="/privacy" className="hover:underline">Privacy</a>
              <a href="/contact" className="hover:underline">Contact</a>
             <a href="/about" className="hover:underline">About</a>
            </div>
          </footer>
        </div>
      </main>
    </>
);

}
