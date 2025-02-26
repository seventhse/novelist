import { useTranslation } from "@novelist/locales"
import { ErrorButtons } from "./error-buttons"

export default function ForbiddenError() {
  const { t } = useTranslation()
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">{t("error.403.code")}</h1>
        <span className="font-medium">{t("error.403.title")}</span>
        <p className="text-center text-muted-foreground">{t("error.403.description")}</p>
        <ErrorButtons />
      </div>
    </div>
  )
}
