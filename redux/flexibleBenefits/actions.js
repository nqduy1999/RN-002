import {
  SET_FLEXIBLE_BENEFITS,
  CLEAR_FLEXIBLE_BENEFITS,
  CLEAR_SINGLE_FLEXIBLE_BENEFIT,
  SET_SINGLE_FLEXIBLE_BENEFIT,
  SET_FLEXIBLE_BENEFITS_CATEGORIES,
  SET_CLAIM_FLEXIBLE_BENEFITS_EXPIRED_AT,
  SET_FLEXIBLE_BENEFITS_INFO,
  SET_FLEXIBLE_BENEFITS_BUDGET,
  SET_TOP_FLEXIBLE_BENEFITS,
  CLEAR_TOP_FLEXIBLE_BENEFITS,
  CHANGE_STATE_WISHLIST_SINGLE_FLEXIBLE_BENEFIT,
  SET_WISHLIST,
  CLEAR_WISHLIST,
  UPDATE_OPTIONS_SINGLE_FLEXIBLE_BENEFIT,
  UPDATE_QUANTITY_SINGLE_FLEXIBLE_BENEFIT,
  SHOW_HIDE_CONFIRM_CLAIM_FLEXIBLE_BENEFIT,
  SHOW_HIDE_SUCCESS_CLAIM_FLEXIBLE_BENEFIT,
  SHOW_HIDE_ERROR_CLAIM_FLEXIBLE_BENEFIT,
  UPDATE_TOTAL_WISH_LIST,
  SET_REFRESHING,
  SET_FLEXIBLE_CATEGORIES,
  CLEAR_FLEXIBLE_CATEGORIES,
  UPDATE_PERSONAL_EMAIL_SINGLE_FLEXIBLE_BENEFIT,
  UPDATE_PHONE_NUMBER_SINGLE_FLEXIBLE_BENEFIT,
  UPDATE_FULL_NAME_SINGLE_FLEXIBLE_BENEFIT,
  UPDATE_ERROR_MESSAGES_NON_VOUCHER,
  SET_FLEXIBLE_CATEGORY,
  SET_TRADE_MODAL_VISIBLE,
  SET_TRADE_SUCCESS_MODAL_VISIBLE,
  SET_TRADE_OFF_SETTING,
  UPDATE_CELEBRATE_MILESTONES_STUTUS,
  CHANGE_SORT_REWARDS,
  CLEAR_SEARCH_REWARDS_QUERY,
  SET_SEARCH_REWARDS_QUERY,
  UPDATE_BUDGET_AFTER_CONVERT,
  SET_FLEXIBLE_BENEFITS_INFO_BY_CATEGORY,
  CHANGE_BENEFIT_INFO_TAB,
  SET_FLEXIBLE_BENEFIT_WALLET_HISTORIES,
  CLEAR_FLEXIBLE_BENEFIT_WALLET_HISTORIES,
  GENERATE_WELLNESS_TOKEN,
  GENERATE_WELLNESS_TOKEN_SUCCESS,
  GENERATE_WELLNESS_TOKEN_FAILED,
  SET_FLEXIBLE_BENEFIT_LOADING,
} from './constants';
import {
  CHECK_IN_EVENT,
  CHECK_IN_EVENT_FAILED,
  CHECK_IN_EVENT_SUCCESS,
} from '../recognition/constants';

const updateBudgetAfterConvert = coins => ({
  type: UPDATE_BUDGET_AFTER_CONVERT,
  coins,
});

const setFlexibleBenefits = flexibleBenefits => ({
  type: SET_FLEXIBLE_BENEFITS,
  flexibleBenefits,
});

const clearFlexibleBenefits = () => ({
  type: CLEAR_FLEXIBLE_BENEFITS,
});

const clearSingleFlexibleBenefit = () => ({
  type: CLEAR_SINGLE_FLEXIBLE_BENEFIT,
});

const setSingleFlexibleBenefit = singleFlexibleBenefit => ({
  type: SET_SINGLE_FLEXIBLE_BENEFIT,
  singleFlexibleBenefit,
});

const setFlexibleBenefitsCategories = flexibleBenefitsCategories => ({
  type: SET_FLEXIBLE_BENEFITS_CATEGORIES,
  flexibleBenefitsCategories,
});

const setClaimFlexibleBenefitsExpiredAt = claimFlexibleBenefitExpiredAt => ({
  type: SET_CLAIM_FLEXIBLE_BENEFITS_EXPIRED_AT,
  claimFlexibleBenefitExpiredAt,
});

const setFlexibleBenefitsInfo = flexibleBenefitsInfo => ({
  type: SET_FLEXIBLE_BENEFITS_INFO,
  flexibleBenefitsInfo,
});

const setFlexibleBenefitsBudget = flexibleBenefitsBudget => ({
  type: SET_FLEXIBLE_BENEFITS_BUDGET,
  flexibleBenefitsBudget,
});

const setTopFlexibleBenefits = topFlexibleBenefits => ({
  type: SET_TOP_FLEXIBLE_BENEFITS,
  topFlexibleBenefits,
});

const clearTopFlexibleBenefits = () => ({
  type: CLEAR_TOP_FLEXIBLE_BENEFITS,
});

const changeStateWishlistSingleFlexibleBenefit = () => ({
  type: CHANGE_STATE_WISHLIST_SINGLE_FLEXIBLE_BENEFIT,
});

const setWishlist = wishlist => ({
  type: SET_WISHLIST,
  wishlist,
});

const clearWishlist = () => ({
  type: CLEAR_WISHLIST,
});

const updateOptionsSingleFlexibleBenefit = (optionId, variantId) => ({
  type: UPDATE_OPTIONS_SINGLE_FLEXIBLE_BENEFIT,
  optionId,
  variantId,
});

const updateQuantitySingleFlexibleBenefit = quantity => ({
  type: UPDATE_QUANTITY_SINGLE_FLEXIBLE_BENEFIT,
  quantity,
});

const showHideConfirmClaimFlexibleBenefit = isShowConfirmClaimModal => ({
  type: SHOW_HIDE_CONFIRM_CLAIM_FLEXIBLE_BENEFIT,
  isShowConfirmClaimModal,
});

const showHideSuccessClaimFlexibleBenefit = isShowSuccessClaimModal => ({
  type: SHOW_HIDE_SUCCESS_CLAIM_FLEXIBLE_BENEFIT,
  isShowSuccessClaimModal,
});

const showHideErrorClaimFlexibleBenefit = errorModal => ({
  type: SHOW_HIDE_ERROR_CLAIM_FLEXIBLE_BENEFIT,
  errorModal,
});

const updateTotalWishList = total => ({
  type: UPDATE_TOTAL_WISH_LIST,
  total,
});

const setRefreshing = refreshing => ({
  type: SET_REFRESHING,
  refreshing,
});

const setFlexibleCategories = flexibleCategories => ({
  type: SET_FLEXIBLE_CATEGORIES,
  flexibleCategories,
});

const setFlexibleCategory = flexibleCategory => ({
  type: SET_FLEXIBLE_CATEGORY,
  flexibleCategory,
});

const clearFlexibleCategories = () => ({
  type: CLEAR_FLEXIBLE_CATEGORIES,
});

const updatePersonalEmailSingleFlexibleBenefit = personalEmail => ({
  type: UPDATE_PERSONAL_EMAIL_SINGLE_FLEXIBLE_BENEFIT,
  personalEmail,
});

const updatePhoneNumberSingleFlexibleBenefit = phoneNumber => ({
  type: UPDATE_PHONE_NUMBER_SINGLE_FLEXIBLE_BENEFIT,
  phoneNumber,
});

const updateFullNameSingleFlexibleBenefit = fullName => ({
  type: UPDATE_FULL_NAME_SINGLE_FLEXIBLE_BENEFIT,
  fullName,
});

const updateErrorMessagesNonVoucher = errorMessagesNonVoucher => ({
  type: UPDATE_ERROR_MESSAGES_NON_VOUCHER,
  errorMessagesNonVoucher,
});

const setTradeModalVisible = visible => ({
  type: SET_TRADE_MODAL_VISIBLE,
  visible,
});

const setTradeSuccessModalVisible = visible => ({
  type: SET_TRADE_SUCCESS_MODAL_VISIBLE,
  visible,
});

const setTradeOffSetting = setting => ({
  type: SET_TRADE_OFF_SETTING,
  setting,
});

const updatCelebrateMilestoneStatus = (id, item) => ({
  type: UPDATE_CELEBRATE_MILESTONES_STUTUS,
  id,
  item,
});

const setSearchRewardsQuery = query => ({
  type: SET_SEARCH_REWARDS_QUERY,
  query,
});

const clearSearchRewardsQuery = () => ({
  type: CLEAR_SEARCH_REWARDS_QUERY,
});

const changeSortRewards = sortOption => ({
  type: CHANGE_SORT_REWARDS,
  sortOption,
});

const setFlexibleBenefitsInfoByCategory = categories => ({
  type: SET_FLEXIBLE_BENEFITS_INFO_BY_CATEGORY,
  categories,
});

const changeBenefitInfoTab = tab => ({
  type: CHANGE_BENEFIT_INFO_TAB,
  tab,
});

const setFlexibleBenefitWalletHistories = walletHistories => ({
  type: SET_FLEXIBLE_BENEFIT_WALLET_HISTORIES,
  walletHistories,
});

const clearFlexibleBenefitWalletHistories = () => ({
  type: CLEAR_FLEXIBLE_BENEFIT_WALLET_HISTORIES,
});

const generateWellnessToken = params => ({
  type: GENERATE_WELLNESS_TOKEN,
  params,
});

const generateWellnessTokenSuccess = payload => ({
  type: GENERATE_WELLNESS_TOKEN_SUCCESS,
  payload,
});

const generateWellnessTokenFailed = error => ({
  type: GENERATE_WELLNESS_TOKEN_FAILED,
  error,
});

const setLoading = payload => ({
  type: SET_FLEXIBLE_BENEFIT_LOADING,
  payload,
});

export default {
  clearFlexibleBenefitWalletHistories,
  setFlexibleBenefitWalletHistories,
  changeBenefitInfoTab,
  setFlexibleBenefits,
  clearSingleFlexibleBenefit,
  clearFlexibleBenefits,
  setSingleFlexibleBenefit,
  setFlexibleBenefitsCategories,
  setClaimFlexibleBenefitsExpiredAt,
  setFlexibleBenefitsInfo,
  setFlexibleBenefitsBudget,
  setTopFlexibleBenefits,
  clearTopFlexibleBenefits,
  changeStateWishlistSingleFlexibleBenefit,
  setWishlist,
  clearWishlist,
  updateOptionsSingleFlexibleBenefit,
  updateQuantitySingleFlexibleBenefit,
  showHideConfirmClaimFlexibleBenefit,
  showHideSuccessClaimFlexibleBenefit,
  updateTotalWishList,
  setRefreshing,
  setFlexibleCategories,
  clearFlexibleCategories,
  showHideErrorClaimFlexibleBenefit,
  updatePersonalEmailSingleFlexibleBenefit,
  updatePhoneNumberSingleFlexibleBenefit,
  updateFullNameSingleFlexibleBenefit,
  updateErrorMessagesNonVoucher,
  setFlexibleCategory,
  setTradeModalVisible,
  setTradeSuccessModalVisible,
  setTradeOffSetting,
  updatCelebrateMilestoneStatus,
  changeSortRewards,
  clearSearchRewardsQuery,
  setSearchRewardsQuery,
  updateBudgetAfterConvert,
  setFlexibleBenefitsInfoByCategory,
  generateWellnessToken,
  generateWellnessTokenFailed,
  generateWellnessTokenSuccess,
  setLoading,
};
