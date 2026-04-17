import {
  SET_USER_PROFILE,
  SET_UPDATE_USER_PROFILE_FORM,
  INIT_UPDATE_USER_PROFILE_FORM,
  UPDATE_PASSWORD_FORM,
  SET_ANSWER_SECURITY_QUESTIONS,
  UPDATE_SECURITY_FORM,
  TOGGLE_MODAL_SUCCESS,
  RESET_FORM_SECURITY
} from './constants';

const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  profile,
});

const setUpdateUserProfileForm = form => ({
  type: SET_UPDATE_USER_PROFILE_FORM,
  form,
});

const initUpdateUserProfileForm = form => ({
  type: INIT_UPDATE_USER_PROFILE_FORM,
  form,
});

const updatePasswordForm = data => ({
  type: UPDATE_PASSWORD_FORM,
  data,
});

const setAnswerSecurityQuestions = data => ({
  type: SET_ANSWER_SECURITY_QUESTIONS,
  data
});

const updateSecurityForm = data  => ({
  type: UPDATE_SECURITY_FORM,
  data
});

const toggleModalSuccess = isShow => ({
  type: TOGGLE_MODAL_SUCCESS,
  isShow
});

const resetFormSecurity = () => ({
  type: RESET_FORM_SECURITY
})

export default {
  setUserProfile,
  setUpdateUserProfileForm,
  initUpdateUserProfileForm,
  updatePasswordForm,
  setAnswerSecurityQuestions,
  updateSecurityForm,
  toggleModalSuccess,
  resetFormSecurity
};
