import baseConfig from "@internal/tailwind-config"

/** @type {import('tailwindcss').Config} */
export default {
  // Spread the base config first
  ...baseConfig,
  // Override darkMode if needed
  darkMode: ["class"],
  // Define content sources
  content: [
    // Include UI package components
    "../../packages/ui/src/**/*.{ts,tsx}",
    // Include internal CSS files
    "../../internal/tailwind-config/**/*.css",
    // Include local files
    "./index.html",
    "./src/app.css",
    "./src/**/*.{js,ts,jsx,tsx}"
  ]
}
