// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Daily Healthy Recipe</title>
        <meta name="description" content="Learn about the mission of DailyHealthyRecipe.com – delivering one high-protein, low-calorie recipe each day." />
      </Head>
      <main className="min-h-screen px-6 py-10 bg-lime-50 text-gray-800">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-4 text-green-700">About Us</h1>
          <p className="mb-4">
            Welcome to <strong>DailyHealthyRecipe.com</strong> – your trusted source for a <strong>new high-protein, low-calorie recipe every single day</strong>.
          </p>
          <p className="mb-4">
            We believe healthy eating shouldn’t feel like a chore. That’s why we’ve built this platform to <strong>deliver one carefully curated recipe each day</strong> — a flavorful, nutritious meal that’s easy to follow and keeps your health goals on track.
          </p>
          <p className="mb-4">
            But we’re not just about recipes. We’re about <strong>building a daily ritual</strong>, one that creates <strong>anticipation and excitement</strong>. Every time you visit, you’ll discover something fresh — and you'll know that tomorrow holds something new to look forward to.
          </p>
          <p>
            Whether you're into chicken, tofu, fish, or plant-based proteins, we’ve got something for everyone — always focused on <strong>low-calorie and high-protein balance</strong> to fuel your body right.
          </p>
        </div>
      </main>
    </>
  );
}
