import type { PropsWithChildren } from "react"

function SettingSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="border-b-[1px] border-border">
      <div className="h-8 shrink-0 text-sm font-medium text-sidebar-foreground/70">{title}</div>
      {children}
    </div>
  )
}

function SettingItem({
  title,
  description,
  children
}: {
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-left">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}

export { SettingSection, SettingItem }
