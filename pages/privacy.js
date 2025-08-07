// pages/privacy.js

import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Daily Healthy Recipe</title>
        <meta name="description" content="Our privacy policy explains how we collect and protect your data when using Daily Healthy Recipe." />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main className="min-h-screen bg-white text-gray-800 px-6 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-block text-purple-700 font-semibold border border-purple-300 rounded px-4 py-2 hover:bg-purple-50 transition"
          >
            ← Home
          </Link>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-purple-700">Privacy Policy</h1>

          <p>
            At <strong>Daily Healthy Recipe</strong>, your privacy is important to us. This policy outlines how we collect, use, and protect your personal data.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Your email address when you subscribe to our daily recipe newsletter.</li>
              <li>Anonymous usage data (e.g., pages viewed, time on site).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To send you a new healthy recipe each day via email.</li>
              <li>To improve our website and content based on usage patterns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Third-Party Services</h2>
            <p>
              We use <strong>EmailOctopus</strong> to manage our mailing list and send you recipes. EmailOctopus stores your email address securely and does not sell your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
            <p>
              We may use cookies to track anonymous usage statistics to improve the site. These do not store personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Opting Out</h2>
            <p>
              You can unsubscribe at any time by clicking the “Unsubscribe” link in any recipe email, or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
            <p>
              If you have any questions about this policy, email us at:{" "}
              <a href="mailto:contact@dailyhealthyrecipe.com" className="text-blue-600 underline">
                contact@dailyhealthyrecipe.com
              </a>
            </p>
          </section>

          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </main>
    </>
  );
}
