import LanguageServices from '@resources/string/locale/LanguageServices';

export const renderText = text => {
  return LanguageServices.t(text, {defaultValue: text});
};
