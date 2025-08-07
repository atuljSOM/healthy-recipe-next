// pages/index.js

import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function HomePage() {
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
  <div className="w-screen border-8 border-red-500">
    <main className="bg-white py-10">
      <section className="w-full px-4 md:px-12 border-4 border-blue-500">
        <div className="w-full border-4 border-green-500">
          Hello full width test
        </div>
      </section>
    </main>
  </div>
);

}
