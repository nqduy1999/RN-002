import actions from './actions';
import appOperations from '../app/operations';
import api from './api';
import authOperations from '../auth/operations';
import newsAndDocumentsOperations from '../newsAndDocuments/operations';
import recognitionOperations from '../recognition/operations';
import notificationOperations from '../notifications/operations';
import flexibleBenefitsOperations from '../flexibleBenefits/operations';
import { isUnauthorized } from '../helpers/errorHandler';
import GenderTypes from '@resources/enum-types/gender';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { TITLE_SELECT_AVATAR } from '../../resources/string/strings';
import { renderText } from '../../common/components/StringHelper';
import { setAuthorizationToken } from '@services/remote/baseApi';
import authTokens from '@services/local/auth-tokens';
import errorMsg from '@resources/string/errors';
import { setAccessToken } from '@utils/CoreUtils';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: renderText(TITLE_SELECT_AVATAR),
  storageOptions: {
    skipBackup: true,
    path: 'images',
    cameraRoll: true,
    waitUntilSaved: true,
  },
};

const getUserProfile = () => async (dispatch, getState) => {
  try {
    let response = await api.getUserProfile();
    if (response) {
      if (response.gender === 'Unknown') {
        response.gender = 'Default';
      }
      dispatch(actions.setUserProfile(response));
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
  } finally {
  }
};

const initHomePage = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  await Promise.all([
    dispatch(getUserProfile()),
    dispatch(newsAndDocumentsOperations.getFeaturedDocuments()),
    dispatch(newsAndDocumentsOperations.getLatestNews()),
    dispatch(recognitionOperations.getWalletOverview()),
    dispatch(notificationOperations.getNotifications()),
    dispatch(flexibleBenefitsOperations.getFlexibleBenefitsBudget()),
  ]);
  dispatch(appOperations.hideLoading());
};

const setUpdateUserProfileForm = (key, value) => dispatch => {
  let changes = {};
  changes[key] = value;
  return dispatch(actions.setUpdateUserProfileForm(changes));
};

const initUpdateUserProfileForm = () => dispatch => {
  return dispatch(actions.initUpdateUserProfileForm());
};

const updateUserProfile = () => async (dispatch, getState) => {
  const {
    phoneNumber,
    personalEmail,
    gender,
    birthday,
  } = getState().profile.updateProfileForm;
  const body = {
    phoneNumber,
    personalEmail,
    gender: GenderTypes[gender].value,
    birthday,
  };
  dispatch(appOperations.showLoading());
  try {
    const response = await api.updateUserProfile(body);
    if (response) {
      if (response.gender === 'Unknown') {
        response.gender = 'Default';
      }
      dispatch(actions.setUserProfile(response));
      return true;
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const uploadImage = image => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    let responseUploadAvatar = await api.uploadAvatarToS3(image);
    if (responseUploadAvatar) {
      const response = await api.updateUserProfile({
        Avatar: responseUploadAvatar,
        isUpdateAvatar: true,
      });
      if (response) {
        if (response.gender === 'Unknown') {
          response.gender = 'Default';
        }
        // after uploading, using the orginal image
        response.avatar = response.avatar.replace('/200/', '/');
        dispatch(actions.setUserProfile(response));
        return true;
      }
    }
    return false;
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const initProfile = () => async dispatch => {
  dispatch(appOperations.showLoading());
  await Promise.all([
    dispatch(getUserProfile()),
    dispatch(flexibleBenefitsOperations.getWishlist()),
    dispatch(flexibleBenefitsOperations.getFlexibleBenefitsBudget()),
  ]);
  dispatch(appOperations.hideLoading());
};

const checkAndRequestPermission = () => async dispatch => {
  let permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
      : Platform.Version >= 33
      ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
      : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

  let permissionsAccepted = [];
  var permissionsRequested = 0;

  for (const permission of permissions) {
    await check(permission).then(async result => {
      switch (result) {
        case RESULTS.GRANTED:
          permissionsAccepted = [...permissionsAccepted, permission];
          break;
        case RESULTS.DENIED:
          await request(permission).then(requestResult => {
            if (requestResult === RESULTS.GRANTED) {
              permissionsAccepted = [...permissionsAccepted, permission];
            }
            permissionsRequested++;
          });
          break;
      }
    });
  }

  if (permissionsAccepted.length < 2 && permissionsRequested == 0) {
    dispatch(appOperations.changeShowHidePermissionModal(true));
    return false;
  }

  return permissionsAccepted.length == 2;
};

const onUploadAvatar = () => async dispatch => {
  const permissionsAccepted = await dispatch(checkAndRequestPermission());
  if (permissionsAccepted) {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    dispatch(updateAvatar(result));
  }
};

const updateAvatar = response => dispatch => {
  // console.log('Response = ', response);
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const image = response.assets[0];
    dispatch(
      uploadImage({
        ...image,
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
      }),
    );
  }
};

const updatePasswordForm = data => async dispatch => {
  return dispatch(actions.updatePasswordForm(data));
};


const IsJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const getLangErrorMessage = (data, getState) => {
  let message = '';
  if (IsJsonString(data.message)) {
    const messageObj = JSON.parse(data.message);
    const { language } = getState().app;
    message = language === 'vi' ? messageObj.vi : messageObj.en;
  } else {
    message = errorMsg['ERROR_CODE_' + data.code];
  }

  return message;
};

const updatePassword = () => async (dispatch, getState) => {
  const { oldPassword, newPassword } = getState().profile.changePassWordForm;

  const body = {
    oldPassword,
    newPassword,
  };

  dispatch(appOperations.showLoading());
  try {
    const response = await api.updateUserPassword(body);
    if (response) {
      await authTokens.storeToken(
        response.token,
        null,
      );
      setAccessToken(response.token);
      setAuthorizationToken(response.token);
      dispatch(toggleModalSuccess(true));
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    if (error.data) {
      alert(renderText(getLangErrorMessage(error.data, getState)));
    }
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getAnswerSecurityQuestionsOfMine = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    var response = await api.getAnswerSecurityQuestionsOfMine();
    dispatch(appOperations.hideLoading());
    if (getState().app.language === 'en')
      return dispatch(actions.setAnswerSecurityQuestions(response.en));
    else return dispatch(actions.setAnswerSecurityQuestions(response.vi));
  } catch (err) {
    if (err && err.message) alert(err.message);
    dispatch(appOperations.hideLoading());
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const updateInputSecurityForm = data => dispatch => {
  return dispatch(actions.updateSecurityForm(data));
};

const updateSecurityForm = (object, index) => (dispatch, getState) => {
  const { securityQuestions } = getState().auth;
  return dispatch(
    actions.updateSecurityForm({
      [object]: securityQuestions.en[index].id,
    }),
  );
};

const updateSecurityQuestions = () => async (dispatch, getState) => {
  const {
    password,
    idQuestionOne,
    answerOne,
    idQuestionTwo,
    answerTwo,
  } = getState().profile.securityQuestionForm;
  const body = {
    password,
    securityQuestions: [
      {
        id: idQuestionOne,
        answer: answerOne,
      },
      {
        id: idQuestionTwo,
        answer: answerTwo,
      },
    ],
  };

  dispatch(appOperations.showLoading());
  try {
    const response = await api.updateAnswerSecurityQuestionOfMine(body);
    dispatch(toggleModalSuccess(true));
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    if (error.data && error.data.message) alert(error.data.message);
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const toggleModalSuccess = isShow => dispatch => {
  return dispatch(actions.toggleModalSuccess(isShow));
};

const resetFormSecurity = () => dispatch => {
  return dispatch(actions.resetFormSecurity());
};

export default {
  getUserProfile,
  initHomePage,
  setUpdateUserProfileForm,
  initUpdateUserProfileForm,
  updateUserProfile,
  uploadImage,
  initProfile,
  checkAndRequestPermission,
  onUploadAvatar,
  updateAvatar,
  updatePasswordForm,
  updatePassword,
  getAnswerSecurityQuestionsOfMine,
  updateSecurityForm,
  updateSecurityQuestions,
  updateInputSecurityForm,
  toggleModalSuccess,
  resetFormSecurity,
};
