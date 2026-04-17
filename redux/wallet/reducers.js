import {
  SET_WALLET_REWARDS,
  SET_SINGLE_WALLET_REWARD,
  UPDATE_REWARD_STATUS,
  CLEAR_WALLET_REWARDS,
  CLEAR_SINGLE_WALLET_REWARD,
  DELETE_REWARD_BY_ID,
  ADD_SINGLE_REWARD,
  SET_WALLET_HISTORIES,
  CLEAR_WALLET_HISTORIES,
  SET_REFRESHING,
  SET_WALLET_HISTORIES_FILTER,
} from './constants';

const defaultState = {
  rewards: {
    data: [],
    page: 1,
    pageSize: 10,
    hasNext: true,
    sortDirections: 'OrderByDescending',
    sortNames: 'CreatedAt',
  },
  singleReward: {},
  rewardStatus: 'Active', //Used, Expired,
  walletHistories: {
    data: [],
    page: 1,
    pageSize: 16,
    hasNext: true,
    sortDirections: 'OrderByDescending',
    sortNames: 'CreatedAt',
    refreshing: false,
    filter: {
      time: {
        id: 0,
        name: '',
        startDate: null,
        endDate: null,
      },
    },
  },
};

const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case SET_WALLET_REWARDS:
      if (action.rewards.page) {
        if (action.rewards.page <= state.rewards.page) {
          return state;
        }
      }
      return {
        ...state,
        rewards: {
          ...state.rewards,
          ...action.rewards,
          data: [...state.rewards.data, ...action.rewards.data],
        },
      };
    case ADD_SINGLE_REWARD:
      if (
        state.rewards.data.findIndex(item => item.id === action.reward.id) ===
        -1
      ) {
        return {
          ...state,
          rewards: {
            ...state.rewards,
            data: [...state.rewards.data, action.reward],
          },
        };
      } else {
        return state;
      }
    case SET_SINGLE_WALLET_REWARD:
      return {
        ...state,
        singleReward: action.singleReward,
      };
    case UPDATE_REWARD_STATUS:
      return {
        ...state,
        rewardStatus: action.rewardStatus,
      };
    case CLEAR_WALLET_REWARDS:
      return {
        ...state,
        rewards: defaultState.rewards,
      };
    case CLEAR_SINGLE_WALLET_REWARD:
      return {
        ...state,
        singleReward: defaultState.singleReward,
      };
    case DELETE_REWARD_BY_ID:
      return {
        ...state,
        rewards: {
          ...state.rewards,
          data: state.rewards.data.filter(item => item.id !== action.id),
        },
      };
    case SET_WALLET_HISTORIES:
      return {
        ...state,
        walletHistories: {
          ...state.walletHistories,
          ...action.walletHistories,
          data: [...state.walletHistories.data, ...action.walletHistories.data],
        },
      };
    case CLEAR_WALLET_HISTORIES:
      return {
        ...state,
        walletHistories: {
          ...defaultState.walletHistories,
          filter: state.walletHistories.filter,
        },
      };
    case SET_REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };
    case SET_WALLET_HISTORIES_FILTER:
      return {
        ...state,
        walletHistories: {
          ...state.walletHistories,
          filter: {
            ...state.walletHistories.filter,
            time: action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export default reduce;
