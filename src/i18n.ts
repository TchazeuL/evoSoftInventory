import i18n, { InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr/translation.json";
import en from "./locales/en/translation.json";

const resources = { en, fr }


const initOptions: InitOptions = {
    resources: {
        en: {
            translation: resources.en
        },
        fr: {
            translation: resources.fr
        }
    },
    debug: true,
    lng: "fr",
    supportedLngs: ["en", "fr"],
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
}

i18n.use(LanguageDetector).use(initReactI18next).init(initOptions);

export default i18n;