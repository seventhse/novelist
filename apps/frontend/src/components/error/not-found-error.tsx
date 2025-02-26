import { useTranslation } from "@novelist/locales"
import { ErrorButtons } from "./error-buttons"

export function NotFoundError() {
  const { t } = useTranslation()
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">{t("error.404.code")}</h1>
        <span className="font-medium">{t("error.404.title")}</span>
        <p className="text-center text-muted-foreground">{t("error.404.description")}</p>
        <ErrorButtons />
      </div>
    </div>
  )
}
