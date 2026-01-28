import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcomeMessage: "Hello {{name}}",
      counterText_one: "You have clicked the button <1>{{count}}</1> time",
      counterText_other: "You have clicked the button <1>{{count}}</1> times",
    }
  },
  es: {
    translation: {
      welcomeMessage: "Hola {{name}}",
      counterText_one: "Haz presionado el boton <1>{{count}}</1> vez",
      counterText_other: "Haz presionado el boton <1>{{count}}</1> veces"
    }
  },
  it: {
    translation: {
      welcomeMessage: "Ciao {{name}}",
      counterText_one: "Hai cliccato sul pulsante <1>{{count}}</1> volta",
      counterText_other: "Hai cliccato sul pulsante <1>{{count}}</1> volte"
    }
  },
  ge: {
    translation: {
      welcomeMessage: "Hallo {{name}}",
      counterText_one: "Sie haben die Schaltfläche <1>{{count}}</1> Mal angeklickt.",
      counterText_other: "Sie haben die Schaltfläche <1>{{count}}</1> Mal angeklickt."
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // In case of 'lng' is not supported, it would fallback to english
    lng: "es", // language to use

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
