import { useTranslation } from "@novelist/locales"
import { cn } from "@novelist/ui"
import { ErrorButtons } from "./error-buttons"

export function GeneralError() {
  const { t } = useTranslation()

  return (
    <div className={cn("h-svh w-full")}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">{t("error.500.code")}</h1>
        <span className="font-medium">{t("error.500.title")}</span>
        <p className="text-center text-muted-foreground">{t("error.500.description")}</p>
        <ErrorButtons />
      </div>
    </div>
  )
}
