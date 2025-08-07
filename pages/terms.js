// pages/terms.js

import Head from "next/head";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | Daily Healthy Recipe</title>
        <meta name="description" content="Terms of use for visitors and subscribers of Daily Healthy Recipe." />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white text-gray-800 px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-purple-700">Terms of Service</h1>

          <p>
            Welcome to <strong>Daily Healthy Recipe</strong>. By using this website, you agree to the following terms and conditions. Please read them carefully.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. Use of Content</h2>
            <p>
              All recipes, images, and content on this site are for personal, non-commercial use only. Reproduction or redistribution without permission is not allowed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Email Subscription</h2>
            <p>
              When you sign up, we’ll send you a daily recipe to your email. You can unsubscribe at any time. We use EmailOctopus to manage our email list securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Third-Party Links</h2>
            <p>
              Some recipes may link to third-party websites or affiliate sources. We are not responsible for the content or privacy practices of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Changes to the Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Disclaimer</h2>
            <p>
              Recipes and nutritional information are provided for general information only. Always consult a healthcare provider or nutritionist for dietary advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
            <p>
              Questions? Contact us at <a href="mailto:hello@dailyhealthyrecipe.com" className="text-blue-600 underline">hello@dailyhealthyrecipe.com</a>
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
