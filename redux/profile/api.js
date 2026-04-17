import api from '@services/remote/baseApi';
import apiEndpoints from '@services/remote/apiEndpoints';
import {version} from '@resources/build_version/BuildVersion';

//GET==========================================================
const getUserProfile = async () => {
  return api.get(apiEndpoints.GET_PROFILE_USER);
};

const updateUserProfile = async body => {
  return api.put(apiEndpoints.PUT_UPDATE_PROFILE_USER, body);
};

const uploadAvatarToS3 = file => {
  const formData = new FormData();
  formData.append('files', {
    uri: file.uri,
    type: file.type, // or photo.type
    name: file.fileName,
  });
  formData.append('folder', 'Avatar');
  return api.post(apiEndpoints.POST_UPLOAD_S3, formData, {
    headers: {
      'Evehr-Application' : version, 
      'Content-Type': 'multipart/form-data',
    },
  });
};

const updateUserPassword = async body => {
  return api.put(apiEndpoints.PUT_UPDATE_PASSWORD, body);
};

const getAnswerSecurityQuestionsOfMine = async () => {
  return api.get(apiEndpoints.GET_ANSWER_QUESTION_SECURITY);
};

const updateAnswerSecurityQuestionOfMine = async body => {
  return api.put(apiEndpoints.PUT_UPDATE_SECURITY_QUESTIONS, body);
};

export default {
  getUserProfile,
  updateUserProfile,
  uploadAvatarToS3,
  updateUserPassword,
  getAnswerSecurityQuestionsOfMine,
  updateAnswerSecurityQuestionOfMine
};
