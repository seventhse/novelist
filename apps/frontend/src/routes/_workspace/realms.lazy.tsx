import { createLazyFileRoute } from "@tanstack/react-router"
import Realms from "~/features/workspace/realms"

export const Route = createLazyFileRoute("/_workspace/realms")({
  component: Realms
})
