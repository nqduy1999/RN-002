import api from '@services/remote/baseApi';
import apiEndpoints from '@services/remote/apiEndpoints';
import withQuery from 'with-query';

//GET==========================================================
const getNotifications = async params => {
  let isInAppNotify = params.category === 'SPVB';
  let url = apiEndpoints[isInAppNotify ? 'GET_IN_APPP_NOTIFICATIONS' : `GET_NOTIFICATIONS`];
  if (isInAppNotify) {
    params.sortNames = 'PublishedDate';
    params.sortDirections = '1';
  }
  return api.get(withQuery(url, params));
};

const getSingleArticle = async id => {
  return api.get(apiEndpoints.GET_NEW.replace('{0}', id));
};

const getSingleRecognition = async params => {
  return api.get(withQuery(apiEndpoints.GET_RECOGNITION, params));
};

const getTopNotification = async () => {
  return api.get(withQuery(apiEndpoints.GET_TOP_NOTIFICATION));
};

//PUT==========================================================
const readNotification = async (id, notify) => {
  let isInAppNotify = notify && notify.notificationType === 'SPVB';
  let url = apiEndpoints[isInAppNotify ? 'PUT_READ_IN_APPP_NOTIFICATION' : 'PUT_READ_NOTIFICATION'];
  return api.put(url.replace('{0}', id));
};

const readAllNotification = async (type) => {
  let isInAppNotify = type === 'SPVB';
  let url = apiEndpoints[isInAppNotify ? 'PUT_ALL_READ_IN_APPP_NOTIFICATION' : 'PUT_ALL_READ_NOTIFICATION'];
  return api.put(url);
};

export default {
  getNotifications,
  readNotification,
  readAllNotification,
  getSingleArticle,
  getSingleRecognition,
  getTopNotification,
};
