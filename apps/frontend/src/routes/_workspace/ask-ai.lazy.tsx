import { createLazyFileRoute } from "@tanstack/react-router"
import AskAi from "~/features/workspace/ask-ai"

export const Route = createLazyFileRoute("/_workspace/ask-ai")({
  component: AskAi
})
