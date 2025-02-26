import type { PropsWithChildren } from "react"
import UserInfo from "../components/user-info"
import MacosWindowManageTools from "./macos-window-manage-tools"
import WindowTitle from "./window-title"

export default function DesktopLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex flex-col max-h-screen overflow-hidden">
      <header
        className="w-full gap-3 px-3 py-2 flex justify-between items-center shadow-lg"
        data-drag-area
      >
        <MacosWindowManageTools />
        <WindowTitle />
        <UserInfo />
      </header>
      <main className="p-2 sm:p-6 flex-auto size-full max-h-full overflow-auto">{children}</main>
    </div>
  )
}
