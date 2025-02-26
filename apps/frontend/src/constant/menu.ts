import type { MenuItem } from "~/components/nav-menu"
import { BasicRoute } from "./basic-routes"
import { CommandEnum } from "./command"

export const NavMainMenu: MenuItem[] = [
  {
    id: "Search",
    title: "menu.search", // 对应 locales 中的 menu.search
    icon: "search",
    command: CommandEnum.OpenCommandPalette
  },
  {
    id: "AskAi",
    title: "menu.askAi", // 对应 locales 中的 menu.askAi
    icon: "sparkles",
    url: "/ask-ai",
    meta: {
      title: "menu.askAi"
    }
  },
  {
    id: "Home",
    title: "menu.home", // 对应 locales 中的 menu.home
    url: BasicRoute.Workspace,
    mainNav: true,
    icon: "home",
    meta: {
      title: "menu.home"
    }
  }
]

export const NavWorkspaceMenu: MenuItem[] = [
  {
    id: "Collections",
    title: "menu.collections", // 对应 locales 中的 menu.collections
    icon: "book-marked",
    url: "/collections",
    meta: {
      title: "menu.collections"
    }
  }
]

export const NavResourceMenu: MenuItem[] = [
  {
    id: "Realms",
    title: "menu.realms", // 对应 locales 中的 menu.realms
    url: "/realms",
    icon: "globe",
    meta: {
      title: "menu.realms"
    }
  },
  {
    id: "Characters",
    title: "menu.characters", // 对应 locales 中的 menu.characters
    url: "/characters",
    icon: "smile",
    meta: {
      title: "menu.characters"
    },
    children: [
      {
        parentId: "Characters",
        parentUrl: "/characters",
        id: "CharactersCreate",
        title: "menu.charactersCreate",
        url: "create",
        hidden: false,
        meta: {
          title: "menu.charactersCreate"
        }
      },
      {
        parentId: "Characters",
        parentUrl: "/characters",
        id: "CharactersUpdate",
        title: "menu.charactersUpdate",
        url: "update/$id",
        hidden: true,
        meta: {
          title: "menu.charactersUpdate"
        }
      },
      {
        parentId: "Characters",
        parentUrl: "/characters",
        id: "CharactersDetail",
        title: "menu.charactersDetail",
        url: "detail/$id",
        hidden: true,
        meta: {
          title: "menu.charactersDetail"
        }
      }
    ]
  }
]

export const NavCommonMenu: MenuItem[] = [
  {
    id: "Setting",
    title: "settings.title", // 对应 locales 中的 settings.title
    icon: "settings",
    command: CommandEnum.OpenSetting
  },
  {
    id: "Help",
    title: "menu.helpCenter", // 对应 locales 中的 menu.helpCenter
    icon: "help-circle",
    url: "/help",
    meta: {
      title: "menu.helpCenter"
    }
  }
]

const Menus = [...NavMainMenu, ...NavWorkspaceMenu, ...NavResourceMenu, ...NavCommonMenu]

export type FlatMenuItem = MenuItem & { fullUrl: string }

function flattenMenus(menus: MenuItem[]): Array<FlatMenuItem> {
  return menus
    .flatMap((menu) => {
      let url = ""
      if (menu.url) {
        url = menu.url
      }

      if (menu.parentUrl) {
        url = `${menu.parentUrl}/${url}`
      }

      const fullUrl = url.replace(/\/\/+/g, "/")

      const flattened: FlatMenuItem = { ...menu, fullUrl }
      let result: FlatMenuItem[] = [flattened]

      if (menu.children?.length) {
        result = result.concat(flattenMenus(menu.children))
      }

      return result
    })
    .filter((item) => item.fullUrl)
}

export const ExistsUrlMenus = flattenMenus(Menus)

export const ExistsUrlMenuMap = ExistsUrlMenus.reduce<Record<string, FlatMenuItem>>((pre, cur) => {
  pre[cur.id] = cur
  return pre
}, {})

export default Menus
