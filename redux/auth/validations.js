import {
  requiredValidation,
  matchValidation,
  notEmptyStringValidation,
} from '../helpers/validations';
import {
  FIELD_PASSWORD_REQUIRED,
  FIELD_USERNAME_REQUIRED,
  FIELD_CONFIRM_PASSWORD_MATCH,
  FIELD_FIRST_SECURITY_QUESTION_REQUIRED,
  FIELD_SECOND_SECURITY_QUESTION_REQUIRED,
  FIELD_FIRST_ANSWER_REQUIRED,
  FIELD_SECOND_ANSWER_REQUIRED,
  FIELD_NEW_PASSWORD_REQUIRED,
  FIELD_QUESTIONS_MUST_NOT_MATCH,
} from '@resources/string/strings';

export const inputUsernameValidation = ({username}) => {
  var validation = {
    isValid: true,
  };
  if (!requiredValidation(username) || !notEmptyStringValidation(username)) {
    validation.username = FIELD_USERNAME_REQUIRED;
    validation.isValid = false;
  }

  return validation;
};

export const loginPageValidation = ({username, password}) => {
  var validation = {
    isValid: true,
  };
  if (!requiredValidation(username) || !notEmptyStringValidation(username)) {
    validation.username = FIELD_USERNAME_REQUIRED;
    validation.isValid = false;
  }

  if (!requiredValidation(password) || !notEmptyStringValidation(password)) {
    validation.password = FIELD_PASSWORD_REQUIRED;
    validation.isValid = false;
  }
  return validation;
};

export const registerPageValidation = ({username, password, c_password}) => {
  var validation = {
    isValid: true,
  };
  if (!requiredValidation(username) || !notEmptyStringValidation(username)) {
    validation.username = FIELD_USERNAME_REQUIRED;
    validation.isValid = false;
  }
  if (!requiredValidation(password) || !notEmptyStringValidation(password)) {
    validation.password = FIELD_PASSWORD_REQUIRED;
    validation.isValid = false;
  }
  if (!matchValidation(password, c_password)) {
    validation.c_password = FIELD_CONFIRM_PASSWORD_MATCH;
    validation.isValid = false;
  }
  return validation;
};

export const securityQuestionPageValidation = ({
  firstQuestion,
  firstAnswer,
  secondQuestion,
  secondAnswer,
}) => {
  var validation = {
    isValid: true,
  };
  if (!requiredValidation(firstQuestion)) {
    validation.firstQuestion = FIELD_FIRST_SECURITY_QUESTION_REQUIRED;
    validation.isValid = false;
  }
  if (
    !requiredValidation(firstAnswer) ||
    !notEmptyStringValidation(firstAnswer)
  ) {
    validation.firstAnswer = FIELD_FIRST_ANSWER_REQUIRED;
    validation.isValid = false;
  }
  if (!requiredValidation(secondQuestion)) {
    validation.secondQuestion = FIELD_SECOND_SECURITY_QUESTION_REQUIRED;
    validation.isValid = false;
  }
  if (
    !requiredValidation(secondAnswer) ||
    !notEmptyStringValidation(secondAnswer)
  ) {
    validation.secondAnswer = FIELD_SECOND_ANSWER_REQUIRED;
    validation.isValid = false;
  }
  if (
    requiredValidation(secondQuestion) &&
    requiredValidation(firstQuestion) &&
    matchValidation(firstQuestion.id, secondQuestion.id)
  ) {
    validation.message = FIELD_QUESTIONS_MUST_NOT_MATCH;
    validation.isValid = false;
  }
  return validation;
};

export const accountSecurityPageValidation = ({
  username,
  firstAnswer,
  secondAnswer,
}) => {
  var validation = {
    isValid: true,
  };
  if (!requiredValidation(username) || !notEmptyStringValidation(username)) {
    validation.username = FIELD_USERNAME_REQUIRED;
    validation.isValid = false;
  }
  if (
    !firstAnswer ||
    !requiredValidation(firstAnswer.answer) ||
    !notEmptyStringValidation(firstAnswer.answer)
  ) {
    validation.firstAnswer = FIELD_FIRST_ANSWER_REQUIRED;
    validation.isValid = false;
  }
  if (
    !secondAnswer ||
    !requiredValidation(secondAnswer.answer) ||
    !notEmptyStringValidation(secondAnswer.answer)
  ) {
    validation.secondAnswer = FIELD_SECOND_ANSWER_REQUIRED;
    validation.isValid = false;
  }
  return validation;
};

export const resetPasswordPageValidation = ({newPassword, c_password}) => {
  var validation = {
    isValid: true,
  };
  if (
    !requiredValidation(newPassword) ||
    !notEmptyStringValidation(newPassword)
  ) {
    validation.newPassword = FIELD_NEW_PASSWORD_REQUIRED;
    validation.isValid = false;
  }
  if (!matchValidation(newPassword, c_password)) {
    validation.c_password = FIELD_CONFIRM_PASSWORD_MATCH;
    validation.isValid = false;
  }
  return validation;
};
