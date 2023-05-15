import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";

import messages from "src/i18n";

const lang = "en";

const locales = {
  de: "de-ch",
  fr: "fr-ch",
  it: "it-ch",
  en: "en-us",
};

const i18n = createI18n({
  locale: locales[lang],
  fallbackLocale: "en-us",
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});
