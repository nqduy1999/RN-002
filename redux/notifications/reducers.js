import {
  SET_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  READ_NOTIFICATION,
  READ_ALL_NOTIFICATION,
  CHANGE_NOTIFICATION_CATEGORY,
  GET_TOP_NOTIFICATION_SUCCESS,
  GET_TOP_NOTIFICATION,
  GET_TOP_NOTIFICATION_FAILED,
  SHOW_LOADING_NOTIFICATION,
  HIDE_LOADING_NOTIFICATION,
} from './constants';

const defaultState = {
  notifications: {
    data: [],
    unreadCount: 0,
    page: 1,
    pageSize: 16,
    sortNames: 'CreatedAt',
    sortDirections: 'OrderByDescending',
    hasNext: true,
    category: 'Recognition',
  },
  topNotification: {
    unreadCount: 0,
  },
  isLoading: false,
};

const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_NOTIFICATION_CATEGORY:
      return {
        ...state,
        notifications: {
          ...defaultState.notifications,
          category: action.newCategory,
        },
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: defaultState.notifications,
      };
    case SET_NOTIFICATIONS:
      if (action.notifications.page) {
        if (action.notifications.page <= state.notifications.page) {
          return state;
        }
      }
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.notifications,
          data: [...state.notifications.data, ...action.notifications.data],
        },
      };
    case READ_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: state.notifications.data.map(item =>
            item.id === action.id
              ? {
                ...item,
                isRead: true,
              }
              : item,
          ),
          unreadCount: state.notifications.unreadCount - 1,
        },
      };
    case READ_ALL_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          unreadCount: 0,
          data: state.notifications.data.map(item => {
            return {
              ...item,
              isRead: true,
            };
          }),
        },
      };
    case GET_TOP_NOTIFICATION:
      return { ...state };
    case GET_TOP_NOTIFICATION_SUCCESS:
      return {
        ...state,
        topNotification: action.payload,
      };
    case GET_TOP_NOTIFICATION_FAILED:
      return { ...state };
    case SHOW_LOADING_NOTIFICATION:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADING_NOTIFICATION:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reduce;
