// pages/about.js

import Head from "next/head";
import Link from "next/link";


export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | Daily Healthy Recipe</title>
        <meta
          name="description"
          content="Learn more about the mission behind Daily Healthy Recipe and the team that makes it happen."
        />
        <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />

      </Head>

      <main className="min-h-screen bg-white text-gray-800 px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-purple-700">About Daily Healthy Recipe</h1>

          <p>
            <strong>Daily Healthy Recipe</strong> was created with one simple mission: to make healthy eating easier, more exciting, and more accessible to everyone — one day at a time.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">Why We Exist</h2>
            <p>
              We know that food is a big part of your life — and when it's healthy, it should also be delicious, simple, and inspiring.
              Whether you're a busy professional, a parent, or someone just trying to eat better, we’re here to help you build that habit one bite at a time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">What We Do</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Deliver a brand-new, healthy recipe every single day</li>
              <li>Let you filter by protein preferences (like tofu, fish, chicken, and more)</li>
              <li>Make it easy to build variety into your diet — effortlessly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Our Philosophy</h2>
            <p>
              We believe in:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Consistency over perfection.</strong> One healthy meal a day is a great start.</li>
              <li><strong>Simple wins.</strong> You don't need complicated ingredients or expensive tools to eat well.</li>
              <li><strong>Joy in food.</strong> Healthy shouldn't be boring.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Made with 💜</h2>
            <p>
              Daily Healthy Recipe is a small passion project, built for everyday people who want to make small, sustainable changes — without the pressure of diets or trends.
            </p>
          </section>

          <p className="text-sm text-gray-500">
            Have questions? Email us at:{" "}
            <a href="mailto:hello@dailyhealthyrecipe.com" className="text-blue-600 underline">
              hello@dailyhealthyrecipe.com
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
