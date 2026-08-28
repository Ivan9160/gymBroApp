import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import translationEN from "./language_packs/en.json";
import translationUK from "./language_packs/ua.json";
import translationTR from "./language_packs/tr.json";
import translationIT from "./language_packs/it.json";
import translationFR from "./language_packs/fr.json";
import translationCS from "./language_packs/cs.json";
import translationDE from "./language_packs/de.json";
import translationES from "./language_packs/es.json";
import translationPT from "./language_packs/pt.json";
import translationPL from "./language_packs/pl.json";
import translationRU from "./language_packs/ru.json";


const resources = {
  en: { translation: translationEN },
  uk: { translation: translationUK },
  tr: { translation: translationTR },
  it: { translation: translationIT },
  fr: { translation: translationFR },
  cs: { translation: translationCS },
  de: { translation: translationDE },
  es: { translation: translationES },
  pt: { translation: translationPT },
  pl: { translation: translationPL },
  ru: { translation: translationRU },
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