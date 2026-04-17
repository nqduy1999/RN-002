import {
  SET_WALLET_REWARDS,
  SET_SINGLE_WALLET_REWARD,
  UPDATE_REWARD_STATUS,
  CLEAR_SINGLE_WALLET_REWARD,
  CLEAR_WALLET_REWARDS,
  DELETE_REWARD_BY_ID,
  ADD_SINGLE_REWARD,
  SET_WALLET_HISTORIES,
  CLEAR_WALLET_HISTORIES,
  SET_REFRESHING,
  SET_WALLET_HISTORIES_FILTER,
} from './constants';

const setWalletRewards = rewards => ({
  type: SET_WALLET_REWARDS,
  rewards,
});

const setSingleWalletReward = singleReward => ({
  type: SET_SINGLE_WALLET_REWARD,
  singleReward,
});

const updateRewardStatus = rewardStatus => ({
  type: UPDATE_REWARD_STATUS,
  rewardStatus,
});

const clearWalletRewards = () => ({
  type: CLEAR_WALLET_REWARDS,
});

const clearSingleWalletReward = () => ({
  type: CLEAR_SINGLE_WALLET_REWARD,
});

const deleteRewardById = id => ({
  type: DELETE_REWARD_BY_ID,
  id,
});

const addSingleReward = reward => ({
  type: ADD_SINGLE_REWARD,
  reward,
});

const setWalletHistories = walletHistories => ({
  type: SET_WALLET_HISTORIES,
  walletHistories,
});

const clearWalletHistories = () => ({
  type: CLEAR_WALLET_HISTORIES,
});

const setRefreshing = refreshing => ({
  type: SET_REFRESHING,
  refreshing,
});

const setWalletHistoriesFilter = payload => ({
  type: SET_WALLET_HISTORIES_FILTER,
  payload
})

export default {
  setSingleWalletReward,
  setWalletRewards,
  updateRewardStatus,
  clearSingleWalletReward,
  clearWalletRewards,
  deleteRewardById,
  addSingleReward,
  setWalletHistories,
  clearWalletHistories,
  setRefreshing,
  setWalletHistoriesFilter,
};
