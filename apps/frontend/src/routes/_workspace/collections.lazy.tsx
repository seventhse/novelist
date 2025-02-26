import { createLazyFileRoute } from "@tanstack/react-router"
import Collections from "~/features/workspace/collections"

export const Route = createLazyFileRoute("/_workspace/collections")({
  component: Collections
})
