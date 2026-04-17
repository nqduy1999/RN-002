import {createSelector} from 'reselect';
import moment from 'moment';

const notificationsSelector = state => state.notifications.notifications.data;

const notificationsUnreadCountSelector = createSelector(
  notificationsSelector,
  notifications => {
    return notifications.filter(item => !item.isRead).length;
  },
);

const walletHistoriesSelector = state => state.wallet.walletHistories.data;

const walletHistoriesGroupByDateSelector = createSelector(
  [walletHistoriesSelector],
  data => {

    const map = new Map();
    data.forEach(item => {
      var convertItem = {
        ...item,
      };
      const key = moment(item.createdAt).format('DD/MM/YYYY');
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [convertItem]);
      } else {
        collection.push(convertItem);
      }
    });
    return map;
  },
);

export {notificationsUnreadCountSelector, walletHistoriesGroupByDateSelector};
