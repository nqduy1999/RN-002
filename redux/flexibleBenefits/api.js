import api from '@services/remote/baseApi';
import apiEndpoints from '@services/remote/apiEndpoints';
import withQuery from 'with-query';
import i18n from '@resources/string/locale/LanguageServices';

//GET==========================================================

const getFlexibleBenefitWalletHistories = async page => {
  return api.get(
    `${withQuery(apiEndpoints.GET_FLEXIBLE_BENEFIT_WALLET_HISTORY, {
      SortNames: 'CreatedAt',
      SortDirections: 'OrderByDescending',
      page,
      pageSize: 15,
    })}`,
  );
};

const getFlexibleBenefits = async (params, categories) => {
  return api.get(
    `${withQuery(
      apiEndpoints.GET_REWARDS,
      params,
    )}&CategoryId=${categories.join('&CategoryId=')}`.replace(
      '{lang}',
      i18n.locale,
    ),
  );
};

const getFlexibleBenefitsInfoByCategory = async () => {
  return api.get(apiEndpoints.GET_FLEXIBLE_BENEFITS_INFO_BY_CATEGORY);
};

const getSingleFlexibleBenefit = async (id, lang) => {
  return api.get(
    apiEndpoints.GET_REWARD.replace('{0}', id).replace('{1}', lang),
  );
};

const getFlexibleBenefitsInfo = async () => {
  return api.get(apiEndpoints.GET_FLEXIBLE_BENEFITS_INFO);
};

const getFlexibleBenefitsBudget = async () => {
  return api.get(apiEndpoints.GET_FLEXIBLE_BENEFITS_BUDGET);
};

const getTopFlexibleBenefits = async params => {
  return api.get(
    withQuery(apiEndpoints.GET_TOP_FLEXIBLE_BENEFITS, params).replace(
      '{lang}',
      i18n.locale,
    ),
  );
};

const getAnnualLeaveTradeOffSetting = async params => {
  return api.get(
    withQuery(apiEndpoints.GET_ANNUAL_LEAVE_TRADE_OFF_SETTING, params),
  );
};

const getWishlist = async () => {
  return api.get(apiEndpoints.GET_WISHLIST.replace('{lang}', i18n.locale));
};

const generateWellnessToken = async () => {
  return api.post(apiEndpoints.GENERATE_WELLNESS_TOKEN);
};

//POST
const postAddToWishlist = async id => {
  return api.post(apiEndpoints.POST_ADD_TO_WISHLIST.replace('{0}', id));
};

const postClaimFlexibleBenefit = async body => {
  return api.post(apiEndpoints.POST_CLAIM_BENEFITS, body);
};

const tradeAnnualLeaveDays = async body => {
  return api.post(apiEndpoints.TRADE_ANNUAL_LEAVE_DAYS, body);
};

const getFlexibleCategories = async => {
  return api.get(apiEndpoints.GET_REWARD_CATEGORIES);
};

//DELETE
const deleteItemInWishlist = async id => {
  return api.delete(apiEndpoints.DELETE_ITEM_IN_WISHLIST.replace('{0}', id));
};
export default {
  getFlexibleBenefits,
  getSingleFlexibleBenefit,
  getFlexibleBenefitsInfo,
  getFlexibleBenefitsBudget,
  getTopFlexibleBenefits,
  getWishlist,
  postAddToWishlist,
  deleteItemInWishlist,
  postClaimFlexibleBenefit,
  getFlexibleCategories,
  getAnnualLeaveTradeOffSetting,
  tradeAnnualLeaveDays,
  getFlexibleBenefitsInfoByCategory,
  getFlexibleBenefitWalletHistories,
  generateWellnessToken,
};
