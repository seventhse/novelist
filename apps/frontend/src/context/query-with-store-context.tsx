import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Provider as JotaiProvider } from "jotai"
import { queryClientAtom } from "jotai-tanstack-query"
import { useHydrateAtoms } from "jotai/react/utils"
import type { PropsWithChildren } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (import.meta.env.DEV) console.error("Retry error:", { failureCount, error })

        if (failureCount >= 0 && import.meta.env.DEV) return false
        if (failureCount > 3 && import.meta.env.PROD) return false

        return false
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000
    },
    mutations: {
      onError: (error) => {
        console.error("ReactQuery mutation error:", error)
      }
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error("ReactQuery error:", error)
      }
    }
  })
})

const HydrateAtoms = ({ children }: PropsWithChildren) => {
  useHydrateAtoms([[queryClientAtom, queryClient]])
  return children
}

export function QueryWithStoreProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <HydrateAtoms>{children}</HydrateAtoms>
      </JotaiProvider>
    </QueryClientProvider>
  )
}
