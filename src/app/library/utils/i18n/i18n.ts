import { initReactI18next } from 'react-i18next';

import { DEFAULT_FALLBACK_LNG_I18n } from '@env';
import { KEY_STORAGE, load } from '@utils/storage';
import i18n, { Resource } from 'i18next';

import { resources } from './locales';

export const initOptionsI18n = (source: Resource) => {
  const savedLanguage = load(KEY_STORAGE.LANGUAGUE);

  return {
    fallbackLng: savedLanguage || DEFAULT_FALLBACK_LNG_I18n,
    lng: savedLanguage || DEFAULT_FALLBACK_LNG_I18n,
    resources: source,

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    // cache: {
    //   enabled: true
    // },

    interpolation: {
      // not needed for react as it does escape per default to prevent xss!
      escapeValue: false,
    },
  };
};

/**
 * Config i18n for app
 */
i18n.use(initReactI18next).init(initOptionsI18n(resources));

export default i18n;
