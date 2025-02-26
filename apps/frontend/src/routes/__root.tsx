import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"

import { FullLoading } from "@novelist/ui"
import { GeneralError, NotFoundError } from "~/components/error"
import { ThemeProvider } from "~/context/theme-context"

export const Route = createRootRoute({
  component: () => {
    return (
      <ThemeProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="size-full overflow-hidden"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        {import.meta.env.DEV && (
          <>
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools />
          </>
        )}
      </ThemeProvider>
    )
  },
  wrapInSuspense: true,
  pendingComponent: FullLoading,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
})
