import appOperations from '../app/operations';
import actions from './actions';
import api from './api';
import {
  UNKNOWN_ERROR,
  FIELD_NAME_EMPTY_LABEL,
  FIELD_PHONE_NUMBER_EMPTY,
} from '@resources/string/strings';
import authOperations from '../auth/operations';
import {isUnauthorized} from '../helpers/errorHandler';
import benefitIconType from '@resources/enum-types/benefitIconType.js';
import {renderText} from '@common/components/StringHelper';
import errorMsg from '@resources/string/errors';
import BuildVersion from '@resources/build_version/BuildVersion';
const setting = BuildVersion.setting || {};

const sortRewards = (sortBy, sortOrder) => async (dispatch, getState) => {
  await dispatch(actions.changeSortRewards({sortBy, sortOrder}));
};

const getSortRewards = () => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    await dispatch(actions.clearFlexibleBenefits());
    await dispatch(getFlexibleBenefits());
  } catch (error) {
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const searchRewards = query => async (dispatch, getState) => {
  try {
    dispatch(actions.setLoading(true));
    dispatch(appOperations.showLoading());
    await dispatch(actions.clearFlexibleBenefits());
    await dispatch(actions.setSearchRewardsQuery(query));
    await dispatch(getFlexibleBenefits());
  } catch (error) {
  } finally {
    dispatch(appOperations.hideLoading());
    dispatch(actions.setLoading(false));
  }
};

const clearSearchRewards = () => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    await dispatch(actions.clearFlexibleBenefits());
    await dispatch(actions.clearSearchRewardsQuery());
    return dispatch(getFlexibleBenefits());
  } catch (error) {
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getFlexibleBenefits = () => async (dispatch, getState) => {
  const {language} = getState().app;
  const {
    flexibleBenefits: {flexibleBenefits, flexibleCategory, flexibleCategories},
  } = getState();
  const {page, pageSize, hasNext, query, sortBy, sortOrder} = flexibleBenefits;
  if (hasNext) {
    try {
      if (flexibleCategory == 0) {
        return;
      }
      let response = await api.getFlexibleBenefits(
        {
          page,
          pageSize,
          lang: language,
          query,
          sortBy,
          sortOrder,
        },
        query ? [...flexibleCategories.map(c => c.id)] : [flexibleCategory],
      );
      if (response) {
        const data = response.items;
        await dispatch(
          actions.setFlexibleBenefits({
            data: data.map(item => {
              return {
                ...item,
                title: item.brandName ? item.brandName : '',
                subtitle: item.name ? item.name : '',
                money: item.price ? item.price : item.coins,
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
              };
            }),
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
      return false;
    } finally {
      dispatch(appOperations.hideLoading());
    }
  }
};

const getTopFlexibleBenefits = () => async (dispatch, getState) => {
  const {language} = getState().app;
  const {topFlexibleBenefits} = getState().flexibleBenefits;
  const {page, pageSize, hasNext} = topFlexibleBenefits;
  if (hasNext) {
    try {
      let response = await api.getTopFlexibleBenefits({
        page,
        pageSize,
        lang: language,
      });
      if (response) {
        const data = response.items;
        await dispatch(
          actions.setTopFlexibleBenefits({
            data: data.map(item => {
              return {
                ...item,
                title: item.brandName ? item.brandName : '',
                subtitle: item.name ? item.name : '',
                money: item.price ? item.price : item.coins,
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
              };
            }),
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
      return false;
    } finally {
      dispatch(appOperations.hideLoading());
    }
  }
};

const getFlexibleBenefitWalletHistories = () => async (dispatch, getState) => {
  if (setting.version !== 'dhl') {
    return;
  }
  const {
    flexibleBenefits: {
      flexibleBenefitWalletHistories: {hasNext, page},
    },
  } = getState();
  if (!hasNext) {
    return;
  }
  dispatch(
    actions.setFlexibleBenefitWalletHistories({data: [], hasNext: false}),
  );
  try {
    const {items, totalPage} = await api.getFlexibleBenefitWalletHistories(
      page,
    );
    await dispatch(
      actions.setFlexibleBenefitWalletHistories({
        data: [...items],
        hasNext: page < totalPage,
        page: page + 1,
      }),
    );
  } catch (error) {
    console.log('getFlexibleBenefitWalletHistories ', error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const initFlexibleBenefits = () => async (dispatch, getState) => {
  const {refreshing, flexibleCategories} = getState().flexibleBenefits;
  if (refreshing || flexibleCategories.length === 0) {
    dispatch(appOperations.showLoading());
    await dispatch(getFlexibleBenefitsInfoByCategory());
    await dispatch(getFlexibleCategories());
    await dispatch(actions.setRefreshing(false));
    await dispatch(getTopFlexibleBenefits());
    await dispatch(getFlexibleBenefits());
    await dispatch(getFlexibleBenefitWalletHistories());
    dispatch(appOperations.hideLoading());
  }
};

const getFlexibleCategories = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    let response = await api.getFlexibleCategories();
    await dispatch(appOperations.hideLoading());
    const {language} = getState().app;
    if (response) {
      response = response.benefitCategories.map((item, index) => {
        let convertItem = {
          ...item,
          title: language === 'en' ? item.name.en : item.name.vi,
        };
        if (index == 0) {
          dispatch(actions.setFlexibleCategory(item.id));
        }
        return convertItem;
      });
      await dispatch(actions.setFlexibleCategories(response));
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const clearFlexibleBenefits = () => async dispatch => {
  return await Promise.all([
    dispatch(getTopFlexibleBenefits()),
    dispatch(getFlexibleBenefits()),
  ]);
};
const loadMoreFlexibleBenefits = currentPage => async (dispatch, getState) => {
  const {page, hasNext} = getState().flexibleBenefits.flexibleBenefits;
  if (page !== currentPage && !hasNext) {
    return;
  }
  await dispatch(getFlexibleBenefits());
};

const loadMoreFlexibleBenefitsWalletHistories = currentPage => async (
  dispatch,
  getState,
) => {
  const {
    flexibleBenefits: {
      flexibleBenefitWalletHistories: {page, hasNext},
    },
  } = getState();
  if (page !== currentPage && !hasNext) {
    return;
  }
  await dispatch(getFlexibleBenefitWalletHistories());
};

const getSingleFlexibleBenefit = id => async (dispatch, getState) => {
  const {language} = getState().app;
  dispatch(appOperations.showLoading());
  await dispatch(actions.clearSingleFlexibleBenefit());
  try {
    let response = await api.getSingleFlexibleBenefit(id, language);
    response = {
      ...response,
      title: response.brandName ? response.brandName : '',
      subtitle: response.name ? response.name : '',
      money: response.price ? response.price : response.coins,
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
    };
    if (response) {
      await dispatch(actions.setSingleFlexibleBenefit(response));
      return true;
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const setFlexibleBenefitsCategories = id => async (dispatch, getState) => {
  const {flexibleBenefitsCategories} = getState().flexibleBenefits;

  var categorySelectedList = flexibleBenefitsCategories;

  var categories =
    categorySelectedList.indexOf(id) !== -1
      ? categorySelectedList.filter(item => item !== id)
      : [...categorySelectedList, id];

  await dispatch(actions.clearFlexibleBenefits());
  await dispatch(actions.setFlexibleBenefitsCategories(categories));
  if (categories === 0) {
    return;
  }
  return dispatch(getFlexibleBenefits());
};

const setFlexibleBenefitsCategory = category => async (dispatch, getState) => {
  const {flexibleCategory} = getState().flexibleBenefits;

  if (category === flexibleCategory) {
    return;
  }

  await dispatch(actions.clearFlexibleBenefits());
  await dispatch(actions.setFlexibleCategory(category));
  return dispatch(getFlexibleBenefits());
};

const renderBenefitIcon = iconType => {
  if (benefitIconType[iconType]) {
    return benefitIconType[iconType].icon;
  }
  return benefitIconType.Default.icon;
};

const renderBenefitText = (iconType, name) => {
  if (benefitIconType[iconType]) {
    return benefitIconType[iconType].text;
  }
  return name;
};

const getFlexibleBenefitsInfoByCategory = () => async dispatch => {
  const response = await api.getFlexibleBenefitsInfoByCategory();
  await dispatch(actions.setFlexibleBenefitsInfoByCategory(response));
};

const getFlexibleBenefitsInfo = () => async (dispatch, getState) => {
  try {
    let response = await api.getFlexibleBenefitsInfo();
    if (response) {
      response = {
        ...response,
        celebrateMilestones: response.celebrateMilestones.map(item => {
          return {
            ...item,
            money: item.amount,
            dueDate: item.date,
            title: renderBenefitText(item.iconType, item.name),
            subtitle: item.note,
            icon: renderBenefitIcon(item.iconType),
          };
        }),
        coreBenefits: response.coreBenefits.map(item => {
          return {
            ...item,
            money: item.amount,
            dueDate: item.date,
            title: renderBenefitText(item.iconType, item.name),
            subtitle: item.note,
            icon: renderBenefitIcon(item.iconType),
          };
        }),
      };
      // console.log(
      //   'getFlexibleBenefitsInfo',
      //   'response',
      //   JSON.stringify(response),
      // );
      await dispatch(actions.setFlexibleBenefitsInfo(response));
      return true;
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      authOperations.logoutAlert();
    }
    return false;
  } finally {
  }
};

const getFlexibleBenefitsBudget = () => async (dispatch, getState) => {
  try {
    let response = await api.getFlexibleBenefitsBudget();
    response = {
      ...response,
    };
    if (response) {
      await dispatch(actions.setFlexibleBenefitsBudget(response));
      return true;
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      authOperations.logoutAlert();
    }
    return false;
  } finally {
  }
};

const initFlexibleBenefitTotalPage = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  await Promise.all([
    dispatch(getFlexibleBenefitsInfoByCategory()),
    dispatch(getFlexibleBenefitsInfo()),
    dispatch(getFlexibleBenefitsBudget()),
  ]);
  dispatch(appOperations.hideLoading());
};

const changeStateWishlistSingleFlexibleBenefit = () => async (
  dispatch,
  getState,
) => {
  dispatch(appOperations.showLoading());
  try {
    const {
      id,
      isWishlistReward,
    } = getState().flexibleBenefits.singleFlexibleBenefit;

    var {total} = getState().flexibleBenefits.wishlist;

    let response = {};
    if (isWishlistReward) {
      response = await api.deleteItemInWishlist(id);
    } else {
      response = await api.postAddToWishlist(id);
    }
    if (response) {
      await dispatch(actions.changeStateWishlistSingleFlexibleBenefit());
      dispatch(
        actions.updateTotalWishList(isWishlistReward ? total - 1 : total + 1),
      );

      return true;
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const refreshFlexibleBenefit = () => async dispatch => {
  return dispatch(getFlexibleBenefitsBudget());
};

const getWishlist = () => async (dispatch, getState) => {
  const {wishlist} = getState().flexibleBenefits;
  const {page, pageSize, hasNext} = wishlist;
  if (hasNext) {
    try {
      let response = await api.getWishlist({
        page,
        pageSize,
      });
      if (response) {
        const data = response.items.filter(item => !!item.reward);
        await dispatch(
          actions.setWishlist({
            data: data.map(item => {
              const reward = item.reward;
              return {
                ...reward,
                wishlistId: item.id,
                title: reward.brandName ? reward.brandName : '',
                subtitle: reward.name ? reward.name : '',
                money: reward.price ? reward.price : reward.coins,
                coverImage: {
                  source: {
                    uri: reward.imageUrl ? reward.imageUrl : undefined,
                  },
                },
                logo: {
                  source: {
                    uri: reward.brandImageUrl
                      ? reward.brandImageUrl
                      : undefined,
                  },
                },
              };
            }),
            total: data.length,
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
      return false;
    } finally {
      dispatch(appOperations.hideLoading());
    }
  }
};

const initWishlist = () => async dispatch => {
  dispatch(appOperations.showLoading());
  await dispatch(actions.clearWishlist());
  await dispatch(getWishlist());
  dispatch(appOperations.hideLoading());
};

const loadMoreWishlist = currentPage => async (dispatch, getState) => {
  const {page, hasNext} = getState().flexibleBenefits.wishlist;
  if (page !== currentPage && !hasNext) {
    return;
  }
  await dispatch(getWishlist());
};

const updateQuantitySingleFlexibleBenefit = quantity => dispatch => {
  return dispatch(actions.updateQuantitySingleFlexibleBenefit(quantity));
};

const updateOptionsSingleFlexibleBenefit = (item, childItem) => dispatch => {
  return dispatch(
    actions.updateOptionsSingleFlexibleBenefit(item.id, childItem.id),
  );
};

const changeShowHideConfirmClaimModal = isShowConfirmClaimModal => async dispatch => {
  return dispatch(
    actions.showHideConfirmClaimFlexibleBenefit(isShowConfirmClaimModal),
  );
};

const changeShowHideErrorClaimModal = errorModal => async dispatch => {
  return dispatch(actions.showHideErrorClaimFlexibleBenefit(errorModal));
};

const changeShowHideSuccessClaimModal = isShowSuccessClaimModal => async dispatch => {
  return dispatch(
    actions.showHideSuccessClaimFlexibleBenefit(isShowSuccessClaimModal),
  );
};

const claimSingleFlexibleBenefit = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    const {claimSingleFlexibleBenefitForm} = getState().flexibleBenefits;
    const response = await api.postClaimFlexibleBenefit(
      claimSingleFlexibleBenefitForm,
    );
    if (response) {
      const {
        remainingFlexibleBenefitBalance,
        expireAt,
        accountRewardId,
      } = response;
      if (remainingFlexibleBenefitBalance) {
        let {flexibleBenefitsBudget} = getState().flexibleBenefits;
        flexibleBenefitsBudget = {
          ...flexibleBenefitsBudget,
          totalSpending:
            flexibleBenefitsBudget.totalBudget -
            remainingFlexibleBenefitBalance,
        };
        // dispatch(actions.setClaimRewardsExpiredAt(expireAt));
        dispatch(actions.setFlexibleBenefitsBudget(flexibleBenefitsBudget));
      }
      return {success: true, accountRewardId};
    }
    return {success: false, message: renderText(UNKNOWN_ERROR)};
  } catch (error) {
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        message: errorMsg['ERROR_CODE_' + error.data.code],
      };
      let renderMessage = validation.message
        ? renderText(validation.message)
        : error.data.message;
      dispatch(appOperations.hideLoading());
      return {success: false, message: renderMessage};
    }
    return {success: false, message: renderText(UNKNOWN_ERROR)};
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const updateFullNameSingleFlexibleBenefit = fullName => dispatch => {
  dispatch(actions.updateFullNameSingleFlexibleBenefit(fullName));
  dispatch(
    actions.updateErrorMessagesNonVoucher({
      phoneNumber: '',
      fullName: '',
      personalEmail: '',
    }),
  );
};

const updatePhoneNumberSingleFlexibleBenefit = phoneNumber => dispatch => {
  dispatch(actions.updatePhoneNumberSingleFlexibleBenefit(phoneNumber));
  dispatch(
    actions.updateErrorMessagesNonVoucher({
      phoneNumber: '',
      fullName: '',
      personalEmail: '',
    }),
  );
};

const updatePersionalEmailSingleFlexibleBenefit = personalEmail => dispatch => {
  dispatch(actions.updatePersonalEmailSingleFlexibleBenefit(personalEmail));
  dispatch(
    actions.updateErrorMessagesNonVoucher({
      phoneNumber: '',
      fullName: '',
      personalEmail: '',
    }),
  );
};

const refreshFlexibleBenefitWalletHistories = () => async (
  dispatch,
  getState,
) => {
  await dispatch(actions.clearFlexibleBenefitWalletHistories());
  const {items, totalPage, page} = await api.getFlexibleBenefitWalletHistories(
    1,
  );
  await dispatch(
    actions.setFlexibleBenefitWalletHistories({
      data: [...items],
      hasNext: page < totalPage,
      page: page + 1,
    }),
  );
};

const onRefresh = () => async dispatch => {
  await Promise.all([
    dispatch(actions.setRefreshing(true)),
    dispatch(actions.clearFlexibleBenefits()),
    dispatch(actions.clearTopFlexibleBenefits()),
    dispatch(actions.clearFlexibleCategories()),
    dispatch(actions.clearFlexibleBenefitWalletHistories()),
    dispatch(initFlexibleBenefits(dispatch)),
  ]);
};

const isRegisterNonVoucher = () => async (dispatch, getState) => {
  const {claimSingleFlexibleBenefitForm} = getState().flexibleBenefits;

  if (
    claimSingleFlexibleBenefitForm.fullName.length > 0 &&
    claimSingleFlexibleBenefitForm.phoneNumber.length > 0
  ) {
    return (
      claimSingleFlexibleBenefitForm.fullName.length > 0 &&
      claimSingleFlexibleBenefitForm.phoneNumber.length > 0
    );
  } else {
    if (
      claimSingleFlexibleBenefitForm.fullName.length == 0 &&
      claimSingleFlexibleBenefitForm.phoneNumber.length == 0
    ) {
      dispatch(
        actions.updateErrorMessagesNonVoucher({
          phoneNumber: renderText(FIELD_PHONE_NUMBER_EMPTY),
          fullName: renderText(FIELD_NAME_EMPTY_LABEL),
        }),
      );
    } else {
      if (claimSingleFlexibleBenefitForm.fullName.length == 0) {
        dispatch(
          actions.updateErrorMessagesNonVoucher({
            phoneNumber: '',
            fullName: renderText(FIELD_NAME_EMPTY_LABEL),
          }),
        );
      }

      if (claimSingleFlexibleBenefitForm.phoneNumber.length == 0) {
        dispatch(
          actions.updateErrorMessagesNonVoucher({
            phoneNumber: renderText(FIELD_PHONE_NUMBER_EMPTY),
            fullName: '',
          }),
        );
      }
    }

    return false;
  }
};

const setTradeModalVisible = visible => async dispatch => {
  return dispatch(actions.setTradeModalVisible(visible));
};

const setTradeSuccessModalVisible = visible => async dispatch => {
  return dispatch(actions.setTradeSuccessModalVisible(visible));
};

const getTradeOffSetting = () => async dispatch => {
  //dispatch(appOperations.showLoading());
  try {
    const response = await api.getAnnualLeaveTradeOffSetting();
    // console.log('getTradeOffSetting', 'response', JSON.stringify(response));
    if (response) {
      dispatch(actions.setTradeOffSetting(response));
    }
  } catch (error) {
    if (error.data && error.data.message) {
      //dispatch(appOperations.hideLoading());
      alert(error.data.message);
    }
  } finally {
    //dispatch(appOperations.hideLoading());
  }
};

const setTradeOffSetting = setting => async dispatch => {
  return dispatch(actions.setTradeOffSetting(setting));
};

const tradeAnnualDays = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    const {tradeOffSetting} = getState().flexibleBenefits;
    let body = {
      totalDays: tradeOffSetting.totalDays,
      allowanceId: tradeOffSetting.allowanceId,
    };
    const response = await api.tradeAnnualLeaveDays(body);
    // console.log('tradeAnnualDays', 'response', JSON.stringify(response));
    let item = {
      status: 'InProgress',
      money: tradeOffSetting.totalDays * tradeOffSetting.rate,
    };
    dispatch(
      actions.updatCelebrateMilestoneStatus(tradeOffSetting.allowanceId, item),
    );
    dispatch(actions.setTradeModalVisible(false));
    dispatch(actions.setTradeSuccessModalVisible(true));
  } catch (error) {
    if (error.data && error.data.message) {
      dispatch(appOperations.hideLoading());
      alert(error.data.message);
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const updatCelebrateMilestoneStatus = (id, item) => async dispatch => {
  return dispatch(actions.updatCelebrateMilestoneStatus(id, item));
};

const changeBenefitInfoTab = tab => async dispatch => {
  return dispatch(actions.changeBenefitInfoTab(tab));
};

const generateWellnessToken = () => async dispatch => {
  try {
    dispatch(appOperations.showLoading());

    const response = await api.generateWellnessToken();
    if (response) {
      dispatch(actions.generateWellnessTokenSuccess(response));
    }
  } catch (error) {
    dispatch(actions.generateWellnessTokenFailed(error));
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

export default {
  changeBenefitInfoTab,
  getFlexibleBenefits,
  loadMoreFlexibleBenefits,
  getSingleFlexibleBenefit,
  setFlexibleBenefitsCategories,
  initFlexibleBenefitTotalPage,
  getFlexibleBenefitsBudget,
  getFlexibleBenefitsInfo,
  initFlexibleBenefits,
  clearFlexibleBenefits,
  changeStateWishlistSingleFlexibleBenefit,
  refreshFlexibleBenefit,
  getWishlist,
  initWishlist,
  loadMoreWishlist,
  updateOptionsSingleFlexibleBenefit,
  updateQuantitySingleFlexibleBenefit,
  updateFullNameSingleFlexibleBenefit,
  updatePhoneNumberSingleFlexibleBenefit,
  updatePersionalEmailSingleFlexibleBenefit,
  changeShowHideConfirmClaimModal,
  changeShowHideSuccessClaimModal,
  claimSingleFlexibleBenefit,
  onRefresh,
  changeShowHideErrorClaimModal,
  isRegisterNonVoucher,
  setFlexibleBenefitsCategory,
  getFlexibleCategories,
  setTradeModalVisible,
  setTradeSuccessModalVisible,
  getTradeOffSetting,
  setTradeOffSetting,
  tradeAnnualDays,
  updatCelebrateMilestoneStatus,
  sortRewards,
  getSortRewards,
  searchRewards,
  clearSearchRewards,
  getFlexibleBenefitWalletHistories,
  loadMoreFlexibleBenefitsWalletHistories,
  refreshFlexibleBenefitWalletHistories,

  generateWellnessToken,
};
