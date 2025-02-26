import type { IconName } from "@novelist/ui"
import { type LazyExoticComponent, type ReactNode, lazy } from "react"
import type { ThemeMode } from "~/context/theme-context"

export const SettingNav: Array<{
  key: string
  name: string
  icon: IconName
  desc: string
  com: LazyExoticComponent<() => ReactNode>
}> = [
  {
    key: "Appearance",
    name: "settingMenu.appearance",
    icon: "paintbrush",
    desc: "appearance.description",
    com: lazy(() => import("./appearance-setting"))
  },
  {
    key: "AssistantAi",
    name: "settingMenu.assistantAI",
    icon: "bot",
    desc: "features.ai.description",
    com: lazy(() => import("./assistant-ai-setting"))
  },
  {
    key: "Editor",
    name: "settingMenu.editor",
    icon: "pen",
    desc: "features.editor.description",
    com: lazy(() => import("./editor-setting"))
  },
  {
    key: "KeyboardShortcuts",
    name: "settingMenu.keyboardShortcuts",
    icon: "keyboard",
    desc: "features.shortcuts.description",
    com: lazy(() => import("./keyboard-shortcuts-setting"))
  }
]

export const ThemeTabOptions: Array<{
  label: string
  value: ThemeMode
}> = [
  {
    label: "theme.options.system",
    value: "system"
  },
  {
    label: "theme.options.light",
    value: "light"
  },
  {
    label: "theme.options.dark",
    value: "dark"
  }
]

export const LanguageOptions = [
  {
    label: "中文",
    value: "zh"
  },
  {
    label: "English",
    value: "en"
  }
]
