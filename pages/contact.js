import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | DailyHealthyRecipe</title>
        <meta name="description" content="Get in touch with us for feedback, questions, or partnership inquiries." />
      </Head>

      <main className="min-h-screen bg-lime-50 px-4 py-10 flex justify-center">
        <div className="w-full max-w-3xl bg-green-50 shadow-2xl rounded-2xl p-6 sm:p-10 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700">📬 Contact Us</h1>

          <p className="text-gray-700 text-center">
            We'd love to hear from you! Whether you have feedback, questions, or collaboration ideas, drop us a message.
          </p>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 mb-4">
              You can reach us directly at:
            </p>
            <p className="font-semibold text-green-800">📧 support@dailyhealthyrecipe.com</p>
          </div>

          <p className="text-sm text-center text-gray-400">
            We'll do our best to respond within 24–48 hours.
          </p>
        </div>
      </main>
    </>
  );
}
