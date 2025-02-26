import { isElectron } from "@novelist/utils"

const electronApi = window.electron

export function invoke() {
  if (!isElectron()) {
    return
  }
}

export function listener(type: string, callback: (...args: unknown[]) => void) {
  if (!isElectron()) {
    return
  }
}

export function windowControl(type: ElectronWindowControlAction) {
  electronApi.sendWindowControl({
    action: type
  })
}
