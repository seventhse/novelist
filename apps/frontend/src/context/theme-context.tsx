import { createLocalCache } from "@novelist/utils"
import { type PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react"

export type ThemeMode = "dark" | "light" | "system"

export const themeLocalCache = createLocalCache<ThemeMode>("themeModeKey")

const getSystemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

const defaultThemeMode = themeLocalCache.get() || "system"

const getCurrentThemeMode = (theme = themeLocalCache.get()) => {
  if (theme === "system") {
    return getSystemTheme()
  }
  return theme || defaultThemeMode
}

const ThemeContext = createContext<{
  theme: ThemeMode
  systemTheme: ThemeMode
  changeTheme: (mode: ThemeMode) => void
}>({
  theme: defaultThemeMode,
  systemTheme: getSystemTheme(),
  changeTheme: () => {}
})

function updateTheme(mode: ThemeMode, cache = true) {
  const root = window.document.documentElement
  if (!root) {
    return
  }
  const currentTheme = mode === "system" ? getSystemTheme() : mode

  root.classList.remove("light", "dark")
  root.classList.add(currentTheme)
  root.setAttribute("data-theme", currentTheme)
  cache && themeLocalCache.set(mode)
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeMode>(defaultThemeMode)

  const systemTheme = useMemo(() => getCurrentThemeMode(theme), [theme])

  const changeTheme = (mode: ThemeMode) => {
    updateTheme(mode)
    setTheme(mode)
  }

  const systemThemeChangeListener = (e: MediaQueryListEvent) => {
    if (theme === "system") {
      updateTheme(e.matches ? "dark" : "light", false)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updateTheme(theme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", systemThemeChangeListener)

    return () => {
      mediaQuery.removeEventListener("change", systemThemeChangeListener)
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        systemTheme,
        changeTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
