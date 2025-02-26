import { Separator, SidebarInset, SidebarProvider, SidebarTrigger } from "@novelist/ui"
import type { PropsWithChildren } from "react"
import PageBreadcrumb from "../components/page-breadcrumb"
import { LayoutProvider } from "../context/layout-context"
import AppSidebar from "./app-sidebar"

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <LayoutProvider>
      <SidebarProvider className="max-h-screen max-w-screen">
        <AppSidebar />
        <SidebarInset className="gap-y-0">
          <header className="flex-[0_0_4rem] flex h-18 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 h-4"
              />
              <PageBreadcrumb />
            </div>
          </header>
          <div className="flex-1 flex-col size-full overflow-y-auto">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </LayoutProvider>
  )
}
