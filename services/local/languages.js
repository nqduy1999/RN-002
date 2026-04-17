import AsyncStorage from '@react-native-async-storage/async-storage';
const USER_LANGUAGE = 'USER_LANGUAGE';

const updateLanguage = async lang => {
  await AsyncStorage.setItem(USER_LANGUAGE, lang);
};

const getLanguage = async () => {
  const lang = await AsyncStorage.getItem(USER_LANGUAGE);
  return lang || 'en';
};

export {updateLanguage, getLanguage};
