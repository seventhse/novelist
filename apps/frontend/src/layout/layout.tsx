import { Loading } from "@novelist/ui"
import { isElectron } from "@novelist/utils"
import { Outlet } from "@tanstack/react-router"
import { Suspense, lazy } from "react"

import { CommandProvider } from "~/context/command-context"

import { LoadMotion } from "./components/load-motion"
import DefaultLayout from "./default"
import DesktopLayout from "./desktop"

const LazyAppSettings = lazy(() => import("~/layout/components/settings/setting-dialog"))

export function Layout() {
  const Wrapper = isElectron() ? DesktopLayout : DefaultLayout

  return (
    <CommandProvider>
      <Wrapper>
        <Suspense fallback={<Loading loading />}>
          <LoadMotion>
            <Outlet />
          </LoadMotion>
        </Suspense>
        <Suspense>
          <LazyAppSettings />
        </Suspense>
      </Wrapper>
    </CommandProvider>
  )
}
