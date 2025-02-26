import { Icon } from "@novelist/ui"
import { useEffect, useState } from "react"
import { windowControl } from "~/lib/electron-api"

export default function MacosWindowManageTools() {
  const [isFull, setIsFull] = useState(false)

  useEffect(() => {
    // TODO: Watch window is focus or blur, add icon status.
  }, [])

  return (
    <div
      className="flex items-start justify-start gap-1 group"
      data-no-drag
    >
      <span
        onClick={() => windowControl("close")}
        className="window-tool bg-red-500"
        aria-label="Close"
      >
        <Icon
          className="text-transparent group-hover:text-black"
          name="x"
          size={12}
        />
      </span>
      <span
        onClick={() => windowControl("minimize")}
        className="window-tool bg-yellow-400"
      >
        <Icon
          className="text-transparent group-hover:text-black"
          name="minus"
          size={12}
        />
      </span>
      <span
        onClick={() => {
          windowControl("maximize")
          setIsFull((pre) => !pre)
        }}
        className="window-tool bg-green-500"
      >
        <Icon
          className="text-transparent group-hover:text-black"
          name={isFull ? "minimize-2" : "maximize-2"}
          size={8}
        />
      </span>
    </div>
  )
}
