import { useTranslation } from "@novelist/locales"
import { Button } from "@novelist/ui"
import { useNavigate, useRouter } from "@tanstack/react-router"
import { BasicRoute } from "~/constant/basic-routes"

export function ErrorButtons() {
  const navigate = useNavigate()
  const { history } = useRouter()
  const { t } = useTranslation()

  return (
    <div className="mt-6 flex gap-4">
      <Button
        variant="outline"
        onClick={() => {
          history.go(-1)
        }}
      >
        {t("error.buttons.goBack")}
      </Button>
      <Button
        onClick={() => {
          navigate({ to: BasicRoute.Workspace, replace: true })
        }}
      >
        {t("error.buttons.backToHome")}
      </Button>
    </div>
  )
}
