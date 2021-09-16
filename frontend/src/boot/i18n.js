import Vue from 'vue'
import { createI18n } from 'vue-i18n'

import messages from 'src/i18n'

//Vue.use(VueI18n)

const lang = 'de'

const locales = {
  de: 'de-ch',
  fr: 'fr-ch',
  it: 'it-ch',
  en: 'en-gb'
}



const i18n = createI18n({
  locale: locales[lang],
  fallbackLocale: 'de-ch',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
}

// if you need to import it from
// other files, then:
export { i18n }
