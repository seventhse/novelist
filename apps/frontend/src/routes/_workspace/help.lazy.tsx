import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_workspace/help")({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/_workspace/help"!</div>
}
