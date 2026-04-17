import {
  UPDATE_SEND_RECOGNITION_FORM,
  CHANGE_SEARCH_USER_QUERY,
  CLEAR_SEARCH_USER_DATA,
  SET_SEARCH_USER_LIST,
  CLEAR_SEND_RECOGNITION_FORM,
  CHANGE_SHOW_HIDE_CONFIRM_SEND_MODAL,
  CHANGE_SHOW_HIDE_SUCCESS_SEND_MODAL,
  SET_WALLET_OVERVIEW,
  SET_BRANCHES,
  SELECT_BRANCH_TEMP,
  APPLY_SELECTED_BRANCHES,
  CLEAR_SELECTED_BRANCHES_TEMP,
  INIT_SELECTED_BRANCHES_TEMP,
  SET_VIEW_POINT_HISTORY,
  SET_HISTORY_RECOGNITION,
  CLEAR_RECOGNITION,
  SET_SINGLE_HISTORY_RECOGNITION,
  APPLY_FILTER_HISTORY,
  CLEAR_FILTER_HISTORY_TEMP,
  INIT_FILTER_HISTORY_TEMP,
  SELECT_MONTH_FILTER_HISTORY_TEMP,
  SELECT_ORDER_FILTER_HISTORY_TEMP,
  SELECT_ALL_MONTH_FILTER_HISTORY_TEMP,
  SET_MONTHS,
  LOAD_MORE_SEARCH_USER,
  CLEAR_HISTORY_RECOGNITION,
  CLEAR_SELECTED_BRANCHES,
  SET_ENABLE_SCROLL_CHILD_TAB_VIEW,
  SET_LIST_RATING_CRITERIA_GROUPS,
  SET_REWARDS,
  SET_SINGLE_REWARD,
  CLEAR_REWARDS,
  CLEAR_SINGLE_REWARD,
  SET_REWARD_CATEGORY,
  SET_TOP_RECENT_SENDER,
  SET_CLAIM_REWARD_EXPIRED_AT,
  SET_REWARD_CATEGORIES,
  CLEAR_REWARD_CATEGORIES,
  SET_SEARCH_REWARDS_QUERY,
  CLEAR_SEARCH_REWARDS_QUERY,
  CHANGE_SORT_REWARDS,
  SET_RECOGNITION_REPLY_TEMPLATE,
  SET_RECOGNITION_REPLIES,
  CREATE_RECOGNITION_REPLY,
  CLEAR_RECOGNITION_REPLY,
  TOGGLE_IS_NEED_TO_SCROLL,
  UPDATE_COINS_AFTER_CONVERT_TO_BUDGET,
  SET_RECOGNITION_SCHEMES,
  SET_RECOGNITION_PROGRAM,
  UPDATE_RECOGNITION_EMPLOYEE,
  REMOVE_RECOGNIZE_EMPLOYEE,
  APPLY_MESSAGE_FOR_ALL_PARTICIPANTS,
  CLEAR_CREATE_RECOGNITION_BY_PROGRAM_REQ_MODEL,
  UPDATE_SINGLE_HISTORY_RECOGNITION,
  SET_RECOGNITION_COMMENTS,
  ADD_NEW_RECOGNITION_COMMENT,
  REMOVE_SELECTED_EMPLOYEE,
  ADD_ALL_SELECTED_EMPLOYEE,
  ADD_SELECTED_EMPLOYEE,
  REMOVE_ALL_SELECTED_EMPLOYEE,
  MAP_RECOGNIZED_TO_SELECTED_EMPLOYEES,
  SET_ALL_RECOGNITION_SCHEMES,
  SET_RECOGNITION_PROGRAM_FILTER,
  RESET_RECOGNITION_PROGRAM_FILTER,
  SET_MANAGER_POINT_CAP,
  CHECK_IN_EVENT,
  CHECK_IN_EVENT_SUCCESS,
  CHECK_IN_EVENT_FAILED,
  GET_LIST_SELF_RECOGNITION_SUCCESS,
  GET_LIST_SELF_RECOGNITION_FAILED,
  SET_LEVEL_ID_SELF_RECOGNITION,
  SET_ATTACHMENT,
  REMOVE_ITEM_ATTACHMENT,
  REMOVE_ALL_ITEM_ATTACHMENT,
  SET_ACTIVE_SELF_RECOGNITION,
  CLEAR_ACTIVE_SELF_RECOGNITION,
  SET_LEVEL_POINT,
  CLEAR_NOTE,
  SET_RECOGNITION_LOADING,
  SET_USER_MANAGERS,
  CLEAR_USER_MANAGERS,
  UPDATE_RECOGNISE_EMPLOYEE,
  UPDATE_POINT_FOR_GROUP_RECOGNITION,
  SET_DEPARTMENTS,
  UPDATE_DEPARTMENTS,
  CHANGE_SEARCH_USER_DEPARTMENT_ID,
  UPDATE_SELECTED_EMPLOYEE,
  SET_REWARD_LOCATIONS,
  UPDATE_REWARD_LOCATIONS,
  CLEAR_REWARD_LOCATIONS,
  APPLY_FILTER_REWARD_LOCATIONS,
  SET_RECOGNITION_HISTORY_FILTER,
  CHANGE_SHOW_HIDE_CONFIRM_RECALL_MODAL,
  CHANGE_SHOW_HIDE_SUCCESS_RECALL_MODAL,
  RECALL_RECOGNITION_SUCCESS,
} from './constants';

const updateCoinsAfterConvertingToBudget = coins => ({
  type: UPDATE_COINS_AFTER_CONVERT_TO_BUDGET,
  coins,
});

const toggleIsNeedToScroll = () => ({
  type: TOGGLE_IS_NEED_TO_SCROLL,
});

const clearRecognitionReplies = () => ({
  type: CLEAR_RECOGNITION_REPLY,
});

const setRecognitionReplyTemplate = template => ({
  type: SET_RECOGNITION_REPLY_TEMPLATE,
  template,
});

const setRecognitionReplies = replies => ({
  type: SET_RECOGNITION_REPLIES,
  replies,
});

const createRecognitionReply = reply => ({
  type: CREATE_RECOGNITION_REPLY,
  reply,
});

const changeSearchUserQuery = searchUserQuery => ({
  type: CHANGE_SEARCH_USER_QUERY,
  searchUserQuery,
});

const changeSearchUserDepartmentId = searchUserDepartmentId => ({
  type: CHANGE_SEARCH_USER_DEPARTMENT_ID,
  searchUserDepartmentId,
});

const applySelectedBranches = () => ({
  type: APPLY_SELECTED_BRANCHES,
});

const setBranches = branches => ({
  type: SET_BRANCHES,
  branches,
});

const clearSelectedBranchesTemp = () => ({
  type: CLEAR_SELECTED_BRANCHES_TEMP,
});

const selectBranchTemp = id => ({
  type: SELECT_BRANCH_TEMP,
  id,
});

const initSelectedBranchesTemp = () => ({
  type: INIT_SELECTED_BRANCHES_TEMP,
});

const clearSendRecognitionForm = () => ({
  type: CLEAR_SEND_RECOGNITION_FORM,
});

const clearSearchUserData = () => ({
  type: CLEAR_SEARCH_USER_DATA,
});

const clearSelectedBranches = () => ({
  type: CLEAR_SELECTED_BRANCHES,
});

const updateSendRecognitionForm = form => ({
  type: UPDATE_SEND_RECOGNITION_FORM,
  form,
});

const setListRatingCriteriaGroups = ratingCriteriaGroups => ({
  type: SET_LIST_RATING_CRITERIA_GROUPS,
  ratingCriteriaGroups,
});

const setSearchUserList = searchUserList => ({
  type: SET_SEARCH_USER_LIST,
  searchUserList,
});

const loadMoreSearchUser = () => ({
  type: LOAD_MORE_SEARCH_USER,
});

const changeShowHideConfirmSendModal = isShowConfirmSendModal => ({
  type: CHANGE_SHOW_HIDE_CONFIRM_SEND_MODAL,
  isShowConfirmSendModal,
});

const changeShowHideSuccessSendModal = isShowSuccessSendModal => ({
  type: CHANGE_SHOW_HIDE_SUCCESS_SEND_MODAL,
  isShowSuccessSendModal,
});

const changeShowHideConfirmRecallModal = isShowConfirmRecallModal => ({
  type: CHANGE_SHOW_HIDE_CONFIRM_RECALL_MODAL,
  isShowConfirmRecallModal,
});

const changeShowHideSuccessRecallModal = payload => ({
  type: CHANGE_SHOW_HIDE_SUCCESS_RECALL_MODAL,
  payload,
});

const setWalletOverview = walletOverview => ({
  type: SET_WALLET_OVERVIEW,
  walletOverview,
});

const setViewPointHistory = isSelectViewRecognitionPoint => ({
  type: SET_VIEW_POINT_HISTORY,
  isSelectViewRecognitionPoint,
});

const setHistoryRecognition = historyRecognition => ({
  type: SET_HISTORY_RECOGNITION,
  historyRecognition,
});

const clearHistoryRecognition = () => ({
  type: CLEAR_HISTORY_RECOGNITION,
});

const clearRecognition = () => ({
  type: CLEAR_RECOGNITION,
});

const setSingleHistoryRecognition = singleHistoryRecognition => ({
  type: SET_SINGLE_HISTORY_RECOGNITION,
  singleHistoryRecognition,
});

const setMonths = months => ({
  type: SET_MONTHS,
  months,
});
const selectAllMonthFilterHistoryTemp = () => ({
  type: SELECT_ALL_MONTH_FILTER_HISTORY_TEMP,
});

const selectMonthFilterHistoryTemp = id => ({
  type: SELECT_MONTH_FILTER_HISTORY_TEMP,
  id,
});

const selectOrderFilterHistoryTemp = accessing => ({
  type: SELECT_ORDER_FILTER_HISTORY_TEMP,
  accessing,
});

const applyFilterHistory = () => ({
  type: APPLY_FILTER_HISTORY,
});

const initFilterHistoryTemp = () => ({
  type: INIT_FILTER_HISTORY_TEMP,
});

const clearFilterHistoryTemp = () => ({
  type: CLEAR_FILTER_HISTORY_TEMP,
});

const setEnableScrollChildTabView = scrollChildTabViewEnabled => ({
  type: SET_ENABLE_SCROLL_CHILD_TAB_VIEW,
  scrollChildTabViewEnabled,
});

const setRewards = rewards => ({
  type: SET_REWARDS,
  rewards,
});

const setSingleReward = singleReward => ({
  type: SET_SINGLE_REWARD,
  singleReward,
});

const clearRewards = () => ({
  type: CLEAR_REWARDS,
});

const clearSingleReward = () => ({
  type: CLEAR_SINGLE_REWARD,
});

const setRewardCategory = rewardCategory => ({
  type: SET_REWARD_CATEGORY,
  rewardCategory,
});

const setTopRecentSenders = recentSenders => ({
  type: SET_TOP_RECENT_SENDER,
  recentSenders,
});

const setClaimRewardsExpiredAt = claimRewardExpiredAt => ({
  type: SET_CLAIM_REWARD_EXPIRED_AT,
  claimRewardExpiredAt,
});

const setRewardCategories = rewardCategories => ({
  type: SET_REWARD_CATEGORIES,
  rewardCategories,
});

const clearRewardCategories = () => ({
  type: CLEAR_REWARD_CATEGORIES,
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

const setRecognitionSchemes = schemes => ({
  type: SET_RECOGNITION_SCHEMES,
  schemes,
});

const setRecognitionProgram = programId => ({
  type: SET_RECOGNITION_PROGRAM,
  programId,
});

const removeRecognitionEmployee = id => ({
  type: REMOVE_RECOGNIZE_EMPLOYEE,
  id,
});

const updateRecognitionEmployee = employee => ({
  type: UPDATE_RECOGNITION_EMPLOYEE,
  employee,
});

const applyMessageForAllParticipants = message => ({
  type: APPLY_MESSAGE_FOR_ALL_PARTICIPANTS,
  message,
});

const clearRecognitionByProgramReqModel = () => ({
  type: CLEAR_CREATE_RECOGNITION_BY_PROGRAM_REQ_MODEL,
});

const updateSingleHistoryRecognition = recognition => ({
  type: UPDATE_SINGLE_HISTORY_RECOGNITION,
  recognition,
});

const setRecognitionComments = comments => ({
  type: SET_RECOGNITION_COMMENTS,
  comments,
});

const addNewRecognitionComment = comment => ({
  type: ADD_NEW_RECOGNITION_COMMENT,
  comment,
});

const addSelectedEmployee = employee => ({
  type: ADD_SELECTED_EMPLOYEE,
  employee,
});

const removeSelectedEmployee = id => ({
  type: REMOVE_SELECTED_EMPLOYEE,
  id,
});

const addAllSelectedEmployees = () => ({
  type: ADD_ALL_SELECTED_EMPLOYEE,
});

const removeAllSelectedEmployees = () => ({
  type: REMOVE_ALL_SELECTED_EMPLOYEE,
});

const mapRecognizedToSelectedEmployees = () => ({
  type: MAP_RECOGNIZED_TO_SELECTED_EMPLOYEES,
});

const setAllRecognitionSchemes = schemes => ({
  type: SET_ALL_RECOGNITION_SCHEMES,
  schemes,
});

const setRecognitionProgramFilter = filter => ({
  type: SET_RECOGNITION_PROGRAM_FILTER,
  filter,
});

const resetRecognitionProgramFilter = () => ({
  type: RESET_RECOGNITION_PROGRAM_FILTER,
});

const setManagerPointCap = managerPointCap => ({
  type: SET_MANAGER_POINT_CAP,
  managerPointCap,
});

export const checkInEvent = params => ({
  type: CHECK_IN_EVENT,
  params,
});

export const checkInEventSuccess = payload => ({
  type: CHECK_IN_EVENT_SUCCESS,
  payload,
});

export const checkInEventFailed = error => ({
  type: CHECK_IN_EVENT_FAILED,
  error,
});

export const getListSelfRecognitionSuccess = payload => ({
  type: GET_LIST_SELF_RECOGNITION_SUCCESS,
  data: payload,
});

export const getListSelfRecognitionFailed = () => ({
  type: GET_LIST_SELF_RECOGNITION_FAILED,
});

export const setLevelId = levelId => ({
  type: SET_LEVEL_ID_SELF_RECOGNITION,
  levelId,
});

const setAttachment = fileUpload => ({
  type: SET_ATTACHMENT,
  fileUpload,
});

const removeAttachment = indexFile => ({
  type: REMOVE_ITEM_ATTACHMENT,
  indexFile,
});

const removeAllAttachment = () => ({
  type: REMOVE_ALL_ITEM_ATTACHMENT,
});

const setActiveSeftRecognition = indexActive => ({
  type: SET_ACTIVE_SELF_RECOGNITION,
  indexActive,
});

const clearActiveSeftRecognition = () => ({
  type: CLEAR_ACTIVE_SELF_RECOGNITION,
});

const setDataLevePoint = payload => ({
  type: SET_LEVEL_POINT,
  payload,
});

const clearNote = () => ({
  type: CLEAR_NOTE,
});

const setLoading = payload => ({
  type: SET_RECOGNITION_LOADING,
  payload,
});

const setUserManagers = payload => ({
  type: SET_USER_MANAGERS,
  payload,
});

const clearUserManagers = () => ({
  type: CLEAR_USER_MANAGERS,
});

const updateRecogniseEmployee = payload => ({
  type: UPDATE_RECOGNISE_EMPLOYEE,
  payload,
});

const updatePointForGroupRecognition = payload => {
  return {
    type: UPDATE_POINT_FOR_GROUP_RECOGNITION,
    payload,
  };
};

const setDepartments = payload => {
  return {
    type: SET_DEPARTMENTS,
    payload,
  };
};

const updateDepartments = payload => {
  return {
    type: UPDATE_DEPARTMENTS,
    payload,
  };
};

const updateSelectedEmployee = payload => {
  return {
    type: UPDATE_SELECTED_EMPLOYEE,
    payload,
  };
};

const setRewardLocations = payload => ({
  type: SET_REWARD_LOCATIONS,
  payload,
});

const updateRewardLocations = payload => ({
  type: UPDATE_REWARD_LOCATIONS,
  payload,
});

const clearRewardLocations = payload => ({
  type: CLEAR_REWARD_LOCATIONS,
  payload,
});

const applyFilterRewardLocations = payload => ({
  type: APPLY_FILTER_REWARD_LOCATIONS,
  payload,
});

const setRecognitionHistoryFilter = payload => ({
  type: SET_RECOGNITION_HISTORY_FILTER,
  payload,
});

export default {
  setManagerPointCap,
  resetRecognitionProgramFilter,
  setRecognitionProgramFilter,
  setAllRecognitionSchemes,
  mapRecognizedToSelectedEmployees,
  removeAllSelectedEmployees,
  addSelectedEmployee,
  removeSelectedEmployee,
  addAllSelectedEmployees,
  addNewRecognitionComment,
  setRecognitionComments,
  updateSingleHistoryRecognition,
  clearRecognitionByProgramReqModel,
  applyMessageForAllParticipants,
  removeRecognitionEmployee,
  updateRecognitionEmployee,
  updateSendRecognitionForm,
  setListRatingCriteriaGroups,
  changeSearchUserQuery,
  changeSearchUserDepartmentId,
  clearSearchUserData,
  setSearchUserList,
  clearSendRecognitionForm,
  changeShowHideConfirmSendModal,
  changeShowHideSuccessSendModal,
  changeShowHideConfirmRecallModal,
  changeShowHideSuccessRecallModal,
  setWalletOverview,
  setBranches,
  selectBranchTemp,
  clearSelectedBranchesTemp,
  applySelectedBranches,
  initSelectedBranchesTemp,
  clearSelectedBranches,
  setViewPointHistory,
  setHistoryRecognition,
  clearHistoryRecognition,
  clearRecognition,
  setSingleHistoryRecognition,
  selectMonthFilterHistoryTemp,
  selectOrderFilterHistoryTemp,
  clearFilterHistoryTemp,
  applyFilterHistory,
  initFilterHistoryTemp,
  selectAllMonthFilterHistoryTemp,
  setMonths,
  loadMoreSearchUser,
  setEnableScrollChildTabView,
  setRewards,
  setSingleReward,
  clearRewards,
  clearSingleReward,
  setRewardCategory,
  setTopRecentSenders,
  setClaimRewardsExpiredAt,
  setRewardCategories,
  clearRewardCategories,
  setSearchRewardsQuery,
  clearSearchRewardsQuery,
  changeSortRewards,
  setRecognitionReplyTemplate,
  setRecognitionReplies,
  createRecognitionReply,
  clearRecognitionReplies,
  toggleIsNeedToScroll,
  updateCoinsAfterConvertingToBudget,
  setRecognitionSchemes,
  setRecognitionProgram,
  checkInEvent,
  checkInEventFailed,
  checkInEventSuccess,
  getListSelfRecognitionSuccess,
  getListSelfRecognitionFailed,
  setLevelId,
  setAttachment,
  removeAttachment,
  removeAllAttachment,
  setActiveSeftRecognition,
  clearActiveSeftRecognition,
  setDataLevePoint,
  clearNote,
  setLoading,
  setUserManagers,
  clearUserManagers,
  updateRecogniseEmployee,
  updatePointForGroupRecognition,
  setDepartments,
  updateDepartments,
  updateSelectedEmployee,
  setRewardLocations,
  updateRewardLocations,
  clearRewardLocations,
  applyFilterRewardLocations,
  setRecognitionHistoryFilter,
};
