import { createLazyFileRoute } from "@tanstack/react-router"
import { GeneralError, NotFoundError } from "~/components/error"
import { Login } from "~/features/auth/login"

export const Route = createLazyFileRoute("/(auth)/login")({
  component: Login,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError
})
