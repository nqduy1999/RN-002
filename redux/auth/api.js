import api from '@services/remote/baseApi';
import apiEndpoints from '@services/remote/apiEndpoints';
import withQuery from 'with-query';
import {SSO_URL} from '@resources/build_version/BuildVersion';

//POST==========================================================
const externalLoginAsync = async ({ accessToken, email, provider }) => {
  const body = {
    accessToken: accessToken,
    email: email,
    provider: provider,
  };
  return api.post(apiEndpoints.POST_EXTERNAL_LOGIN, body);
};

const login = async ({ username, password }) => {
  const body = {
    userName: username.trim(),
    password: password,
  };
  return api.post(apiEndpoints.POST_LOGIN, body);
};

const register = async ({ username, password, securityQuestions, urlAvatar }) => {
  const body = {
    userName: username.trim(),
    password: password,
    securityQuestions: securityQuestions.map(item => {
      return {
        ...item,
        answer: item.answer.trim(),
      };
    }),
    urlAvatar: urlAvatar,
  };
  return api.post(apiEndpoints.POST_REGISTER, body);
};

const resetPassword = async ({
  username,
  newPassword,
  firstAnswer,
  secondAnswer,
}) => {
  const body = {
    username: username.trim(),
    newPassword: newPassword,
    answers: [
      {
        ...firstAnswer,
        answer: firstAnswer.answer.trim(),
      },
      {
        ...secondAnswer,
        answer: secondAnswer.answer.trim(),
      },
    ],
  };
  return api.post(apiEndpoints.POST_RESET_PASSWORD, body);
};

const checkRegisterUsername = async ({ username, password }) => {
  const body = {
    username: username.trim(),
    password: password,
  };
  return api.post(apiEndpoints.POST_CHECK_REGISTER_USERNAME, body);
};

const logout = async () => {
  try {
    let resp = await api.post(apiEndpoints.POST_LOGOUT);
    return { resp };
  } catch (error) {
    return { error };
  }
};

const checkCanResetPassword = async ({
  username,
  firstAnswer,
  secondAnswer,
  firstQuestion,
  secondQuestion,
}) => {
  const body = {
    username: username.trim(),
    answers: [
      {
        ...firstQuestion,
        ...firstAnswer,
        answer: firstAnswer.answer.trim(),
      },
      {
        ...secondQuestion,
        ...secondAnswer,
        answer: secondAnswer.answer.trim(),
      },
    ],
  };
  return api.post(apiEndpoints.POST_CHECK_CAN_RESET_PASSWORD, body);
};
//GET==========================================================

const getForceUpdateApp = async () => {
  return api.get(apiEndpoints.GET_UPDATE);
};

const getIsOffice365EnabledByUsername = async ({ username }) => {
  const body = {
    userName: username.trim(),
    password: '',
  };
  return api.get(
    withQuery(apiEndpoints.GET_IS_OFFICE365_ENABLED_BY_USERNAME, body),
  );
};

const getSecurityQuestions = async () => {
  return api.get(apiEndpoints.GET_SECURITY_QUESTIONS);
};

const getUserSecurityQuestion = async username => {
  const body = {
    username: username.trim(),
  };
  return api.get(withQuery(apiEndpoints.GET_USER_SECURITY_QUESTIONS, body));
};

const saveDevice = async (firebaseToken, deviceId, platform) => {
  const body = {
    token: firebaseToken,
    deviceUniqueIdentifier: deviceId,
    platform: platform,
  };
  return api.post(apiEndpoints.POST_SAVE_DEVICE, body);
};

const deleteDevice = async deviceId => {
  try {
    let resp = await api.delete(apiEndpoints.DELETE_DEVICE.replace('{0}', deviceId));
    return { resp };
  } catch (error) {
    // Mute that error
  }
};

const addRating = async body => {
  return api.post(apiEndpoints.POST_RATING, body);
};

const updateReminderRatingDate = async body => {
  return api.put(apiEndpoints.PUT_UPDATE_REMINDER_RATING_DATE, body);
};

const getFeatures = async () => {
  return api.get(apiEndpoints.GET_FEATURES);
};

const checkSaml2Enabled = async id => {
  try {
    const response = await fetch(`${SSO_URL}/check?id=${id}`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

const exchangeSSOCode = async code => {
  return api.get(apiEndpoints.GET_EXCHANGE_SSO.replace('{code}', code));
};

export default {
  externalLoginAsync,
  getForceUpdateApp,
  getIsOffice365EnabledByUsername,
  login,
  register,
  resetPassword,
  getSecurityQuestions,
  checkRegisterUsername,
  checkCanResetPassword,
  getUserSecurityQuestion,
  saveDevice,
  deleteDevice,
  addRating,
  updateReminderRatingDate,
  logout,
  getFeatures,
  checkSaml2Enabled,
  exchangeSSOCode,
};
