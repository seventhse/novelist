import { createFileRoute } from "@tanstack/react-router"
import WorkspaceHome from "~/features/workspace/home"

export const Route = createFileRoute("/_workspace/")({
  component: WorkspaceHome
})
