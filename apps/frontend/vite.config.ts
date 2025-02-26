import path from "node:path"

import { ViteInjectHtmlPlugin } from "@internal/vite-config"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src")
      }
    },
    plugins: [TanStackRouterVite(), react(), ViteInjectHtmlPlugin()]
  }
})
