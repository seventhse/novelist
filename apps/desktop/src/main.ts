import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { BrowserWindow, app, ipcMain } from "electron"

// Convert __filename to a file path (to simulate `__dirname`).
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 568,
    frame: false,
    transparent: true,
    hasShadow: true,
    titleBarStyle: "default", // 隐藏标题栏
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  })

  win.loadURL("http://localhost:5173/workspace")

  win.webContents.openDevTools()

  // 监听窗口激活和失活事件
  win.on("focus", () => {
    win.webContents.send("window-activation-change", { isActive: true })
  })

  win.on("blur", () => {
    win.webContents.send("window-activation-change", { isActive: false })
  })

  ipcMain.on("window-control", (event, action) => {
    switch (action) {
      case "minimize":
        win.minimize()
        break
      case "maximize":
        win.isMaximized() ? win.unmaximize() : win.maximize()
        break
      case "close":
        win.close()
        break
    }
  })

  return win
}

app.whenReady().then(() => {
  app.setAppLogsPath()
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
