import { Loading } from "@novelist/ui"
import { createFileRoute } from "@tanstack/react-router"
import { GeneralError, NotFoundError } from "~/components/error"
import { Layout } from "~/layout/layout"

export const Route = createFileRoute("/_workspace")({
  component: Layout,
  pendingComponent: Loading,
  errorComponent: GeneralError,
  notFoundComponent: NotFoundError
})
