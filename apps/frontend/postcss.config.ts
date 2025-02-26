import baseConfig from "@internal/tailwind-config/postcss"
import tailwindConfig from "./tailwind.config.js"

/** @type {import('postcss').Config} */
export default {
  plugins: {
    ...baseConfig.plugins,
    tailwindcss: { config: tailwindConfig }
  }
}
