import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import translationEN from "./language_packs/en.json";
import translationUK from "./language_packs/ua.json";

const resources = {
  en: { translation: translationEN },
  uk: { translation: translationUK },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.getLocales()[0]?.languageCode ?? "en",
    fallbackLng: "en",
     compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;