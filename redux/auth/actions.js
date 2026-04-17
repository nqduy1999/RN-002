import {
  TYPE_LOGIN_USER,
  UPDATE_LOGIN_FORM,
  UPDATE_REGISTRATION_FORM,
  SET_TOKEN_SESSION,
  SET_SECURITY_QUESTIONS,
  UPDATE_FORGOT_PASSWORD_FORM,
  REFRESH_LOGIN_FORM,
  REFRESH_REGISTRATION_FORM,
  REFRESH_FORGOT_PASSWORD_FORM,
  REFRESH_NEW_PASSWORD_FORM,
  REFRESH_SECURITY_QUESTION_FORM,
  SET_USER,
  REMOVE_USER,
  CHANGE_VISIBLE_USERNAME_MODAL,
  GET_FEATURES,
  SET_FEATURES,
  UPDATE_RE_AUTH_CONFIRM,
} from './constants';

const refreshLoginForm = () => ({
  type: REFRESH_LOGIN_FORM,
});

const refreshRegistrationForm = () => ({
  type: REFRESH_REGISTRATION_FORM,
});

const refreshForgotPasswordForm = () => ({
  type: REFRESH_FORGOT_PASSWORD_FORM,
});

const refreshNewPasswordForm = () => ({
  type: REFRESH_NEW_PASSWORD_FORM,
});

const refreshSecurityQuestionForm = () => ({
  type: REFRESH_SECURITY_QUESTION_FORM,
});

const typeLoginUser = office365 => ({
  type: TYPE_LOGIN_USER,
  office365
});

const updateLoginForm = form => ({
  type: UPDATE_LOGIN_FORM,
  form,
});

const updateRegistrationForm = form => ({
  type: UPDATE_REGISTRATION_FORM,
  form,
});

const updateForgotPasswordForm = form => ({
  type: UPDATE_FORGOT_PASSWORD_FORM,
  form,
});

const setSecurityQuestions = securityQuestions => ({
  type: SET_SECURITY_QUESTIONS,
  securityQuestions,
});

const setTokenSession = token => ({
  type: SET_TOKEN_SESSION,
  token,
});

const setUser = user => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const updateReAuthConfirm = (status) => ({
  type: UPDATE_RE_AUTH_CONFIRM,
  status,
});

const changeVisibleUsernameModal = isUsernameModalVisible => ({
  type: CHANGE_VISIBLE_USERNAME_MODAL,
  isUsernameModalVisible,
});

const getFeatures = () => ({
  type: GET_FEATURES,
});

const setFeatures = features => ({
  type: SET_FEATURES,
  features,
});

export default {
  typeLoginUser,
  updateLoginForm,
  updateRegistrationForm,
  updateForgotPasswordForm,
  setUser,
  removeUser,
  updateReAuthConfirm,
  setSecurityQuestions,
  refreshForgotPasswordForm,
  refreshLoginForm,
  refreshRegistrationForm,
  refreshSecurityQuestionForm,
  refreshNewPasswordForm,
  changeVisibleUsernameModal,
  setTokenSession,
  getFeatures,
  setFeatures,
};
