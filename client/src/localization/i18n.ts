import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./language_packs/en.json";
import translationUK from "./language_packs/ua.json";

const resources = {
    en: {
        translation: translationEN,
    },
    uk: {
        translation: translationUK,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,

        fallbackLng: "en",

        supportedLngs: ["en", "uk"],

        load: "languageOnly",

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: [
                "localStorage",
                "navigator",
            ],
            caches: ["localStorage"],
        },
    });

export default i18n;