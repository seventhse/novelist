import type { CommandItem } from "@novelist/utils"
import { isMacOs } from "@novelist/utils"

export enum CommandEnum {
  OpenCommandPalette = "OpenCommandPalette",
  OpenSetting = "OpenSetting"
}

export type CommandKey = keyof typeof CommandEnum

export const ShortcutMap = {
  [CommandEnum.OpenCommandPalette]: "k",
  [CommandEnum.OpenSetting]: ","
} as const

export function getCommandLabel(name: CommandKey): string {
  return isMacOs() ? `⌘+${ShortcutMap[name]}` : `Ctrl+${ShortcutMap[name]}`
}

export const CommandList: Record<CommandKey, Omit<CommandItem, "execute">> = {
  [CommandEnum.OpenCommandPalette]: {
    name: CommandEnum.OpenCommandPalette,
    label: "Open Command Palette",
    description: "",
    shortcut: ShortcutMap[CommandEnum.OpenCommandPalette],
    inPaletteShow: false
  },
  [CommandEnum.OpenSetting]: {
    name: CommandEnum.OpenSetting,
    label: "Open Profile ",
    description: "",
    shortcut: ShortcutMap[CommandEnum.OpenSetting]
  }
} as const
