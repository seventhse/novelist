type ElectronWindowControlAction = "close" | "minimize" | "maximize"

interface Window {
  electron: {
    invoke: (type: string, ...args: unknown) => unknown
    listener: (type: string) => void
    sendWindowControl: (options: { action: ElectronWindowControlAction }) => void
    onWindowStateChange: (callback: (state: string) => void) => void
    getSystemInfo: () => Promise<string>
  }
}
