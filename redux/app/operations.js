import { renderText } from '@common/components/StringHelper';
import CameraRoll from '@react-native-community/cameraroll';
import authApi from '@redux/auth/api';
import flexibleBenefitsOperations from '@redux/flexibleBenefits/operations';
import recognitionOperations from '@redux/recognition/operations';
import BuildVersion from '@resources/build_version/BuildVersion';
import { switchLanguage } from '@resources/string/locale/LanguageServices';
import authTokens from '@services/local/auth-tokens';
import * as languages from '@services/local/languages';
import moment from 'moment';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { captureScreen } from 'react-native-view-shot';
import semver from 'semver';
import { isAdminChangePassword } from '../helpers/errorHandler';
import actions from './actions';

const updateLanguage = language => async (dispatch, getState) => {
  if (language === getState().app.language) {
    return;
  }
  await languages.updateLanguage(language);
  switchLanguage(language);

  var token = await authTokens.getAccessToken();
  if (token) {
    // get flexible benefits and rewards after change language
    dispatch(flexibleBenefitsOperations.onRefresh(dispatch));
    dispatch(recognitionOperations.initRecognitionRewards(dispatch));
  }
  return dispatch(actions.updateLanguage(language));
};

const getLanguage = () => async dispatch => {
  var language = await languages.getLanguage();
  return language;
};

const showLoading = () => (dispatch, getState) => {
  const { isLoading } = getState().app;
  if (!isLoading) {
    dispatch(actions.showLoading());
  }
};

const hideLoading = () => (dispatch, getState) => {
  const { isLoading } = getState().app;
  if (isLoading) {
    dispatch(actions.hideLoading());
  }
};

const getVersionWithDepth = (version, depth) => {
  const DELIMITER = '.';
  let versionArray = null;
  if (version.indexOf(DELIMITER) === -1) {
    versionArray = [version];
  } else {
    versionArray = version
      .split(DELIMITER)
      .slice(0, Math.min(depth, version.length));
  }
  return [...versionArray, ...[0, 0, 0].slice(0, 3 - versionArray.length)].join(
    DELIMITER,
  );
};

const setGetReconiteOptStatus = (status) => (dispatch) => dispatch(actions.setGetReconiteOptStatus(status));

const showRating = () => async dispatch => {
  var token = await authTokens.getAccessToken();
  if (token) {
    const user = await authTokens.getUser();
    if (user.nextSurveyReminderDate || user.nextSurveyDate) {
      var reminderRatingDate = 0;

      reminderRatingDate = moment(
        user.nextSurveyReminderDate
          ? user.nextSurveyReminderDate
          : user.nextSurveyDate,
      ).diff(moment(), 'days', true);

      dispatch(
        actions.setRatingApp({
          isRating: reminderRatingDate <= 0 && user.isNPSEnabled,
        }),
      );

      dispatch(
        actions.showRating(reminderRatingDate <= 0 && user.isNPSEnabled),
      );
    } else {
      dispatch(
        actions.setRatingApp({
          isRating: user.lastestRatingDate == null && user.isNPSEnabled,
        }),
      );

      dispatch(
        actions.showRating(user.lastestRatingDate == null && user.isNPSEnabled),
      );
    }
  }
};

const showRatingSuccess = () => async dispatch => {
  dispatch(actions.showRating(false));
};

const getForceUpdateApp = () => async dispatch => {
  try {
    const res = await authApi.getForceUpdateApp();
    dispatch(actions.updateAppVersion(res));
  } catch (error) {
    console.log('🚀 ~ getForceUpdateApp ~ error:', error);
  }
};

const getVersionApp = () => async dispatch => {
  const isSaml2Enabled = await authApi.checkSaml2Enabled(
    __DEV__ ? 28 : BuildVersion?.employerId,
  );
  dispatch(
    actions.updateAppVersion({
      isInReview: !isSaml2Enabled,
    }),
  );
  try {
    const appVersion = await VersionCheck.needUpdate({
      packageName: `${VersionCheck.getPackageName()}`,
    });
    if (appVersion?.currentVersion && appVersion?.latestVersion) {
      const currentVersionWithDepth = getVersionWithDepth(
        appVersion.currentVersion,
        Infinity,
      );
      const latestVersionWithDepth = getVersionWithDepth(
        appVersion.latestVersion,
        Infinity,
      );
      appVersion.isInReview =
        !isSaml2Enabled ||
        (!__DEV__ && semver.gt(currentVersionWithDepth, latestVersionWithDepth));
      dispatch(actions.updateAppVersion(appVersion));
    }
  } catch (error) {
    // Mute error
  }
};

const setRatingApp = rating => (dispatch, getState) => {
  var { ratingApp } = getState().app;

  var ratingAppNew = {
    ...ratingApp,
    ...rating,
  };

  dispatch(actions.setRatingApp(ratingAppNew));
};

const changeShowHidePermissionModal = isShowHidePermissionModal => dispatch => {
  dispatch(actions.changeShowHidePermissionModal(isShowHidePermissionModal));
};

const handlerErrors = (error, showAlertErrorServer = true) => dispatch => {
  if (isAdminChangePassword(error && error.data && error.data.code)) {
    dispatch(toggleRedirectChangePass(true));
  }

  //show notice when having error from server
  if (showAlertErrorServer && error && error.status >= 500) {
    Alert.alert('', renderText('SYSTEM_UPGRADING_ALERT'));
  }
};

const toggleRedirectChangePass = isShow => dispatch => {
  return dispatch(actions.toggleRedirectChangePass(isShow));
};

const screenShot = async () => {
  const hasAndroidPermission = async () => {
    const permission1 = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const permission2 = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;

    const hasPermission = (await PermissionsAndroid.check(permission1)) &&
      (await PermissionsAndroid.check(permission2));
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.requestMultiple([permission1, permission2]);
    return status === 'granted';
  };

  try {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    const uri = await captureScreen({
      format: 'jpg',
      quality: 1,
    });

    CameraRoll.save(uri, { type: 'photo' });
    Alert.alert('', renderText('SCREEN_IS_CAPTURED'));
  } catch (error) {
    console.log(error);
  }
};

export default {
  updateLanguage,
  getLanguage,
  showLoading,
  hideLoading,
  setGetReconiteOptStatus,
  getForceUpdateApp,
  getVersionApp,
  setRatingApp,
  showRating,
  showRatingSuccess,
  changeShowHidePermissionModal,
  handlerErrors,
  toggleRedirectChangePass,
  screenShot,
};
