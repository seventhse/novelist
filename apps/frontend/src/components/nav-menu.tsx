import { useTranslation } from "@novelist/locales"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  type IconName,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@novelist/ui"
import { Link, useLocation } from "@tanstack/react-router"
import type { MouseEvent } from "react"
import type { CommandEnum } from "~/constant/command"
import type { LayoutMetaInfo } from "~/layout/context/layout-context"

export interface MenuItem {
  id: string
  title: string
  parentId?: string
  parentUrl?: string
  mainNav?: boolean
  icon?: IconName
  url?: string
  meta?: LayoutMetaInfo
  children?: MenuItem[]
  command?: CommandEnum
  hidden?: boolean
}

export type MenuClickCallback = (item: MenuItem, e: MouseEvent) => void

export interface NavMenuItemProps {
  item: MenuItem
  href: string
  isSub?: boolean
  onClick?: MenuClickCallback
}

function checkIsActive(href: string, item: MenuItem, mainNav = false, visitedItems: Set<string> = new Set()): boolean {
  if (!item.url) {
    return false
  }

  // 循环引用检测
  if (visitedItems.has(item.id)) {
    console.warn(`Detected circular reference in menu item: ${item.id}`)
    return false
  }

  visitedItems.add(item.id)

  const check = (url: string) => {
    const baseHref = href.split("?")[0]
    const pattern = url.replace(/\/\$[^/]+/g, "/([^/]+)")
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(baseHref) || (mainNav && href.split("/")[1] !== "" && href.split("/")[1] === url?.split("/")[1])
  }

  const isSelfActive = check(item.url) || (!!item.parentUrl && check(`${item.parentUrl}/${item.url}`))

  // 递归检查子级
  if (item.children?.length) {
    return isSelfActive || item.children.some((child) => checkIsActive(href, child, mainNav, new Set(visitedItems)))
  }

  return isSelfActive
}

function MenuContent({ item }: { item: MenuItem }) {
  const { t } = useTranslation()
  return (
    <>
      {item.icon && <Icon name={item.icon} />}
      <span>{t(item.title)}</span>
    </>
  )
}

function getContentNode(item: MenuItem) {
  if (item.url) {
    return (
      <Link to={`${item.parentId ? `${item.parentUrl}/${item.url}` : item.url}`}>
        <MenuContent item={item} />
      </Link>
    )
  }

  return <MenuContent item={item} />
}

export function NavMenuItem({ item, isSub, onClick, href }: NavMenuItemProps) {
  const contentNode = getContentNode(item)

  const Component = isSub ? SidebarMenuSubButton : SidebarMenuButton

  return (
    <Component
      asChild={!!item.url}
      isActive={checkIsActive(href, item, item.mainNav)}
      onClick={(e) => onClick?.(item, e)}
    >
      {contentNode}
    </Component>
  )
}

export interface NavMenuProps {
  items: MenuItem[]
  onClick?: MenuClickCallback
}

function CollapsibleMenu({ item, href, onClick }: NavMenuItemProps) {
  return (
    <Collapsible>
      <SidebarMenuItem>
        <NavMenuItem
          item={item}
          href={href}
          onClick={onClick}
        />
        <CollapsibleTrigger asChild>
          <SidebarMenuAction className="data-[state=open]:rotate-90 group hover:text-primary">
            <Icon name="chevron-right" />
            <span className="sr-only">Toggle</span>
          </SidebarMenuAction>
        </CollapsibleTrigger>
      </SidebarMenuItem>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.children
            ?.filter((item) => !item.hidden)
            .map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <NavMenuItem
                  item={subItem}
                  href={href}
                  onClick={onClick}
                  isSub
                />
              </SidebarMenuSubItem>
            ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function NavMenu({ items, onClick }: NavMenuProps) {
  const href = useLocation({ select: (location) => location.href })
  return (
    <SidebarMenu>
      {items.map((item) =>
        !item?.children?.filter((item) => !item.hidden)?.length ? (
          <SidebarMenuItem key={item.title}>
            <NavMenuItem
              item={item}
              href={href}
              onClick={onClick}
            />
          </SidebarMenuItem>
        ) : (
          <CollapsibleMenu
            key={item.title}
            item={item}
            href={href}
            onClick={onClick}
          />
        )
      )}
    </SidebarMenu>
  )
}

export interface NavGroupMenuProps extends NavMenuProps {
  label: string
}

export function NavGroupMenu({ label, items, onClick }: NavGroupMenuProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <NavMenu
        items={items}
        onClick={onClick}
      />
    </SidebarGroup>
  )
}
