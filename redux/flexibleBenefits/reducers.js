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
  UPDATE_TOTAL_WISH_LIST,
  SET_REFRESHING,
  SET_FLEXIBLE_CATEGORIES,
  CLEAR_FLEXIBLE_CATEGORIES,
  SHOW_HIDE_ERROR_CLAIM_FLEXIBLE_BENEFIT,
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
  GENERATE_WELLNESS_TOKEN_FAILED,
  GENERATE_WELLNESS_TOKEN_SUCCESS,
  SET_FLEXIBLE_BENEFIT_LOADING,
} from './constants';
import actions from '../app/actions';
import {LABEL_MY_BENEFITS} from '@resources/string/strings';
import BuildVersion from '@resources/build_version/BuildVersion';
const setting = BuildVersion.setting;

const defaultState = {
  loading: false,
  flexibleBenefitsCategories: [],
  singleFlexibleBenefit: undefined,
  flexibleBenefits: {
    data: [],
    page: 1,
    pageSize: 16,
    hasNext: true,
    query: '',
    sortBy: setting.rewardSortBy,
    sortOrder: 'Asc',
  },
  flexibleBenefitWalletHistories: {
    data: [],
    page: 1,
    pageSize: 16,
    hasNext: true,
    query: '',
    sortNames: 'CreatedAt',
    sortDirections: 'OrderByDescending',
  },
  topFlexibleBenefits: {
    data: [],
    page: 1,
    pageSize: 16,
    hasNext: true,
  },
  claimFlexibleBenefitExpiredAt: null,
  flexibleBenefitsInfo: {
    totalCost: 0,
    celebrateMilestones: [],
    coreBenefits: [],
  },
  flexibleBenefitsBudget: {
    expiredDate: undefined,
    totalBudget: 0,
    totalSpending: 0,
  },
  wishlist: {
    data: [],
    page: 1,
    pageSize: 16,
    total: 0,
    hasNext: true,
  },
  claimSingleFlexibleBenefitForm: {
    quantity: 1,
    benefitId: 0,
    options: [],
    fullName: '',
    phoneNumber: '',
    personalEmail: '',
  },
  isShowConfirmClaimModal: false,
  isShowSuccessClaimModal: false,
  errorModal: {
    isShowErrorClaimModal: false,
    messageError: '',
  },
  errorMessagesNonVoucher: {
    phoneNumber: '',
    fullName: '',
  },
  refreshing: true,
  flexibleCategories: [],
  flexibleCategory: 0,
  tradeModalVisible: false,
  tradeSuccessModalVisible: false,
  tradeOffSetting: {
    rate: 0,
    maxDays: 0,
    totalDays: 0,
  },
  flexibleBenefitsInfoCategories: {
    totalCost: 0,
    categories: [],
  },
  activeBenefitInfoTab: LABEL_MY_BENEFITS,
  wellnessUrl: undefined,
};

const reduce = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FLEXIBLE_BENEFIT_WALLET_HISTORIES:
      return {
        ...state,
        flexibleBenefitWalletHistories: {
          ...state.flexibleBenefitWalletHistories,
          ...action.walletHistories,
          data: [
            ...state.flexibleBenefitWalletHistories.data,
            ...action.walletHistories.data,
          ],
        },
      };
    case CLEAR_FLEXIBLE_BENEFIT_WALLET_HISTORIES:
      return {
        ...state,
        flexibleBenefitWalletHistories: {
          ...defaultState.flexibleBenefitWalletHistories,
        },
      };
    case CHANGE_BENEFIT_INFO_TAB:
      return {...state, activeBenefitInfoTab: action.tab};
    case SET_FLEXIBLE_BENEFITS_INFO_BY_CATEGORY:
      return {...state, flexibleBenefitsInfoCategories: action.categories};
    case UPDATE_BUDGET_AFTER_CONVERT:
      return {
        ...state,
        flexibleBenefitsBudget: {
          ...state.flexibleBenefitsBudget,
          totalBudget:
            state.flexibleBenefitsBudget.totalBudget + action.coins * 1000,
        },
      };
    case SET_FLEXIBLE_BENEFITS_INFO:
      return {
        ...state,
        flexibleBenefitsInfo: action.flexibleBenefitsInfo,
      };
    case SET_FLEXIBLE_BENEFITS:
      if (action.flexibleBenefits.page) {
        if (action.flexibleBenefits.page <= state.flexibleBenefits.page) {
          return state;
        }
      }
      return {
        ...state,
        flexibleBenefits: {
          ...state.flexibleBenefits,
          ...action.flexibleBenefits,
          data: [
            ...state.flexibleBenefits.data,
            ...action.flexibleBenefits.data,
          ],
        },
      };
    case CLEAR_FLEXIBLE_BENEFITS:
      return {
        ...state,
        flexibleBenefits: {
          ...defaultState.flexibleBenefits,
          query: state.flexibleBenefits.query,
          sortBy: state.flexibleBenefits.sortBy,
          sortOrder: state.flexibleBenefits.sortOrder,
        },
      };
    case SET_TOP_FLEXIBLE_BENEFITS:
      if (action.topFlexibleBenefits.page) {
        if (action.topFlexibleBenefits.page <= state.topFlexibleBenefits.page) {
          return state;
        }
      }
      return {
        ...state,
        topFlexibleBenefits: {
          ...state.topFlexibleBenefits,
          ...action.topFlexibleBenefits,
          data: [
            ...state.topFlexibleBenefits.data,
            ...action.topFlexibleBenefits.data,
          ],
        },
      };
    case CLEAR_TOP_FLEXIBLE_BENEFITS:
      return {
        ...state,
        topFlexibleBenefits: defaultState.topFlexibleBenefits,
      };
    case CLEAR_SINGLE_FLEXIBLE_BENEFIT:
      return {
        ...state,
        singleFlexibleBenefit: defaultState.singleFlexibleBenefit,
        claimSingleFlexibleBenefitForm:
          defaultState.claimSingleFlexibleBenefitForm,
      };
    case SET_SINGLE_FLEXIBLE_BENEFIT:
      return {
        ...state,
        singleFlexibleBenefit: action.singleFlexibleBenefit,
        claimSingleFlexibleBenefitForm: {
          ...state.claimSingleFlexibleBenefitForm,
          benefitId: action.singleFlexibleBenefit.id,
        },
      };
    case SET_FLEXIBLE_BENEFITS_CATEGORIES:
      return {
        ...state,
        flexibleBenefitsCategories: action.flexibleBenefitsCategories,
      };
    case SET_CLAIM_FLEXIBLE_BENEFITS_EXPIRED_AT:
      return {
        ...state,
        claimFlexibleBenefitExpiredAt: action.claimFlexibleBenefitExpiredAt,
      };
    case SET_FLEXIBLE_BENEFITS_BUDGET:
      return {
        ...state,
        flexibleBenefitsBudget: action.flexibleBenefitsBudget,
      };
    case CHANGE_STATE_WISHLIST_SINGLE_FLEXIBLE_BENEFIT:
      return {
        ...state,
        singleFlexibleBenefit: {
          ...state.singleFlexibleBenefit,
          isWishlistReward: !state.singleFlexibleBenefit.isWishlistReward,
        },
      };
    case SET_WISHLIST:
      if (action.wishlist.page) {
        if (action.wishlist.page <= state.wishlist.page) {
          return state;
        }
      }
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          ...action.wishlist,
          data: [...state.wishlist.data, ...action.wishlist.data],
        },
      };
    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlist: defaultState.wishlist,
      };
    case UPDATE_OPTIONS_SINGLE_FLEXIBLE_BENEFIT:
      const option = state.claimSingleFlexibleBenefitForm.options.find(
        item => item.optionId === action.optionId,
      );
      return {
        ...state,
        claimSingleFlexibleBenefitForm: {
          ...state.claimSingleFlexibleBenefitForm,
          options: option
            ? option.variantId !== action.variantId
              ? state.claimSingleFlexibleBenefitForm.options.map(item => {
                  if (item.optionId === option.optionId) {
                    return {...item, variantId: action.variantId};
                  } else {
                    return item;
                  }
                })
              : state.claimSingleFlexibleBenefitForm.options.filter(
                  item => item.optionId !== action.optionId,
                )
            : [
                ...state.claimSingleFlexibleBenefitForm.options,
                {optionId: action.optionId, variantId: action.variantId},
              ],
        },
      };
    case UPDATE_QUANTITY_SINGLE_FLEXIBLE_BENEFIT:
      return {
        ...state,
        claimSingleFlexibleBenefitForm: {
          ...state.claimSingleFlexibleBenefitForm,
          quantity: action.quantity,
        },
      };
    case UPDATE_PHONE_NUMBER_SINGLE_FLEXIBLE_BENEFIT:
      return {
        ...state,
        claimSingleFlexibleBenefitForm: {
          ...state.claimSingleFlexibleBenefitForm,
          phoneNumber: action.phoneNumber,
        },
      };
    case UPDATE_FULL_NAME_SINGLE_FLEXIBLE_BENEFIT:
      return {
        ...state,
        claimSingleFlexibleBenefitForm: {
          ...state.claimSingleFlexibleBenefitForm,
          fullName: action.fullName,
        },
      };
    case UPDATE_PERSONAL_EMAIL_SINGLE_FLEXIBLE_BENEFIT:
      return {
        ...state,
        claimSingleFlexibleBenefitForm: {
          ...state.claimSingleFlexibleBenefitForm,
          personalEmail: action.personalEmail,
        },
      };
    case SHOW_HIDE_CONFIRM_CLAIM_FLEXIBLE_BENEFIT:
      return {
        ...state,
        isShowConfirmClaimModal: action.isShowConfirmClaimModal,
      };
    case SHOW_HIDE_SUCCESS_CLAIM_FLEXIBLE_BENEFIT:
      return {
        ...state,
        isShowSuccessClaimModal: action.isShowSuccessClaimModal,
      };
    case UPDATE_TOTAL_WISH_LIST:
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          total: action.total,
        },
      };
    case SET_REFRESHING:
      return {
        ...state,
        refreshing: action.refreshing,
      };
    case SET_FLEXIBLE_CATEGORIES:
      return {
        ...state,
        flexibleCategories: action.flexibleCategories,
      };
    case SET_FLEXIBLE_CATEGORY:
      return {
        ...state,
        flexibleCategory: action.flexibleCategory,
      };
    case CLEAR_FLEXIBLE_CATEGORIES:
      return {
        ...state,
        flexibleCategories: [],
      };
    case SHOW_HIDE_ERROR_CLAIM_FLEXIBLE_BENEFIT:
      return {
        ...state,
        errorModal: action.errorModal,
      };
    case UPDATE_ERROR_MESSAGES_NON_VOUCHER:
      return {
        ...state,
        errorMessagesNonVoucher: action.errorMessagesNonVoucher,
      };
    case SET_TRADE_MODAL_VISIBLE:
      return {
        ...state,
        tradeModalVisible: action.visible,
        tradeOffSetting: action.visible
          ? state.tradeOffSetting
          : {
              ...state.tradeOffSetting,
              totalDays: 0,
            },
      };
    case SET_TRADE_SUCCESS_MODAL_VISIBLE:
      return {
        ...state,
        tradeSuccessModalVisible: action.visible,
      };
    case SET_TRADE_OFF_SETTING:
      return {
        ...state,
        tradeOffSetting: {
          ...state.tradeOffSetting,
          ...action.setting,
        },
      };
    case UPDATE_CELEBRATE_MILESTONES_STUTUS:
      return {
        ...state,
        flexibleBenefitsInfo: {
          ...state.flexibleBenefitsInfo,
          celebrateMilestones: state.flexibleBenefitsInfo.celebrateMilestones.map(
            item =>
              item.id === action.id
                ? {
                    ...item,
                    ...action.item,
                  }
                : item,
          ),
        },
      };
    case SET_SEARCH_REWARDS_QUERY:
      return {
        ...state,
        flexibleBenefits: {...state.flexibleBenefits, query: action.query},
      };
    case CLEAR_SEARCH_REWARDS_QUERY:
      return {
        ...state,
        flexibleBenefits: {...state.flexibleBenefits, query: ''},
      };
    case CHANGE_SORT_REWARDS:
      return {
        ...state,
        flexibleBenefits: {
          ...state.flexibleBenefits,
          sortOrder: action.sortOption.sortOrder,
          sortBy: action.sortOption.sortBy,
        },
      };
    case GENERATE_WELLNESS_TOKEN:
      return {
        ...state,
        wellnessUrl: undefined,
      };
    case GENERATE_WELLNESS_TOKEN_SUCCESS:
      return {
        ...state,
        wellnessUrl: action.payload,
      };
    case GENERATE_WELLNESS_TOKEN_FAILED:
      return {
        ...state,
      };
    case SET_FLEXIBLE_BENEFIT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default reduce;
