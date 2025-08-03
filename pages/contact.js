import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Daily Healthy Recipe</title>
        <meta
          name="description"
          content="Have a question or suggestion? Reach out to the Daily Healthy Recipe team!"
        />
      </Head>

      <main className="min-h-screen bg-lime-50 px-4 py-10 flex justify-center">
        <div className="max-w-2xl bg-white rounded-xl shadow-xl p-6 text-gray-800 space-y-6">
          <h1 className="text-3xl font-bold text-green-700 text-center mb-4">Contact Us</h1>

          <p className="text-lg text-gray-700 text-center">
            We'd love to hear from you! Whether you have a question, suggestion, or feedback, feel free to reach out.
          </p>

          <div className="space-y-4 text-base">
            <p>
              📧 <strong>Email us at:</strong>{" "}
              <a
                href="mailto:contact@dailyhealthyrecipe.com"
                className="text-green-700 underline"
              >
                contact@dailyhealthyrecipe.com
              </a>
            </p>

            <p>
              🗓️ <strong>Business Hours:</strong> Monday to Friday, 9am - 5pm (EST)
            </p>

            <p>
              🚀 <strong>Want to collaborate or advertise?</strong> We're always open to partnerships! Drop us a message and
              let’s chat.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
