import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [recipe, setRecipe] = useState(null);
  const [protein, setProtein] = useState("all");

  useEffect(() => {
    fetch(`/api/recipe?protein=${protein}`)
      .then(res => res.json())
      .then(setRecipe);
  }, [protein]);

  return (
    <>
      <Head>
        <title>Healthy Recipe of the Day</title>
        <meta name="description" content="Get a healthy recipe each day based on your favorite protein!" />
      </Head>
      <main className="min-h-screen bg-lime-50 px-4 py-10 flex justify-center">
        <div className="max-w-4xl w-full bg-green-50 p-6 rounded-xl shadow space-y-6">
          <h1 className="text-3xl font-bold text-center text-green-700">Healthy Recipe of the Day</h1>
          <div className="text-center">
            <label htmlFor="protein" className="block mb-2 text-lg font-medium">Choose your protein:</label>
            <select
              id="protein"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="all">All Proteins</option>
              <option value="chicken">Chicken</option>
              <option value="tofu">Tofu</option>
              <option value="egg">Egg</option>
              <option value="chickpea">Chickpea</option>
              <option value="paneer">Paneer</option>
              <option value="beef">Beef</option>
              <option value="fish">Fish</option>
              <option value="shrimp">Shrimp</option>
            </select>
          </div>

          {recipe ? (
            <div className="space-y-4 text-gray-800 text-center">
              <h2 className="text-2xl font-semibold">{recipe.title}</h2>
              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className="mx-auto rounded shadow max-h-80" />
              )}
              <div className="text-left space-y-2 bg-white p-4 rounded shadow">
                <h3 className="font-bold">Ingredients:</h3>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>
                <h3 className="font-bold mt-4">Steps:</h3>
                <ol className="list-decimal list-inside">
                  {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
                </ol>
                <p className="mt-4"><strong>Calories:</strong> {recipe.calories}</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading recipe...</p>
          )}
        </div>
      </main>
    </>
  );
}
