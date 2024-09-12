"use client"; 

import { useState, useEffect } from "react";
import "./../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <html lang="en">
      <body>
        <header>
          <button onClick={() => setDarkMode(!darkMode)}>
            Switch to {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>
        {children}
      </body>
    </html>
  );
}
