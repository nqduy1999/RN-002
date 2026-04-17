import {
  SET_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  READ_NOTIFICATION,
  READ_ALL_NOTIFICATION,
  CHANGE_NOTIFICATION_CATEGORY,
  GET_TOP_NOTIFICATION,
  GET_TOP_NOTIFICATION_SUCCESS,
  GET_TOP_NOTIFICATION_FAILED,
  SHOW_LOADING_NOTIFICATION,
  HIDE_LOADING_NOTIFICATION,
} from './constants';

const setNotifications = notifications => ({
  type: SET_NOTIFICATIONS,
  notifications,
});

const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});

const readNotification = id => ({
  type: READ_NOTIFICATION,
  id,
});

const readAllNotification = () => ({
  type: READ_ALL_NOTIFICATION,
});

const changeNotificationCategory = newCategory => ({
  type: CHANGE_NOTIFICATION_CATEGORY,
  newCategory,
});

export const getTopNotification = params => ({
  type: GET_TOP_NOTIFICATION,
  params,
});

export const getTopNotificationSuccess = payload => ({
  type: GET_TOP_NOTIFICATION_SUCCESS,
  payload,
});

export const getTopNotificationFailed = error => ({
  type: GET_TOP_NOTIFICATION_FAILED,
  error,
});

export const setShowLoadingNotification = () => ({
  type: SHOW_LOADING_NOTIFICATION,
});

export const setHideLoadingNotification = () => ({
  type: HIDE_LOADING_NOTIFICATION,
});

export default {
  setNotifications,
  clearNotifications,
  readNotification,
  readAllNotification,
  changeNotificationCategory,
  getTopNotification,
  getTopNotificationSuccess,
  getTopNotificationFailed,
  setShowLoadingNotification,
  setHideLoadingNotification,
};
