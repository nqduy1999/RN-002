import {
  TYPE_LOGIN_USER,
  UPDATE_LOGIN_FORM,
  UPDATE_REGISTRATION_FORM,
  SET_SECURITY_QUESTIONS,
  UPDATE_FORGOT_PASSWORD_FORM,
  REFRESH_FORGOT_PASSWORD_FORM,
  REFRESH_LOGIN_FORM,
  REFRESH_REGISTRATION_FORM,
  REFRESH_SECURITY_QUESTION_FORM,
  REFRESH_NEW_PASSWORD_FORM,
  SET_USER,
  REMOVE_USER,
  UPDATE_RE_AUTH_CONFIRM,
  CHANGE_VISIBLE_USERNAME_MODAL,
  SET_FEATURES,
} from './constants';

const defaultState = {
  user: undefined,
  isAuthorized: false,
  office365: {
    isOffice365Enabled: false,
    office365AppId: '',
    office365TenantId: '',
    office365AndroidRedirectUri: '',
    office365IosRedirectUri: ''
  },
  login: {
    username: __DEV__ ? 'admin' : '',
    password: __DEV__ ? '123' : '',
  },
  registration: {
    canRegister: false,
    username: __DEV__ ? 'u105firstname_u105lastname_2010_105' : '',
    password: __DEV__ ? '1' : '',
    c_password: __DEV__ ? '1' : '',
    firstQuestion: undefined,
    firstAnswer: undefined,
    secondQuestion: undefined,
    secondAnswer: undefined,
    urlAvatar: 'Default',
  },
  forgotPassword: {
    hasQuestions: false,
    hasUsernameQuestions: '',
    username: __DEV__ ? 'u100firstname_u100lastname_2010_100' : '',
    questions: undefined,
  },
  securityQuestions: {},
};

const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_FORM:
      return {
        ...state,
        login: {
          ...state.login,
          ...action.form,
        },
      };
    case UPDATE_REGISTRATION_FORM:
      return {
        ...state,
        registration: {
          ...state.registration,
          ...action.form,
        },
      };
    case UPDATE_FORGOT_PASSWORD_FORM:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          ...action.form,
        },
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthorized: action.user !== undefined && action.user !== null,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: undefined,
        isAuthorized: false,
      };
    case UPDATE_RE_AUTH_CONFIRM:
      return {
        ...state,
        reAuthConfirm: action.status,
      };
    case TYPE_LOGIN_USER:
      return {
        ...state,
        office365: {
          ...state.office365,
          isOffice365Enabled: action.office365.isOffice365Enabled,
          office365AppId: action.office365.office365AppId,
          office365TenantId: action.office365.office365TenantId,
          office365AndroidRedirectUri: action.office365.office365AndroidRedirectUri,
          office365IosRedirectUri: action.office365.office365IosRedirectUri
        },
      };
    case SET_SECURITY_QUESTIONS:
      return {
        ...state,
        securityQuestions: action.securityQuestions,
      };
    case REFRESH_FORGOT_PASSWORD_FORM:
      return {
        ...state,
        forgotPassword: defaultState.forgotPassword,
      };
    case REFRESH_LOGIN_FORM:
      return {
        ...state,
        login: defaultState.login,
      };
    case REFRESH_REGISTRATION_FORM:
      return {
        ...state,
        registration: defaultState.registration,
      };
    case REFRESH_SECURITY_QUESTION_FORM:
      return {
        ...state,
        registration: {
          ...state.registration,
          firstQuestion: undefined,
          firstAnswer: undefined,
          secondQuestion: undefined,
          secondAnswer: undefined,
          validation: {
            ...state.registration.validation,
            firstQuestion: undefined,
            firstAnswer: undefined,
            secondQuestion: undefined,
            secondAnswer: undefined,
          },
        },
      };
    case REFRESH_NEW_PASSWORD_FORM:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          newPassword: undefined,
          c_password: undefined,
          validation: {
            ...state.forgotPassword.validation,
            newPassword: undefined,
            c_password: undefined,
          },
        },
      };
    case CHANGE_VISIBLE_USERNAME_MODAL:
      return {
        ...state,
        isUsernameModalVisible: action.isUsernameModalVisible,
      };
    case SET_FEATURES:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.features,
        },
      };
    default:
      return state;
  }
};

export default reduce;
