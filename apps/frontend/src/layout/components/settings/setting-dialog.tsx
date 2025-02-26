"use client"

import { Suspense, memo, useMemo, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Icon,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@novelist/ui"

import { useTranslation } from "@novelist/locales"
import { CommandList } from "~/constant/command"
import { useRegisterCommand } from "~/context/command-context"
import { SettingNav } from "./constant"

export function SettingsDialog() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(SettingNav[0].key)
  const { t } = useTranslation()

  const activeMenu = useMemo(() => {
    return SettingNav.find((item) => item.key === active)
  }, [active])

  useRegisterCommand({
    ...CommandList.OpenSetting,
    execute: () => setOpen(true)
  })

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="overflow-hidden flex flex-col p-0 h-full max-w-[768px] min-h-[600px] lg:max-h-[60vh] lg:max-w-[1024px]">
        <DialogTitle className="sr-only">{t("settings.title")}</DialogTitle>
        <DialogDescription className="sr-only">{t("setting.description")}</DialogDescription>
        <SidebarProvider className="h-full min-h-full max-h-full overflow-hidden">
          <Sidebar
            collapsible="none"
            className="p-3 h-full max-w-[220px]"
          >
            <SidebarHeader>
              <h3 className="text-xl font-fold">{t("settings.title")}</h3>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {SettingNav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.key === active}
                          onClick={() => {
                            if (item.key === active) {
                              return
                            }
                            setActive(item.key)
                          }}
                        >
                          <Icon name={item.icon} />
                          <span>{t(item.name)}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex-auto overflow-hidden pt-9">
            <div className="w-full max-h-full max-w-[600px] mx-auto overflow-hidden p-3 overflow-y-auto">
              <div className="text-left border-b-[1px] border-border pb-3 mb-9">
                <h3 className="text-base font-bold">{t(activeMenu?.name || "")}</h3>
                <p className="text-xs text-muted-foreground">{t(activeMenu?.desc || "")}</p>
              </div>
              <Suspense>{!!activeMenu?.com && <activeMenu.com />}</Suspense>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

export default memo(SettingsDialog)
