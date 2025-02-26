import i18n from "i18next"
import LanguageDetector, { type DetectorOptions } from "i18next-browser-languagedetector"
import HttpBackend, { type HttpBackendOptions } from "i18next-http-backend"
import { initReactI18next } from "react-i18next"
import enCommon from "./locales/en/common.json"
import zhCommon from "./locales/zh/common.json"

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init<HttpBackendOptions & DetectorOptions>({
    ns: ["common"],
    defaultNS: ["common"],
    fallbackLng: {
      default: ["en"]
    },
    resources: {
      en: {
        common: enCommon
      },
      zh: {
        common: zhCommon
      }
    },
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json"
    },
    detection: {
      order: ["localStorage", "sessionStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export * from "react-i18next"
export default i18n
