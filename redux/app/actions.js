import {
  UPDATE_LANGUAGE,
  SHOW_LOADING,
  HIDE_LOADING,
  SET_GET_RECONITE_OPT_STATUS,
  UPDATE_APP_VERSION,
  SET_RATING_APP,
  SHOW_RATING,
  SET_SHOW_HIDE_PERMISSION_MODAL,
  SHOW_POPUP_REDIRECT_CHANGE_PASS
} from './constants';

const showLoading = () => ({
  type: SHOW_LOADING,
});

const hideLoading = () => ({
  type: HIDE_LOADING,
});

const setGetReconiteOptStatus = (status) => ({
  type: SET_GET_RECONITE_OPT_STATUS,
  status,
});

const updateLanguage = language => ({
  type: UPDATE_LANGUAGE,
  language,
});

const updateAppVersion = appVersion => ({
  type: UPDATE_APP_VERSION,
  appVersion,
});

const showRating = isShowRating => ({
  type: SHOW_RATING,
  isShowRating,
});

const setRatingApp = ratingApp => ({
  type: SET_RATING_APP,
  ratingApp,
});

const changeShowHidePermissionModal = isShowHidePermissionModal => ({
  type: SET_SHOW_HIDE_PERMISSION_MODAL,
  isShowHidePermissionModal
});

const toggleRedirectChangePass = isShow => ({
  type: SHOW_POPUP_REDIRECT_CHANGE_PASS,
  isShow
});

export default {
  updateLanguage,
  showLoading,
  hideLoading,
  setGetReconiteOptStatus,
  updateAppVersion,
  setRatingApp,
  showRating,
  changeShowHidePermissionModal,
  toggleRedirectChangePass
};
