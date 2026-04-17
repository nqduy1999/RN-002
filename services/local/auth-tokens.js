import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtdecode from 'jwt-decode';
import {
  isAdmin as _isAdmin,
  isShowOtherSchemes,
} from '@common/function/function';

const USER_TOKEN_KEY = 'userToken';
const USER_KEY = 'user';
const getExpiryEpoch = seconds => {
  var t = new Date();
  t.setSeconds(t.getSeconds() + seconds);
  return t.getSeconds();
};

const storeToken = async (accessToken, refreshToken) => {
  const tokenString = JSON.stringify({
    accessToken,
    refreshToken,
  });
  await AsyncStorage.setItem(USER_TOKEN_KEY, tokenString);
};

const getAccessToken = async () => {
  const tokenString = await AsyncStorage.getItem(USER_TOKEN_KEY);
  if (!tokenString) {
    return null;
  }
  const {accessToken} = JSON.parse(tokenString);
  return accessToken;
};

const clear = async () => {
  await AsyncStorage.removeItem(USER_TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
};

const hasValidToken = async () => {
  const tokenString = await AsyncStorage.getItem(USER_TOKEN_KEY);
  return Boolean(tokenString);
};

const storeUser = async user => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);
  if (!user) {
    return null;
  }
  user.isExternal = await isExternalUser();
  return JSON.parse(user);
};

const isRecognitionProgramEnabled = async () => {
  const user = await getUser();
  if (user === null) {
    return false;
  }
  return isShowOtherSchemes(user);
};

const isAdmin = async () => {
  const user = await getUser();
  if (user === null) {
    return false;
  }
  return _isAdmin(user);
};

const isExternalUser = async () => {
  const token = await getAccessToken();
  if (!token) {
    return false;
  }
  const tokenObj = jwtdecode(token);
  return tokenObj && tokenObj['Account:IsExternal'] === 'True';
};

export default {
  storeToken,
  getAccessToken,
  hasValidToken,
  clear,
  storeUser,
  getUser,
  isRecognitionProgramEnabled,
  isAdmin,
  isExternalUser,
};
