import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ClerkProvider } from "@clerk/clerk-react"
import { zhCN } from "@clerk/localizations"
import i18n from "@novelist/locales"

import { RouterProvider, createRouter } from "@tanstack/react-router"
import { BasicRoute } from "./constant/basic-routes"
import { QueryWithStoreProvider } from "./context/query-with-store-context"
import { routeTree } from "./routeTree.gen"

import "@novelist/locales"
import "@internal/tailwind-config/globals.css"
import "./app.css"
import { unmountGlobalLoading } from "./unmount-global-loading"

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("[[Clerk]]: Missing Publishable Key")
}

// Render the app
const rootElement = document.getElementById("app")
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)
  let localization = {}

  if (i18n.language === "zh") {
    localization = zhCN
  }

  root.render(
    <StrictMode>
      <QueryWithStoreProvider>
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          signUpFallbackRedirectUrl={BasicRoute.Workspace}
          signInFallbackRedirectUrl={BasicRoute.Workspace}
          signInUrl={BasicRoute.SignIn}
          signUpUrl={BasicRoute.SignUp}
          i18nIsDynamicList={true}
          localization={localization}
        >
          <RouterProvider router={router} />
        </ClerkProvider>
      </QueryWithStoreProvider>
    </StrictMode>
  )

  unmountGlobalLoading()
}
