import actions from './actions';
import api from './api';
import apiProfile from '@redux/profile/api';
import appOperations from '@redux/app/operations';
import recognitionOperations from '@redux/recognition/operations';
import { Alert, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { authorize } from 'react-native-app-auth';
import I18n from 'react-native-i18n';

import {
  inputUsernameValidation,
  loginPageValidation,
  registerPageValidation,
  securityQuestionPageValidation,
  accountSecurityPageValidation,
  resetPasswordPageValidation,
} from './validations';
import {
  FIELD_USERNAME_CAN_NOT_REGISTER,
  FIELD_USERNAME_CAN_NOT_RESET_PASSWORD,
} from '@resources/string/strings';
import errorMsg from '@resources/string/errors';
import authTokens from '@services/local/auth-tokens';
import {
  setAuthorizationToken,
  removeAuthorizationToken,
} from '@services/remote/baseApi';
import firebase from 'react-native-firebase';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import { renderText } from '@common/components/StringHelper';
import { TITLE_SELECT_AVATAR } from '../../resources/string/strings';
import themesService from '@services/local/themes';
import BuildVersion from '@resources/build_version/BuildVersion';
import themes from '../../resources/build_version/themes';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { setAccessToken, setLoginSession, getCallback } from '@utils/CoreUtils';

const setting = BuildVersion.setting;

const options = {
  title: renderText(TITLE_SELECT_AVATAR),
  storageOptions: {
    skipBackup: true,
    path: 'images',
    cameraRoll: true,
    waitUntilSaved: true,
  },
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

  switch (data.code) {
    case '10000':
      if (data.reTry == 1) {
        Alert.alert(
          '',
          I18n.t('ERROR_INCORRECT_USERNAME_OR_PASSWORD_PRESS_FORGOT_PASSWORD_1', {
              time: data.reTry,
            },
          ),
        );
        return I18n.t('ERROR_INCORRECT_USERNAME_OR_PASSWORD_1', { time: data?.reTry || 0 });
      }
      if (data.reTry < 3) {
        Alert.alert(
          '',
          I18n.t('ERROR_INCORRECT_USERNAME_OR_PASSWORD_PRESS_FORGOT_PASSWORD', {
            time: data.reTry,
          }),
        );
      }
      return I18n.t(message, { time: data?.reTry || 0 });
    case '10096':
      return I18n.t(message, { time: data?.minuteLock || 0 });
    default:
      return message || 'ERROR_OCCURRED';
  }
};

const isPasswordError = data => {
  return data.code == '10093'; // Server will return 10093 as weak password error code
};

const updateLoginForm = (key, value) => dispatch => {
  const changes = {};
  changes[key] = value;
  return dispatch(actions.updateLoginForm(changes));
};

const updateRegistrationForm = (key, value, optionalValue) => (
  dispatch,
  getState,
) => {
  const changes = {};
  changes[key] = value;
  if (key.toLowerCase().includes('question')) {
    const { securityQuestions } = getState().auth;
    changes[key] = {
      ...securityQuestions.en[value],
      question: optionalValue,
    };
  }
  return dispatch(actions.updateRegistrationForm(changes));
};

const updateForgotPasswordForm = (key, value) => dispatch => {
  const changes = {};
  changes[key] = value;
  return dispatch(actions.updateForgotPasswordForm(changes));
};

const setUser = user => async dispatch => {
  user.isExternal = await authTokens.isExternalUser();
  return dispatch(actions.setUser(user));
};

const saveDevice = async () => {
  return firebase
    .messaging()
    .hasPermission()
    .then(async enabled => {
      // console.log(enabled);
      if (enabled) {
        return firebase
          .messaging()
          .getToken()
          .then(async fcmToken => {
            // console.log(fcmToken);
            return await api.saveDevice(
              fcmToken,
              await DeviceInfo.getUniqueId(),
              Platform.OS === 'android' ? 'Android' : 'iOS',
            );
          });
      } else {
        return firebase
          .messaging()
          .requestPermission()
          .then(async value => {
            // console.log(value + 's');
            return firebase
              .messaging()
              .getToken()
              .then(async fcmToken => {
                // console.log(fcmToken);
                return await api.saveDevice(
                  fcmToken,
                  await DeviceInfo.getUniqueId(),
                  Platform.OS === 'android' ? 'Android' : 'iOS',
                );
              });
          })
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
};

const checkIsOffice365ByUsername = onSuccess => async (dispatch, getState) => {
  const { login: loginForm } = getState().auth;
  const { username } = loginForm;
  const validation = inputUsernameValidation({ username });
  if (!validation.isValid) {
    return dispatch(actions.updateLoginForm({ validation }));
  }
  dispatch(actions.updateLoginForm({ validation: {} }));
  dispatch(appOperations.showLoading());
  let response = null;
  try {
    response = await api.getIsOffice365EnabledByUsername({ username });
    await dispatch(appOperations.hideLoading());
    setTimeout(() => {
      onSuccess && onSuccess(response);
    }, 199);

    return dispatch(actions.typeLoginUser(response));
  } catch (error) {
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        username: getLangErrorMessage(error.data, getState),
      };
      dispatch(appOperations.hideLoading());

      return dispatch(actions.updateLoginForm({ validation }));
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const processAuthResponse = authResponse => async dispatch => {
  // console.log(`🚀  ~ login ~ authResponse`, authResponse);
  await authTokens.storeToken(authResponse.token, null);
  await authTokens.storeUser(authResponse);
  setAuthorizationToken(authResponse.token);
  setAccessToken(authResponse.token);
  setLoginSession(authResponse);

  // set theme
  if (setting.version === 'generic') {
    await themesService.storeThemes(authResponse.theme);
    BuildVersion.palette = themes.getPalette();
    BuildVersion.image = themes.getImages();
  }
  // AIA and DHL haven't fully configure images in db therefore we have to comment this first
  // else {
  //   await themesService.storeThemes(authResponse.theme);
  //   BuildVersion.image = themes.getImages();
  // }

  dispatch(actions.setUser(authResponse));
  //STORE TOKEN TO SERVER
  await saveDevice();
  dispatch(appOperations.showLoading());
  dispatch(
    appOperations.setRatingApp({
      nextSurveyDate: authResponse.nextSurveyDate,
      nextSurveyReminderDate: authResponse.nextSurveyReminderDate,
    }),
  );
}

const login = (params, onSuccess, onError) => async (dispatch, getState) => {
  const { login: loginForm } = getState().auth;
  const { username, password } = loginForm;
  const validation = loginPageValidation({ username, password });
  if (!validation.isValid) {
    return dispatch(actions.updateLoginForm({ validation }));
  }
  dispatch(appOperations.showLoading());
  dispatch(actions.updateLoginForm({ validation: {} }));
  let authResponse = null;
  try {
    authResponse = await api.login({ username, password });
    authResponse.username = username;
    await dispatch(processAuthResponse(authResponse));
    onSuccess && onSuccess(authResponse);
  } catch (error) {
    onError && onError({authResponse, error});
    const errValidation = {
      isValid: false,
      message: error && error.data && error.data.code ? getLangErrorMessage(error.data, getState) : 'ERROR_OCCURRED',
    };
    dispatch(appOperations.hideLoading());
    return dispatch(actions.updateLoginForm({ validation: errValidation }));
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const loginWithOffice365 = () => async (dispatch, getState) => {
  const { office365, login: loginForm } = getState().auth;
  const {
    office365AppId,
    office365TenantId,
    office365AndroidRedirectUri,
    office365IosRedirectUri,
  } = office365;

  const AuthOffice365Config = {
    warmAndPrefetchChrome: true,
    issuer: `https://login.microsoftonline.com/${office365TenantId}`,
    clientId: `${office365AppId}`,
    redirectUrl:
      Platform.OS === 'ios'
        ? `${office365IosRedirectUri}`
        : `${office365AndroidRedirectUri}`,
    scopes: [
      'openid',
      'offline_access',
      'profile',
      'User.Read',
      'User.ReadBasic.All',
    ],
    additionalParameters: { prompt: 'select_account' },
    serviceConfiguration: {
      authorizationEndpoint: `https://login.microsoftonline.com/${office365TenantId}/oauth2/v2.0/authorize`,
      tokenEndpoint: `https://login.microsoftonline.com/${office365TenantId}/oauth2/v2.0/token`,
    },
  };

  try {
    const result = await authorize(AuthOffice365Config);

    dispatch(appOperations.showLoading());
    const authResponse = await api.externalLoginAsync({
      accessToken: result.accessToken,
      email: loginForm.username,
      provider: 'Office365',
    });

    await authTokens.storeToken(authResponse.token, null);
    await authTokens.storeUser(authResponse);
    setAuthorizationToken(authResponse.token);
    setAccessToken(authResponse.token);

    // set theme
    if (setting.version === 'generic') {
      await themesService.storeThemes(authResponse.theme);
      BuildVersion.palette = themes.getPalette();
      BuildVersion.image = themes.getImages();
    }
    // AIA and DHL haven't fully configure images in db therefore we have to comment this first
    // else {
    //   await themesService.storeThemes(authResponse.theme);
    //   BuildVersion.image = themes.getImages();
    // }

    dispatch(actions.setUser(authResponse));
    //STORE TOKEN TO SERVER
    await saveDevice();
    dispatch(appOperations.showLoading());
    dispatch(
      appOperations.setRatingApp({
        nextSurveyDate: authResponse.nextSurveyDate,
        nextSurveyReminderDate: authResponse.nextSurveyReminderDate,
      }),
    );
  } catch (error) {
    console.log(error);
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        message: getLangErrorMessage(error.data, getState),
      };
      dispatch(appOperations.hideLoading());
      return dispatch(actions.updateLoginForm({ validation }));
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const loginWithGoogle = () => async (dispatch, getState) => {
  Platform.OS === 'android'
    ? GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '530042059218-d1sprn6r122db0nul3dh84h9n1ict4n0.apps.googleusercontent.com',
      offlineAccess: true,
    })
    : GoogleSignin.configure();
  try {
    await GoogleSignin.hasPlayServices();
    const result = await GoogleSignin.signIn();

    dispatch(appOperations.showLoading());
    const authResponse = await api.externalLoginAsync({
      accessToken: result.idToken,
      email: result.user.email,
      provider: 'Google',
    });
    await authTokens.storeToken(authResponse.token, null);
    await authTokens.storeUser(authResponse);
    setAuthorizationToken(authResponse.token);
    setAccessToken(authResponse.token);
    await dispatch(recognitionOperations.getWalletOverview());

    // set theme
    if (setting.version === 'generic') {
      await themesService.storeThemes(authResponse.theme);
      BuildVersion.palette = themes.getPalette();
      BuildVersion.image = themes.getImages();
    }

    dispatch(actions.setUser(authResponse));
    //STORE TOKEN TO SERVER
    await saveDevice();
    dispatch(appOperations.showLoading());
    dispatch(
      appOperations.setRatingApp({
        nextSurveyDate: authResponse.nextSurveyDate,
        nextSurveyReminderDate: authResponse.nextSurveyReminderDate,
      }),
    );
  } catch (error) {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    if (error.data && error.data.message) {
      Alert.alert('Notification', error?.data?.message);
      const validation = {
        isValid: false,
        message: getLangErrorMessage(error.data, getState),
      };
      dispatch(appOperations.hideLoading());
      return dispatch(actions.updateLoginForm({ validation }));
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getSecurityQuestions = () => async dispatch => {
  dispatch(appOperations.showLoading());
  try {
    var questionsResponse = await api.getSecurityQuestions();
    dispatch(appOperations.hideLoading());
    return dispatch(actions.setSecurityQuestions(questionsResponse));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getUserSecurityQuestions = () => async (dispatch, getState) => {
  const { forgotPassword } = getState().auth;
  const { username, hasUsernameQuestions } = forgotPassword;
  if (username == hasUsernameQuestions) {
    return true;
  }
  let questionsResponse = null;
  dispatch(appOperations.showLoading());
  try {
    questionsResponse = await api.getUserSecurityQuestion(username);
    dispatch(appOperations.hideLoading());
    if (questionsResponse) {
      dispatch(
        actions.updateForgotPasswordForm({
          validation: {},
          hasQuestions: true,
          hasUsernameQuestions: username,
        }),
      );
      dispatch(
        actions.updateForgotPasswordForm({ questions: questionsResponse }),
      );
      return true;
    }
  } catch (error) {
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        username: getLangErrorMessage(error.data, getState),
      };
      dispatch(appOperations.hideLoading());
      dispatch(actions.updateForgotPasswordForm({ validation }));
      return false;
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const checkAccountSecurityPage = (params, onSuccess, onError) => async (
  dispatch,
  getState,
) => {
  const { forgotPassword } = getState().auth;
  const { username, firstAnswer, secondAnswer, questions } = forgotPassword;
  const validation = accountSecurityPageValidation({
    username,
    firstAnswer,
    secondAnswer,
  });
  if (!validation.isValid) {
    return dispatch(actions.updateForgotPasswordForm({ validation }));
  }
  dispatch(actions.updateForgotPasswordForm({ validation: {} }));
  dispatch(appOperations.showLoading());
  let checkResponse = null;
  try {
    checkResponse = await api.checkCanResetPassword({
      username,
      firstAnswer,
      secondAnswer,
    });
    dispatch(appOperations.hideLoading());
    if (checkResponse.canResetPassword) {
      onSuccess && onSuccess(checkResponse);
    } else {
      const validation = {
        isValid: false,
        username: FIELD_USERNAME_CAN_NOT_RESET_PASSWORD,
      };
      return dispatch(actions.updateForgotPasswordForm({ validation }));
    }
  } catch (error) {
    dispatch(appOperations.hideLoading());
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        message: getLangErrorMessage(error.data, getState),
      };
      dispatch(appOperations.hideLoading());
      return dispatch(actions.updateForgotPasswordForm({ validation }));
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const resetPassword = (params, onSuccess, onError) => async (
  dispatch,
  getState,
) => {
  const { forgotPassword } = getState().auth;
  const {
    username,
    firstAnswer,
    secondAnswer,
    newPassword,
    c_password,
  } = forgotPassword;
  const validation = resetPasswordPageValidation({
    newPassword,
    c_password,
  });
  if (!validation.isValid) {
    return dispatch(actions.updateForgotPasswordForm({ validation }));
  }
  dispatch(actions.updateForgotPasswordForm({ validation: {} }));
  dispatch(appOperations.showLoading());
  let response = null;
  try {
    response = await api.resetPassword({
      username,
      firstAnswer,
      secondAnswer,
      newPassword,
    });
    dispatch(appOperations.hideLoading());
    if (response.resetPasswordSucceed) {
      onSuccess && onSuccess(response);
    } else {
    }
  } catch (error) {
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        message: getLangErrorMessage(error.data, getState),
      };
      dispatch(appOperations.hideLoading());
      return dispatch(actions.updateForgotPasswordForm({ validation }));
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const checkRegisterPage = onSuccess => async (dispatch, getState) => {
  const { registration } = getState().auth;
  const { username, password, c_password } = registration;
  const validation = registerPageValidation({ username, password, c_password });
  if (!validation.isValid) {
    return dispatch(actions.updateRegistrationForm({ validation }));
  }
  dispatch(actions.updateRegistrationForm({ validation: {} }));
  dispatch(appOperations.showLoading());
  let checkResponse = null;
  try {
    checkResponse = await api.checkRegisterUsername({ username, password });
    dispatch(appOperations.hideLoading());
    if (checkResponse) {
      onSuccess && onSuccess(checkResponse);
      return dispatch(actions.updateRegistrationForm({ validation: {} }));
    }
    const validation = {
      isValid: false,
      username: FIELD_USERNAME_CAN_NOT_REGISTER,
    };
    return dispatch(actions.updateRegistrationForm({ validation }));
  } catch (error) {
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        username:
          !isPasswordError(error.data) &&
          getLangErrorMessage(error.data, getState),
        password:
          isPasswordError(error.data) &&
          getLangErrorMessage(error.data, getState),
      };
      dispatch(appOperations.hideLoading());
      return dispatch(actions.updateRegistrationForm({ validation }));
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const checkSecurityQuestionPage = onSuccess => async (dispatch, getState) => {
  const { registration } = getState().auth;
  const {
    firstQuestion,
    firstAnswer,
    secondQuestion,
    secondAnswer,
  } = registration;
  const validation = securityQuestionPageValidation({
    firstQuestion,
    firstAnswer,
    secondQuestion,
    secondAnswer,
  });
  if (!validation.isValid) {
    return dispatch(actions.updateRegistrationForm({ validation }));
  }
  dispatch(actions.updateRegistrationForm({ validation: {} }));
  onSuccess && onSuccess();
};

const checkUploadAvatarPage = onSuccess => async (dispatch, getState) => {
  const { registration } = getState().auth;
  const { urlAvatar } = registration;
  if (urlAvatar !== 'Default') {
    dispatch(actions.updateRegistrationForm({ validation: {} }));
    onSuccess && onSuccess(true);
  } else {
    onSuccess && onSuccess(false);
  }
};

const register = (params, onSuccess, onError) => async (dispatch, getState) => {
  const { registration } = getState().auth;
  const {
    username,
    password,
    firstQuestion,
    secondQuestion,
    firstAnswer,
    secondAnswer,
    urlAvatar,
  } = registration;
  let authResponse = null;
  const securityQuestions = [
    {
      id: firstQuestion.id,
      answer: firstAnswer,
    },
    {
      id: secondQuestion.id,
      answer: secondAnswer,
    },
  ];

  dispatch(appOperations.showLoading());
  try {
    authResponse = await api.register({
      username,
      password,
      securityQuestions,
      urlAvatar,
    });
    dispatch(appOperations.hideLoading());
    onSuccess && onSuccess(authResponse);
  } catch (error) {
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        message: getLangErrorMessage(error.data, getState),
      };
      dispatch(appOperations.hideLoading());
      return dispatch(actions.updateRegistrationForm({ validation }));
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const refreshLoginForm = () => dispatch => {
  return dispatch(actions.refreshLoginForm());
};

const refreshRegistrationForm = () => dispatch => {
  return dispatch(actions.refreshRegistrationForm());
};

const refreshForgotPasswordForm = () => dispatch => {
  return dispatch(actions.refreshForgotPasswordForm());
};

const refreshSecurityQuestionForm = () => dispatch => {
  return dispatch(actions.refreshSecurityQuestionForm());
};

const refreshNewPasswordForm = () => dispatch => {
  return dispatch(actions.refreshNewPasswordForm());
};

const logout = () => async dispatch => {
  try {
    try {
      await api.deleteDevice(await DeviceInfo.getUniqueId(),);
      await api.logout();
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    } catch (error) {
      console.log(`🚀 : logout -> error1:`, error);
    }
    await authTokens.clear();
    await themesService.clear();
    setAccessToken();
    setLoginSession();
    removeAuthorizationToken();
    dispatch(actions.removeUser());
  } catch (error) {
    console.log(`🚀 : logout -> error2:`, error);
  }
};

const showUsernameModal = () => dispatch => {
  return dispatch(actions.changeVisibleUsernameModal(true));
};

const hideUsernameModal = () => dispatch => {
  return dispatch(actions.changeVisibleUsernameModal(false));
};

const uploadAvatar = image => async dispatch => {
  // console.log('Response = ', image);
  if (image.didCancel) {
    console.log('User cancelled image picker');
  } else if (image.error) {
    console.log('ImagePicker Error: ', image.error);
  } else if (image.customButton) {
    console.log('User tapped custom button: ', image.customButton);
  } else {
    dispatch(appOperations.showLoading());
    try {
      let responseUploadAvatar = await apiProfile.uploadAvatarToS3(image);
      if (responseUploadAvatar) {
        dispatch(
          actions.updateRegistrationForm({ urlAvatar: responseUploadAvatar }),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(appOperations.hideLoading());
    }
  }
};

const addRating = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    const { ratingApp } = getState().app;
    if (ratingApp.isSelected) {
      let responseAddRating = await api.addRating({
        score: ratingApp.ratingPoint,
        content: ratingApp.answerRating,
        action: 'Submit',
      });
      if (responseAddRating) {
        var token = await authTokens.getAccessToken();
        if (token) {
          const user = await authTokens.getUser();
          var userNew = {
            ...user,
            ...responseAddRating,
          };

          await authTokens.storeUser(userNew);
          setUser(userNew);

          await dispatch(
            appOperations.setRatingApp({
              isRating: false,
              isRatingSuccess: true,
              answerRating: '',
              ratingPoint: 0,
              isSelected: false,
            }),
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const closeRating = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    const { ratingApp } = getState().app;
    let responseCloseRating;
    if (!ratingApp.isSelected) {
      responseCloseRating = await api.updateReminderRatingDate({});
    } else {
      responseCloseRating = await api.addRating({
        score: ratingApp.ratingPoint,
        content: ratingApp.answerRating,
        action: 'ClosePopup',
      });
    }
    if (responseCloseRating) {
      var token = await authTokens.getAccessToken();
      if (token) {
        const user = await authTokens.getUser();
        var userNew = {
          ...user,
          ...responseCloseRating,
        };

        await authTokens.storeUser(userNew);
        setUser(userNew);

        await dispatch(
          appOperations.setRatingApp({
            isRating: false,
            isRatingSuccess: false,
            answerRating: '',
            ratingPoint: 0,
            isSelected: false,
          }),
        );
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const checkAndRequestPermission = () => async dispatch => {
  var permissions = [];
  var permissionsAccepted = [];
  var permissionsRequested = 0;

  if (Platform.OS === 'ios') {
    permissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY];
  } else {
    if (Platform.Version >= 33) {
      permissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES];
    } else {
      permissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
    }
  }

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

  return true;
};

const chooseImage = isTakePhoto => async dispatch => {
  if (isTakePhoto) {
    ImagePicker.launchCamera(options, response =>
      dispatch(uploadAvatar(response)),
    );
  } else {
    ImagePicker.launchImageLibrary(options, response => {
      dispatch(uploadAvatar(response));
    });
  }
};
var logoutAlertTime = new Date() - 30000;
const logoutAlert = async () => {
  if (new Date() - logoutAlertTime > 30000) {
    // only show after latest time show 30s
    logoutAlertTime = new Date();
    try {
      await api.deleteDevice(await DeviceInfo.getUniqueId(),);
      await api.logout();
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    } catch (error) {
      console.log(`🚀 : logoutAlert -> error1:`, error);
    }
    await authTokens.clear();
    await themesService.clear();
    setAccessToken();
    setLoginSession();
    removeAuthorizationToken();
    Alert.alert('Eve', renderText('LOGOUT_ALERT'), [{
      text: 'OK', onPress: () => getCallback('logout')(),
    }]);
  }
};

const getFeatures = () => async dispatch => {
  try {
    const features = await api.getFeatures();
    return dispatch(actions.setFeatures(features));
  } catch (error) {
    console.log(error);
  }
};

const updateReAuthConfirm = (status) => dispatch => {
  return dispatch(actions.updateReAuthConfirm(status));
};

const removeUser = () => dispatch => {
  return dispatch(actions.removeUser());
};

const exchangeSSOCode = (code, onSuccess, onError) => async (
  dispatch,
  getState,
) => {
  let authResponse = null;
  try {
    authResponse = await api.exchangeSSOCode(code);
    await dispatch(processAuthResponse(authResponse));
    onSuccess && onSuccess(authResponse);
  } catch (error) {
    onError && onError({authResponse, error});
    const errValidation = {
      isValid: false,
      message:
        error && error.data && error.data.code
          ? getLangErrorMessage(error.data, getState)
          : 'ERROR_OCCURRED',
    };
    dispatch(appOperations.hideLoading());
    return dispatch(actions.updateLoginForm({validation: errValidation}));
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

export default {
  logoutAlert,
  checkIsOffice365ByUsername,
  updateLoginForm,
  updateRegistrationForm,
  updateForgotPasswordForm,
  login,
  loginWithOffice365,
  loginWithGoogle,
  logout,
  register,
  resetPassword,
  getSecurityQuestions,
  getUserSecurityQuestions,
  checkRegisterPage,
  checkSecurityQuestionPage,
  checkAccountSecurityPage,
  refreshLoginForm,
  refreshForgotPasswordForm,
  refreshRegistrationForm,
  refreshNewPasswordForm,
  refreshSecurityQuestionForm,
  hideUsernameModal,
  showUsernameModal,
  setUser,
  saveDevice,
  uploadAvatar,
  checkUploadAvatarPage,
  addRating,
  closeRating,
  checkAndRequestPermission,
  chooseImage,
  getFeatures,
  updateReAuthConfirm,
  removeUser,
  exchangeSSOCode,
};
