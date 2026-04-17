import api from '@services/remote/baseApi';
import apiEndpoints from '@services/remote/apiEndpoints';
import withQuery from 'with-query';
import moment from 'moment';

//GET==========================================================
const getWalletRewards = async params => {
  return api.get(withQuery(apiEndpoints.GET_WALLET_REWARDs, params));
};

const getSingleWalletReward = async id => {
  return api.get(apiEndpoints.GET_WALLET_REWARD.replace('{0}', id));
};

const getWalletHistories = async ({id, startDate, endDate, page}) => {
  if (id === 0) {
    startDate = moment()
      .set('date', 1)
      .add(-11, 'month')
      .format('YYYY-MM-DD');

    endDate = moment()
      .set('date', 1)
      .add(1, 'month')
      .add(-1, 'day')
      .format('YYYY-MM-DD');
  }
  return api.get(
    withQuery(apiEndpoints.GET_WALLET_HISTORIES, {
      page,
      startDate,
      endDate,
      pageSize: 16,
    }),
  );
};

//PUT==========================================================
const updateRewardStatus = async (id, body) => {
  return api.put(
    apiEndpoints.PUT_UPDATE_REWARD_STATUS.replace('{0}', id),
    body,
  );
};

export default {
  getSingleWalletReward,
  getWalletRewards,
  getWalletHistories,
  updateRewardStatus,
};
