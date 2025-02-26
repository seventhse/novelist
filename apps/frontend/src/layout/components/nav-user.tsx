import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  SidebarMenuButton
} from "@novelist/ui"

import { useTranslation } from "@novelist/locales"
import { CommandEnum } from "~/constant/command"
import { useCommand } from "~/context/command-context"
import UserInfo from "./user-info"

export default function NavUser() {
  const command = useCommand()
  const { signOut } = useAuth()

  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <UserInfo />
          <Icon
            name="chevrons-up-down"
            className="ml-auto size-4"
          />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={"right"}
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <SignedIn>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="sparkle" />
              {t("common.upgradePro")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </SignedIn>

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              command.execute(CommandEnum.OpenSetting)
            }}
          >
            <Icon name="settings" />
            {t("settings.title")}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <SignedIn>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut()
            }}
          >
            <Icon name="log-out" />
            {t("common.logOut")}
          </DropdownMenuItem>
        </SignedIn>
        <SignedOut>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="log-in" />
              {t("common.signIn")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
