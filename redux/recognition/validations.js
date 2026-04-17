import {
  requiredValidation,
  idValidation,
  notEmptyStringValidation,
  minimumWordsValidation,
} from '../helpers/validations';
import {
  FIELD_NOTE_REQUIRED,
  FIELD_CRITERIA_REQUIRED,
  FIELD_RECEIVER_REQUIRED,
  FIELD_NOTE_MINIMUM_WORDS_REQUIRED,
  FIELD_SEFT_RECONGINATION_SCHEME_REQUIED,
} from '@resources/string/strings';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
const setting = BuildVersion.setting;
import { getLoginSession } from '@utils/CoreUtils';

export const sendRecognitionValidation = ({
  receiverId,
  criteriaId,
  criteriaIds,
  note,
  point,
  isGroupKudos,
  recogniseEmployee,
}) => {
  var validation = {
    isValid: true,
  };
  if (!idValidation(receiverId) && !isGroupKudos) {
    validation.message = FIELD_RECEIVER_REQUIRED;
    validation.isValid = false;
  }

  if ((!recogniseEmployee || recogniseEmployee.length === 0) && isGroupKudos) {
    validation.message = FIELD_RECEIVER_REQUIRED;
    validation.isValid = false;
  }

  if ((!IS.NESTLE && !requiredValidation(criteriaId)) || (IS.NESTLE && !criteriaIds.length)) {
    validation.message = FIELD_CRITERIA_REQUIRED;
    validation.isValid = false;
  }

  if (!notEmptyStringValidation(note)) {
    validation.message = FIELD_NOTE_REQUIRED;
    validation.isValid = false;
  }

  if (
    !minimumWordsValidation(note, setting.minimumWords) &&
    setting.version !== 'athena' && getLoginSession().employerId !== 95
  ) {
    validation.message = FIELD_NOTE_MINIMUM_WORDS_REQUIRED;
    validation.isValid = false;
  }

  return validation;
};

export const sendSelfRecognitionValidation = ({ programId, note }) => {
  var validation = {
    isValid: true,
  };
  if (!notEmptyStringValidation(note)) {
    validation.message = FIELD_NOTE_REQUIRED;
    validation.isValid = false;
  }
  if (!programId) {
    validation.message = FIELD_SEFT_RECONGINATION_SCHEME_REQUIED;
    validation.isValid = false;
  }

  return validation;
};
