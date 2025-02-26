import { useTranslation } from "@novelist/locales"
import { useMatches } from "@tanstack/react-router"
import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { ExistsUrlMenuMap, ExistsUrlMenus, type FlatMenuItem } from "~/constant/menu"

export interface BreadcrumbItem {
  label: string
  url: string
  current?: boolean
}

export interface LayoutMetaInfo {
  title?: string
}

export interface LayoutContextState {
  meta: LayoutMetaInfo
  breadcrumbList: BreadcrumbItem[]
}

const defaultMeta: Required<LayoutMetaInfo> = { title: "Novelist" }

const LayoutContext = createContext<LayoutContextState>({
  meta: defaultMeta,
  breadcrumbList: []
})

function isMatchUrl(href: string, url: string) {
  const baseHref = href.split("?")[0]
  const pattern = url.replace(/\/\$[^/]+/g, "/([^/]+)")
  const regex = new RegExp(`^${pattern}$`)

  return (
    regex.test(baseHref) || href === url || href.split("?")[0] === url || (href.endsWith("/") && href === `${url}/`)
  )
}

function loopParentBreadcrumbs(parentId: string) {
  const result: BreadcrumbItem[] = []
  let currentId: string | undefined = parentId

  while (currentId) {
    const current: FlatMenuItem = ExistsUrlMenuMap[currentId]

    if (!current) {
      break
    }

    result.unshift({
      label: current.title,
      url: current.fullUrl,
      current: false
    })
    currentId = current.parentId
  }

  return result
}

function generateLayoutStateByMatches(matches: ReturnType<typeof useMatches>) {
  const matcherRoutes = matches.slice(1)
  const lastIndex = matcherRoutes.length - 1

  let newBreadcrumbList: BreadcrumbItem[] = []
  let newMeta: LayoutMetaInfo = defaultMeta

  for (let index = 0; index < matcherRoutes.length; index++) {
    const route = matcherRoutes[index]
    const matchedMenu = ExistsUrlMenus.find((menu) => {
      return isMatchUrl(route.pathname, menu.fullUrl)
    })

    if (!matchedMenu) {
      continue
    }

    // 如果当前是最后一个匹配项，标记为 current
    const current = index === lastIndex

    if (current) {
      if (matchedMenu.parentId) {
        const parentsMenus = loopParentBreadcrumbs(matchedMenu.parentId)
        newBreadcrumbList.push(...parentsMenus)
      }
      // 如果是最后一个面包屑，先清除前置的相同数据
      newBreadcrumbList = newBreadcrumbList.filter((item) => item.url !== matchedMenu.fullUrl)
    }

    // 如果当前面包屑不存在于列表中，添加它
    if (newBreadcrumbList.filter((item) => item.url === matchedMenu.fullUrl).length < 1) {
      newBreadcrumbList.push({
        label: matchedMenu.title,
        url: matchedMenu.fullUrl,
        current
      })
    }

    // 更新元信息（meta）
    if (index === matcherRoutes.length - 1) {
      newMeta = matchedMenu.meta || defaultMeta
    }
  }

  return {
    newMeta,
    newBreadcrumbList
  }
}

export function LayoutProvider({ children }: PropsWithChildren) {
  const [layoutState, setLayoutState] = useState<LayoutContextState>({
    meta: defaultMeta,
    breadcrumbList: []
  })
  const { t } = useTranslation()

  const matches = useMatches()

  useEffect(() => {
    const { newMeta, newBreadcrumbList } = generateLayoutStateByMatches(matches)

    document.title = newMeta.title ? `${t(newMeta.title)} | ${defaultMeta.title}` : defaultMeta.title
    setLayoutState(() => ({ meta: newMeta, breadcrumbList: newBreadcrumbList }))
  }, [matches, t])

  return <LayoutContext.Provider value={layoutState}>{children}</LayoutContext.Provider>
}

export function useLayout() {
  return useContext(LayoutContext)
}
