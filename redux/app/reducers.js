import {
  UPDATE_LANGUAGE,
  SHOW_LOADING,
  HIDE_LOADING,
  SET_GET_RECONITE_OPT_STATUS,
  UPDATE_APP_VERSION,
  SET_RATING_APP,
  SHOW_RATING,
  SET_SHOW_HIDE_PERMISSION_MODAL,
  SHOW_POPUP_REDIRECT_CHANGE_PASS,
} from './constants';
import Config from 'react-native-config';
import {IS_IOS} from '@common/constants';

const defaultState = {
  isLoading: false,
  language: null,
  isShowRating: false,
  isShowHidePermissionModal: false,
  appVersion: {
    currentVersion: '',
    latestVersion: '',
    storeUrl: IS_IOS ? Config.APPLE_STORE_URL : Config.CH_PLAY_URL,
    isNeeded: false,
    isInReview: false,
  },
  ratingApp: {
    isSelected: false,
    ratingPoint: 0,
    isRating: false,
    isRatingSuccess: false,
    answerRating: '',
  },
  isShowRedirectChangePassword: false,
};

const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_GET_RECONITE_OPT_STATUS:
      return {
        ...state,
        isGetReconiteOptStatus: action.status,
      };
    case UPDATE_APP_VERSION:
      //console.warn("current"+action.appVersion.currentVersion)
      //console.warn("latest"+action.appVersion.latestVersion)
      return {
        ...state,
        appVersion: {
          ...state.appVersion,
          ...action.appVersion,
        },
      };
    case SET_RATING_APP:
      return {
        ...state,
        ratingApp: {
          ...state.ratingApp,
          ...action.ratingApp,
        },
      };
    case SHOW_RATING:
      return {
        ...state,
        isShowRating: action.isShowRating,
      };
    case SET_SHOW_HIDE_PERMISSION_MODAL:
      return {
        ...state,
        isShowHidePermissionModal: action.isShowHidePermissionModal,
      };
    case SHOW_POPUP_REDIRECT_CHANGE_PASS:
      return {
        ...state,
        isShowRedirectChangePassword: action.isShow,
      };
    default:
      return state;
  }
};

export default reduce;
