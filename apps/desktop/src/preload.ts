import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electron", {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onWindowActivationChange: (callback: (...args: any) => void) =>
    ipcRenderer.on("window-activation-change", (_, data) => callback(data)),

  windowControl: (action: string) => ipcRenderer.send("window-control", action)
})
