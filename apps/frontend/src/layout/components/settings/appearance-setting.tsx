"use client"

import { useTranslation } from "@novelist/locales"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SettingItem,
  SettingSection,
  Tabs,
  TabsList,
  TabsTrigger
} from "@novelist/ui"
import { useTheme } from "~/context/theme-context"
import { LanguageOptions, ThemeTabOptions } from "./constant"

export default function AppearanceSetting() {
  const { theme, changeTheme } = useTheme()
  const { t, i18n } = useTranslation()

  const handleChangeLang = (val: string) => {
    i18n.changeLanguage(val)
  }

  return (
    <div className="flex flex-col gap-y-12 mb-6">
      <SettingSection title={t("theme.label")}>
        <SettingItem
          title={t("appearance.colorMode.title")}
          description={t("appearance.colorMode.description")}
        >
          <Tabs
            defaultValue={theme}
            onChange={(v) => {
              console.log(v)
            }}
          >
            <TabsList className="grid w-full grid-cols-3">
              {ThemeTabOptions.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  onClick={() => {
                    changeTheme(item.value)
                  }}
                >
                  {t(item.label)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </SettingItem>
        <SettingItem
          title={t("language.display")}
          description={t("language.selectDesc")}
        >
          <Select
            defaultValue={i18n.language}
            value={i18n.language}
            onValueChange={handleChangeLang}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select the language for the interface." />
            </SelectTrigger>
            <SelectContent>
              {LanguageOptions.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingItem>
      </SettingSection>

      <SettingSection title={t("common.system")}>
        <SettingItem
          title={t("reset.allSettings")}
          description={t("reset.allSettingsDesc")}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>{t("reset.now")}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("reset.confirmTitle")}</AlertDialogTitle>
                <AlertDialogDescription>{t("reset.confirmDesc")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                <AlertDialogAction>{t("common.reset")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SettingItem>
      </SettingSection>
    </div>
  )
}
