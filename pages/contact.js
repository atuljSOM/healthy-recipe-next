// pages/contact.js

import Head from "next/head";
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Daily Healthy Recipe</title>
        <meta name="description" content="Get in touch with the Daily Healthy Recipe team. We'd love to hear from you!" />
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
          <h1 className="text-3xl font-bold text-purple-700">Contact Us</h1>

          <p>
            We'd love to hear from you! Whether it's feedback, a recipe idea, or a question about our daily emails — feel free to reach out.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Email</h2>
            <p>
              Send us a message at:{" "}
              <a href="mailto:contact@dailyhealthyrecipe.com" className="text-blue-600 underline">
                hello@dailyhealthyrecipe.com
              </a>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Social</h2>
            <p>Follow us for healthy inspiration and updates:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <a
                  href="https://instagram.com/dailyhealthyrecipe_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group"
                >
                  <Instagram className="w-5 h-5 text-gray-800 group-hover:text-pink-600" />
                  <span className="text-blue-600 group-hover:underline">@dailyhealthyrecipe_</span>
                </a>
              </li>
            </ul>
          </section>

          <p className="text-sm text-gray-500">
            We typically respond within 1–2 business days.
          </p>
        </div>
      </main>
    </>
  );
}
