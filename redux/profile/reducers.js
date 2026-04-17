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
import moment from 'moment';
const maxYear = 60;
const yearStart = moment().year() - 17 - maxYear;

const defaultChangePasswordForm = {
  changePassWordForm: {
    oldPassword: null,
    newPassword: null,
    newPasswordConfirm: null,
  },
};

const defaultSecurityForm = {
  securityQuestionForm: {
    password: null,
    idQuestionOne: null,
    questionOne: null,
    answerOne: null,
    idQuestionTwo: null,
    questionTwo: null,
    answerTwo: null
  },
}

const defaultState = {
  profile: {
    fullName: '',
    gender: 'Default',
  },
  updateProfileForm: {
    fullName: '',
    gender: 'Default',
    birthday: moment.utc('1/1/' + yearStart, 'DD/MM/YYYY'),
  },
  ...defaultChangePasswordForm,
  ...defaultSecurityForm,
  answerSecurityQuestions: {},
  isShowSuccessModal: false,
};

const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
        updateProfileForm: action.profile,
      };
    case SET_UPDATE_USER_PROFILE_FORM:
      return {
        ...state,
        updateProfileForm: {
          ...state.updateProfileForm,
          ...action.form,
        },
      };
    case INIT_UPDATE_USER_PROFILE_FORM:
      return {
        ...state,
        updateProfileForm: state.profile,
      };
    case UPDATE_PASSWORD_FORM:
      return {
        ...state,
        changePassWordForm: {
          ...state.changePassWordForm,
          ...action.data
        }
      }
    case SET_ANSWER_SECURITY_QUESTIONS:
      return {
        ...state,
        answerSecurityQuestions: action.data,
        securityQuestionForm: {
          ...state.securityQuestionForm,
          answerOne: action.data[0].answer,
          answerTwo: action.data[1].answer,
          idQuestionOne: action.data[0].id,
          idQuestionTwo: action.data[1].id,
          questionOne: action.data[0].question,
          questionTwo: action.data[1].question
        }
      }
    case UPDATE_SECURITY_FORM:
      return {
        ...state,
        securityQuestionForm: {
          ...state.securityQuestionForm,
          ...action.data
        }
      }
    case TOGGLE_MODAL_SUCCESS:
      return {
        ...state,
        isShowSuccessModal: action.isShow
      }
    case RESET_FORM_SECURITY:
      return {
        ...state,
        changePassWordForm: defaultChangePasswordForm,
        securityQuestionForm: defaultSecurityForm
      }
    default:
      return state;
  }
};

export default reduce;
