import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  cn
} from "@novelist/ui"
import { Link } from "@tanstack/react-router"
import Logo from "~/assets/images/logo.png"
import { type MenuItem, NavGroupMenu, NavMenu } from "~/components/nav-menu"
import { BasicRoute } from "~/constant/basic-routes"
import { NavCommonMenu, NavMainMenu, NavResourceMenu, NavWorkspaceMenu } from "~/constant/menu"
import { useCommand } from "~/context/command-context"
import NavUser from "../components/nav-user"

export default function AppSidebar() {
  const command = useCommand()

  const executeCommand = (item: MenuItem) => {
    if (item.command) {
      command.execute(item.command)
    }
  }

  return (
    <Sidebar
      className="border-none flex-auto"
      variant="inset"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <Link to={BasicRoute.Workspace}>
                <div
                  className={cn(
                    "flex aspect-square size-8 items-center justify-center",
                    "rounded-lg bg-primary text-sidebar-primary-foreground"
                  )}
                >
                  <img
                    src={Logo}
                    alt="logo"
                    className="size-8 rounded-lg"
                  />
                </div>
                <div className="flex-1 text-foreground font-bold text-lg tracking-widest">Novolist</div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMenu
          items={NavMainMenu}
          onClick={executeCommand}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavGroupMenu
          label="Workspace"
          items={NavWorkspaceMenu}
        />
        <NavGroupMenu
          label="Material"
          items={NavResourceMenu}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavMenu
          items={NavCommonMenu}
          onClick={executeCommand}
        />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
