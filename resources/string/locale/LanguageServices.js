import I18n from 'react-native-i18n';
import en from './en';
import errorEn from './errorEn';
import vi from './vi';
import errorVi from './errorVi';
import moment from 'moment';
import 'moment/locale/vi';

I18n.fallbacks = true;
I18n.defaultLocale = 'en';
I18n.translations = {
  en: {
    ...en,
    ...errorEn,
  },
  vi: {
    ...vi,
    ...errorVi,
  },
};

export const setUpLanguage = async language => {
  if (language) {
    I18n.locale = language;
    moment.locale(language);
  }
};

export const switchLanguage = async (
  language,
  component = null,
  screenProps = null,
) => {
  if (I18n.locale === language) {
    return;
  }
  screenProps && screenProps.setLocale(language);
  component && component.forceUpdate();
  I18n.locale = language;
  moment.locale(language);
};

export default I18n;
