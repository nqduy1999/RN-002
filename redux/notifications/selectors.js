import {createSelector} from 'reselect';

const notificationsSelector = state => state.notifications;

const notificationsUnreadCountSelector = createSelector(
  notificationsSelector,
  notification => {
    return notification.topNotification.unreadCount;
  },
);

export {notificationsUnreadCountSelector};
