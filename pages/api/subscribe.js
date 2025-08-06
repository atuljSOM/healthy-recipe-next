// pages/api/subscribe.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { email } = req.body;

  const response = await fetch("https://emailoctopus.com/api/1.6/lists/9d8692de-70ee-11f0-9885-411f60bd7e2c/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_key: "eo_e6900963ebb1175063b9b92bf629694f22d70fe531f532b862d2909f7b1907e7",
      email_address: email
    })
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json(data);
  }

  return res.status(200).json({ message: "Subscribed successfully!", data });
}
