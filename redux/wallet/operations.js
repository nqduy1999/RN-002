import actions from './actions';
import appOperations from '../app/operations';
import api from './api';
import {} from '@resources/string/strings';
import {} from '../../resources/images';
import authOperations from '../auth/operations';
import {isUnauthorized} from '../helpers/errorHandler';
import authTokens from '@services/local/auth-tokens';

const clearWalletRewards = () => dispatch => {
  return dispatch(actions.clearWalletRewards());
};

const clearSingleWalletReward = () => dispatch => {
  return dispatch(actions.clearSingleWalletReward());
};

const getSingleWalletReward = id => async (dispatch, getState) => {
  var token = await authTokens.getAccessToken();
  // console.log(token);
  dispatch(appOperations.showLoading());
  try {
    const response = await api.getSingleWalletReward(id);
    if (response) {
      const data = {
        ...response,
        title: response.brandName,
        subtitle: response.name,
        coverImage: {
          source: {
            uri: response.imageUrl ? response.imageUrl : undefined,
          },
        },
        logo: {
          source: {
            uri: response.brandImageUrl ? response.brandImageUrl : undefined,
          },
        },
        coin: response.coins,
        usedIn: response.usedIn ? response.usedIn : undefined,
        expireIn: response.expireIn ? response.expireIn : undefined,
      };
      dispatch(actions.setSingleWalletReward(data));
      return true;
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getWalletRewards = () => async (dispatch, getState) => {
  const {rewards, rewardStatus} = getState().wallet;
  const {page, pageSize, sortDirections, sortNames, hasNext} = rewards;
  if (hasNext) {
    try {
      let response = await api.getWalletRewards({
        page,
        pageSize,
        sortDirections,
        sortNames,
        status: rewardStatus.toLowerCase(),
      });
      if (response) {
        const data = response.items.map(item => {
          return {
            ...item,
            title: item.brandName,
            subtitle: item.name,
            coverImage: {
              source: {
                uri: item.imageUrl ? item.imageUrl : undefined,
              },
            },
            logo: {
              source: {
                uri: item.brandImageUrl ? item.brandImageUrl : undefined,
              },
            },
            usedIn: item.usedIn ? item.usedIn : undefined,
            expireIn: item.expireIn ? item.expireIn : undefined,
          };
        });

        dispatch(
          actions.setWalletRewards({
            data: data,
            hasNext: page < response.totalPage,
            page: page + 1,
          }),
        );
      }
    } catch (error) {
      if (isUnauthorized(error)) {
        dispatch(appOperations.hideLoading());
        authOperations.logoutAlert();
      }
      console.log(error);
    } finally {
    }
  }
};

const getWalletHistories = () => async (dispatch, getState) => {
  const {
    walletHistories: {
      page,
      hasNext,
      filter: {time},
    },
  } = getState().wallet;

  if (!hasNext) {
    return;
  }

  dispatch(actions.setWalletHistories({data: [], hasNext: false}));

  try {
    const {items, totalPage} = await api.getWalletHistories({page, ...time});

    await dispatch(
      actions.setWalletHistories({
        data: [...items],
        hasNext: page < totalPage,
        page: page + 1,
      }),
    );
  } catch (error) {
    console.log('getWalletHistories', error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const loadMoreWalletHistories = currentPage => async (dispatch, getState) => {
  const {
    walletHistories: {page, hasNext},
  } = getState().wallet;

  if (page !== currentPage && !hasNext) {
    return;
  }

  await dispatch(getWalletHistories());
};

const clearWalletHistories = () => async dispatch => {
  dispatch(actions.setRefreshing(true));
  dispatch(actions.clearWalletHistories());
  await dispatch(getWalletHistories());
  dispatch(actions.setRefreshing(false));
};

const applyWalletHistoriesFilter = filter => async dispatch => {
  dispatch(actions.setWalletHistoriesFilter(filter));
  await dispatch(clearWalletHistories());
  await dispatch(loadMoreWalletHistories());
};

const initWallet = () => async dispatch => {
  dispatch(appOperations.showLoading());
  await dispatch(clearWalletRewards());
  await dispatch(getWalletRewards());
  dispatch(appOperations.hideLoading());
};

const updateRewardStatus = status => async (dispatch, getState) => {
  const {rewardStatus} = getState().wallet;
  if (rewardStatus === status) {
    return;
  }
  dispatch(appOperations.showLoading());
  await dispatch(clearWalletRewards());
  await dispatch(actions.updateRewardStatus(status));
  await dispatch(getWalletRewards());
  dispatch(appOperations.hideLoading());
};

const setWalletRewards = status => async dispatch => {
  await dispatch(actions.updateRewardStatus(status));
};

const loadMoreWallet = currentPage => (dispatch, getState) => {
  const {page, hasNext} = getState().wallet.rewards;
  if (page !== currentPage && !hasNext) {
    return;
  }
  dispatch(appOperations.showLoading());
  dispatch(getWalletRewards());
  dispatch(appOperations.hideLoading());
};

const changeSingleRewardStatus = () => async (dispatch, getState) => {
  const {singleReward} = getState().wallet;
  let status = 'Used';
  if (singleReward.status === 'Used') {
    status = 'Active';
  }
  return dispatch(changeRewardStatus(singleReward.id, status));
};

const changeRewardStatus = (id, status) => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  const {rewards, rewardStatus} = getState().wallet;
  try {
    const body = {
      status,
      getRewardStatus: rewardStatus,
      page: rewards.page - 1,
      pageSize: rewards.pageSize,
      sortNames: [rewards.sortNames],
      sortDirections: [rewards.sortDirections],
    };
    // console.log(id, body);
    let response = await api.updateRewardStatus(id, body);
    if (response && response.updatedSucceed) {
      const {nextItem} = response;
      await dispatch(actions.deleteRewardById(id));
      if (nextItem) {
        await dispatch(
          actions.addSingleReward({
            ...nextItem,
            title: nextItem.brandName,
            subtitle: nextItem.name,
            coverImage: {
              source: {
                uri: nextItem.imageUrl ? nextItem.imageUrl : undefined,
              },
            },
            logo: {
              source: {
                uri: nextItem.brandImageUrl
                  ? nextItem.brandImageUrl
                  : undefined,
              },
            },
            usedIn: nextItem.usedIn ? nextItem.usedIn : undefined,
            expireIn: nextItem.expireIn ? nextItem.expireIn : undefined,
          }),
        );
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

export default {
  getSingleWalletReward,
  initWallet,
  updateRewardStatus,
  loadMoreWallet,
  clearSingleWalletReward,
  changeSingleRewardStatus,
  changeRewardStatus,
  setWalletRewards,
  getWalletHistories,
  loadMoreWalletHistories,
  clearWalletHistories,
  applyWalletHistoriesFilter,
};
