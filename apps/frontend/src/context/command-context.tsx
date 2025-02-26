import { type CommandItem, CommandManager, useEventListener, useUnMount } from "@novelist/utils"
import { type PropsWithChildren, createContext, useContext, useEffect, useRef } from "react"

export const CommandContext = createContext<CommandManager | null>(null)

const commandManager = new CommandManager()

export function CommandProvider({ children }: PropsWithChildren) {
  const manager = useRef(commandManager)

  useEventListener("keydown", manager.current.keyboardCallback.bind(manager.current))

  useUnMount(manager.current.clear)

  return <CommandContext.Provider value={manager.current}>{children}</CommandContext.Provider>
}

export function useCommand() {
  const manager = useContext(CommandContext)
  if (!manager) {
    throw new Error("CommandContext must be used within CommandProvider")
  }
  return manager
}

export function useRegisterCommand(item: CommandItem) {
  const manager = useCommand()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    manager.register(item)
    return () => {
      manager.unregister(item.name)
    }
  }, [])
}
