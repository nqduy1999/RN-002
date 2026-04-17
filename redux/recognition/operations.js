import actions from './actions';
import api from './api';
import appOperations from '../app/operations';
import flexibleBenefitActions from '../flexibleBenefits/actions';
import notificationOperations from '../notifications/operations';
import {
  sendRecognitionValidation,
  sendSelfRecognitionValidation,
} from './validations';
import moment from 'moment';
import _ from 'lodash';
import {
  FIELD_CRITERIA_REQUIRED,
  FIELD_RECEIVER_REQUIRED,
  UNKNOWN_ERROR,
} from '../../resources/string/strings';
import errorMsg from '@resources/string/errors';
import { renderText } from '../../common/components/StringHelper';
import authOperations from '../auth/operations';
import { isUnauthorized } from '../helpers/errorHandler';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
import {
  isAdmin as _isAdmin,
  isShowOtherSchemes,
} from '@common/function/function';
import authTokens from '@services/local/auth-tokens';
import { isCustomize, getCustomize } from '@utils/CoreUtils';

const setting = BuildVersion.setting || {};

const getWalletOverview = () => async dispatch => {
  try {
    let response = await api.getWalletOverview();
    if (response) {
      return dispatch(actions.setWalletOverview(response));
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    console.log(error);
  }
};

const updateSendRecognitionForm = (key, value) => (dispatch, getState) => {
  const changes = {};
  changes[key] = value;
  const { sendRecognition: _sendRecognition } = getState().recognition;
  if (
    key === 'criteriaId' &&
    _sendRecognition.validation &&
    _sendRecognition.validation.message === FIELD_CRITERIA_REQUIRED
  ) {
    changes.validation = {
      ..._sendRecognition.validation,
      message: '',
    };
  }
  if (
    key === 'receiverId' &&
    value !== -1 &&
    _sendRecognition.validation &&
    _sendRecognition.validation.message === FIELD_RECEIVER_REQUIRED
  ) {
    changes.validation = {
      ..._sendRecognition.validation,
      message: '',
    };
  }

  if (key === 'expandedId' && value === _sendRecognition.expandedId) {
    changes.expandedId = 0;
  }
  if (key === 'receiverId') {
    if (value != -1) {
      dispatch(getUserManagers(value));
    } else {
      dispatch(actions.clearUserManagers());
    }
  }

  if (key === 'notifyTo') {
    const { notifyTo } = _sendRecognition;
    if (!notifyTo.includes(value)) {
      changes[key] = [...notifyTo, value];
    } else {
      changes[key] = notifyTo.filter(x => x !== value);
    }
  }

  dispatch(actions.updateSendRecognitionForm(changes));

  if (key === 'groupKudosPoint' || key === 'groupKudosAllocateType') {
    const isAdmin = _isAdmin(getState().auth.user);
    dispatch(
      actions.updatePointForGroupRecognition({
        isAdmin,
        isUpdateGroupKudosPoint: key === 'groupKudosPoint',
      }),
    );
  }
};

const getListRatingCriteriaGroups = () => async dispatch => {
  try {
    let response = await api.getListRatingCriteriaGroups();
    if (response) {
      response = {
        vi: response.vi.map(item => {
          return {
            ...item,
            title: item.name,
            criteriaGroup: item.employerRatingCriterias.map(criteria => {
              return {
                ...criteria,
                title: criteria.name,
              };
            }),
          };
        }),
        en: response.en.map(item => {
          return {
            ...item,
            title: item.name,
            criteriaGroup: item.employerRatingCriterias.map(criteria => {
              return {
                ...criteria,
                title: criteria.name,
              };
            }),
          };
        }),
      };
      return dispatch(actions.setListRatingCriteriaGroups(response));
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  }
};

const getTopRecentSenders = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  const { topRecentSender } = getState().recognition;
  try {
    let response = await api.getRecentSender(topRecentSender);
    await dispatch(appOperations.hideLoading());
    if (response) {
      response = response.map(item => {
        let convertItem = {
          ...item,
          gender: item.gender === 'Unknown' ? 'Default' : item.gender,
        };
        if (item.avatar) {
          convertItem = {
            ...convertItem,
            avatar: { uri: item.avatar },
          };
        }
        return convertItem;
      });
      return dispatch(actions.setTopRecentSenders(response));
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getRewardCategories = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    let response = await api.getRewardCategories();
    await dispatch(appOperations.hideLoading());
    const { language } = getState().app;
    if (response) {
      response = response.rewardCategories.map((item, index) => {
        let convertItem = {
          ...item,
          title: language === 'en' ? item.name.en : item.name.vi,
        };
        if (index == 0) {
          dispatch(actions.setRewardCategory(item.id));
        }
        return convertItem;
      });
      dispatch(actions.setRewardCategories(response));
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getRewardLocations = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    let response = await api.getRewardLocations();
    await dispatch(appOperations.hideLoading());

    const responseArray = Object.entries(response);
    const result = responseArray.map(([key, value]) => ({
      id: key,
      name: value,
      isSelected: false,
    }));

    if (result && result.length > 0) {
      dispatch(actions.setRewardLocations(result));
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const changeSearchUserQuery = query => dispatch => {
  return dispatch(actions.changeSearchUserQuery(query));
};

const changeSearchUserDepartmentId = query => dispatch => {
  return dispatch(actions.changeSearchUserDepartmentId(query));
};

const searchUser = (isRecognitionProgram, isForNotifyUserManagers) => async (
  dispatch,
  getState,
) => {
  const {
    searchUserQuery,
    searchUserDepartmentId,
    userManagers,
    selectedBranches,
  } = getState().recognition;
  if (
    isRecognitionProgram &&
    searchUserQuery.length === 0 &&
    searchUserDepartmentId === 0 &&
    selectedBranches.length === 0
  ) {
    dispatch(clearSearchUserData());
  }
  if (
    !isRecognitionProgram &&
    searchUserQuery.length === 0 &&
    searchUserDepartmentId === 0 &&
    selectedBranches.length === 0
  ) {
    if (!IS.oneOf('pepsi', 'nestle')) {
      return dispatch(clearSearchUserData());
    }
  }
  dispatch(appOperations.showLoading());
  try {
    let response = await api.getEmployeeByFullname(
      {
        fullName: searchUserQuery,
        departmentId:
          searchUserDepartmentId !== 0 ? searchUserDepartmentId : undefined,
        branchIds: selectedBranches,
        ...(isForNotifyUserManagers && {
          excludeEmployeeId: [...userManagers.map(x => x.id)],
        }),
      },
      isRecognitionProgram,
      isForNotifyUserManagers,
    );
    await dispatch(appOperations.hideLoading());
    if (response) {
      response = response.map(item => {
        let convertItem = {
          ...item,
          gender: item.gender === 'Unknown' ? 'Default' : item.gender,
        };
        if (item.avatar) {
          convertItem = {
            ...convertItem,
            avatar: { uri: item.avatar },
          };
        }
        return convertItem;
      });
      return dispatch(actions.setSearchUserList(response));
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const searchTeamMember = (isForNotifyUserManagers = false) => async (
  dispatch,
  getState,
) => {
  const { searchUserQuery, userManagers } = getState().recognition;
  // if (searchUserQuery.length === 0) {
  //   return dispatch(clearSearchUserData());
  // }
  dispatch(appOperations.showLoading());
  try {
    let response = await api.getRecognitionProgramEmployee(searchUserQuery);

    if (isForNotifyUserManagers) {
      response = await api.getEmployeeByFullname(
        {
          fullName: searchUserQuery,
          excludeEmployeeId: [...userManagers.map(x => x.id)],
        },
        true,
        IS.oneOf('pepsi', 'nestle'),
      );
    }

    await dispatch(appOperations.hideLoading());
    if (response) {
      response = response.map(item => {
        let convertItem = {
          ...item,
          gender: item.gender === 'Unknown' ? 'Default' : item.gender,
        };
        if (item.avatar) {
          convertItem = {
            ...convertItem,
            avatar: { uri: item.avatar },
          };
        }
        return convertItem;
      });
      return dispatch(actions.setSearchUserList(response));
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const loadMoreSearchUser = () => (dispatch, getState) => {
  const { searchUserList } = getState().recognition;
  if (searchUserList.hasNext) {
    return dispatch(actions.loadMoreSearchUser());
  }
};

const clearSearchUserData = () => async dispatch => {
  dispatch(actions.changeSearchUserQuery(''));
  dispatch(actions.changeSearchUserDepartmentId(0));
  return dispatch(actions.clearSearchUserData());
};

const sendRecognition = (onSuccess, onError) => async (dispatch, getState) => {
  const {
    sendRecognition: _sendRecognition,
    selectedEmployees,
    recogniseEmployee,
  } = getState().recognition;
  const {
    receiverId,
    criteriaId = IS.NESTLE ? 0 : undefined,
    criteriaIds,
    note,
    point,
    isPublish,
    kudosSource,
    notifyTo,
    isGroupKudos,
  } = _sendRecognition;
  dispatch(appOperations.showLoading());
  const {
    auth: { user },
  } = getState();
  try {
    let response = null;
    let totalGroupKudosPoint = 0;

    if (isGroupKudos) {
      var body = recogniseEmployee.map(e => {
        totalGroupKudosPoint += +(e.point ?? 0);
        return {
          criteriaId,
          criteriaIds,
          note,
          point: e.point,
          receiverId: e.receiverId,
        };
      });
      response = await api.sendGroupKudosRecognition(body);
    } else {
      response = await api[
        kudosSource === 'coin' ? 'sendRecognitionByCoin' : 'sendRecognition'
      ]({
        receiverId,
        criteriaId,
        criteriaIds,
        note,
        point,
        isPublish,
        isProgramRecognition:
          setting.isProgramRecognition || user.isRecognitionSchemeEnabled,
        notifyTo: [
          ...notifyTo,
          ...(IS.oneOf('pepsi', 'nestle') ? selectedEmployees.map(x => x.id) : []),
        ],
      });
    }

    dispatch(appOperations.hideLoading());
    if (response) {
      let responseWalletOverview = await api.getWalletOverview();
      if (responseWalletOverview) {
        let walletOverview = {
          ...responseWalletOverview,
          recognitionPoint: {
            ...responseWalletOverview.recognitionPoint,
            lastUsed: isGroupKudos ? totalGroupKudosPoint : point,
          },
        };
        await dispatch(actions.setWalletOverview(walletOverview));
      }

      dispatch(clearSendRecognitionForm());
      dispatch(appOperations.hideLoading());
      return true;
    }
  } catch (error) {
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
    if (error.data && error.data.message) {
      const validation = {
        isValid: false,
        message: errorMsg['ERROR_CODE_' + error.data.code],
      };
      dispatch(appOperations.hideLoading());
      dispatch(actions.updateSendRecognitionForm({ validation }));
    }
    dispatch(appOperations.hideLoading());
    return false;
  }
};

const recallRecognition = () => async (dispatch, getState) => {
  const { singleHistoryRecognition } = getState().recognition;
  dispatch(appOperations.showLoading());
  try {
    const response = await api.recallRecognition(singleHistoryRecognition.id);
    dispatch(
      actions.changeShowHideSuccessRecallModal({ show: true, data: response }),
    );
    dispatch(appOperations.hideLoading());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const changeShowHideConfirmSendModal = isShowConfirmSendModal => async dispatch => {
  return dispatch(
    actions.changeShowHideConfirmSendModal(isShowConfirmSendModal),
  );
};

const changeShowHideSuccessSendModal = isShowSuccessSendModal => async dispatch => {
  return dispatch(
    actions.changeShowHideSuccessSendModal(isShowSuccessSendModal),
  );
};

const checkSendRecognitionForm = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  const {
    sendRecognition: sendRecognitionForm,
    recogniseEmployee,
  } = getState().recognition;
  const {
    receiverId,
    criteriaId,
    criteriaIds,
    note,
    point,
    isPublish,
    isGroupKudos,
  } = sendRecognitionForm;
  let validation = sendRecognitionValidation({
    receiverId,
    criteriaId,
    criteriaIds,
    note,
    point,
    isPublish,
    isGroupKudos,
    recogniseEmployee,
  });
  if (!validation.isValid) {
    dispatch(actions.updateSendRecognitionForm({ validation }));
    dispatch(appOperations.hideLoading());
    return false;
  }
  dispatch(actions.updateSendRecognitionForm({ validation: {} }));

  if (isGroupKudos) {
    // TODO: need to check all employeee can receivable
    dispatch(actions.updateSendRecognitionForm({ receivableCoins: 1000 }));

    dispatch(changeShowHideConfirmSendModal(true));
    dispatch(appOperations.hideLoading());
    return;
  }

  try {
    const body = {
      recipientId: receiverId,
      coins: point,
    };
    const response = await api.checkReceiverPoint(body);
    if (response) {
      const { receivableCoins } = response;
      dispatch(actions.updateSendRecognitionForm({ receivableCoins }));
      if (isPublish) {
        // show popup confirm
        dispatch(changeShowHideConfirmSendModal(true));
        return;
      }
      const sendRecognitionResponse = await dispatch(sendRecognition());
      if (sendRecognitionResponse) {
        dispatch(changeShowHideSuccessSendModal(true));
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      authOperations.logoutAlert();
    }
    return false;
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const clearSendRecognitionForm = () => dispatch => {
  return dispatch(actions.clearSendRecognitionForm());
};

const getBranches = () => async dispatch => {
  try {
    let response = await api.getBranches();
    if (response) {
      return dispatch(actions.setBranches(response));
    }
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  }
};

const getDepartments = () => async dispatch => {
  try {
    let response = await api.getDepartments();
    if (response) {
      dispatch(actions.setDepartments(response));
    }
  } catch (error) {
    console.log(error);
  }
};

const applySelectedBranches = () => dispatch => {
  return dispatch(actions.applySelectedBranches());
};

const selectBranchTemp = id => dispatch => {
  return dispatch(actions.selectBranchTemp(id));
};

const clearSelectedBranchesTemp = () => dispatch => {
  return dispatch(actions.clearSelectedBranchesTemp());
};

const initSelectedBranchesTemp = () => dispatch => {
  return dispatch(actions.initSelectedBranchesTemp());
};

const clearSelectedBranches = () => dispatch => {
  return dispatch(actions.clearSelectedBranches());
};

// Recognition reply function
const getRecognitionReplyTemplate = () => async dispatch => {
  let response = await api.getRecognitionReplyTemplate();
  if (response) {
    return dispatch(actions.setRecognitionReplyTemplate(response));
  }
};

const createRecognitionReply = reply => async dispatch => {
  api.createRecognitionReply(reply);
  return dispatch(
    actions.createRecognitionReply({
      createdAt: new Date(),
      messageStatus: 'Sent',
      messageType: reply.type,
      message: reply.message,
    }),
  );
};

const getRecognitionReplies = params => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    const {
      recognition: {
        recognitionReplies: { recognitionId, page, pageSize, totalPage },
      },
    } = getState();

    const reqModel = {
      recognitionId: params.recognitionId
        ? params.recognitionId
        : recognitionId,
      page: params.page ? params.page : page + 1,
      pageSize: pageSize,
      sortNames: 'Id',
      sortDirections: 'OrderByDescending',
    };

    if (reqModel.page > totalPage && reqModel.recognitionId === recognitionId) {
      return;
    }

    // Clear data before fetch new
    if (reqModel.page === 1) {
      dispatch(actions.clearRecognitionReplies());
    }

    const response = await api.getRecognitionReplies(reqModel);
    return dispatch(actions.setRecognitionReplies(response));
  } catch (error) {
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const initRecognitionPage = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch(appOperations.setGetReconiteOptStatus(true));
  dispatch(appOperations.showLoading());
  await Promise.all([
    dispatch(actions.clearRecognition()),
    dispatch(actions.clearHistoryRecognition()),
    dispatch(actions.clearRewards()),
    dispatch(actions.clearRewardCategories()),
    dispatch(actions.clearSendRecognitionForm()),
    dispatch(notificationOperations.clearNotifications()),
  ]);
  await dispatch(getWalletOverview());
  await dispatch(getRewardCategories());
  await Promise.all([
    dispatch(getRecognitionSchemes()),
    dispatch(getAllRecognitionSchemes()),
    dispatch(getRecognitionReplyTemplate()),
    dispatch(getBranches()),
    dispatch(getListRatingCriteriaGroups()),
    dispatch(initFilterHistory()),
    dispatch(
      updateSendRecognitionForm(
        'point',
        IS.PEPSI ? 10 : isCustomize() ? getCustomize('recogStepPoint') : user.maxRecognitionJumpPoint > 0 ? user.maxRecognitionJumpPoint : 5,
      ),
    ),
    dispatch(notificationOperations.getNotifications()),
    dispatch(getRewards()),
    dispatch(getManagerPointCap()),
    dispatch(getDepartments()),
    dispatch(getRewardLocations()),
  ]);
  dispatch(appOperations.hideLoading());
  dispatch(appOperations.setGetReconiteOptStatus(false));
};

const initRecognitionRewards = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  dispatch(actions.clearRewards());
  dispatch(getRewards());
};

const setViewPointHistory = (viewPointHistory, force) => async (dispatch, getState) => {
  const { isSelectViewRecognitionPoint } = getState().recognition;
  if (!force && viewPointHistory === isSelectViewRecognitionPoint) {
    return;
  }
  await dispatch(actions.clearHistoryRecognition());
  await dispatch(actions.setViewPointHistory(viewPointHistory));
  return dispatch(getHistoryRecognition());
};

const convertRecognitionToViewModel = function (recognition) {
  recognition.criteriaGroup.vi = recognition.criteriaGroup.vi || {
    employerRatingCriterias: [],
  };
  recognition.criteriaGroup.en = recognition.criteriaGroup.en || {
    employerRatingCriterias: [],
  };
  var mapCriteriaGroup = function (lang) {
    return {
      ...recognition.criteriaGroup[lang],
      title: recognition.criteriaGroup[lang].name,
      criteriaGroup: recognition.criteriaGroup[
        lang
      ].employerRatingCriterias.map(criteria => {
        return {
          ...criteria,
          title: criteria.name,
        };
      }),
    };
  };
  return {
    ...recognition,
    function: recognition.title,
    createdAtDate: moment(recognition.createdAt, 'DD/MM/YYYY-hh:mm'),
    avatar: recognition.avatar ? { uri: recognition.avatar } : undefined,
    criteriaGroup: {
      vi: mapCriteriaGroup('vi'),
      en: mapCriteriaGroup('en'),
    },
  };
};

const getHistoryRecognition = () => async (dispatch, getState) => {
  const {
    historyRecognition,
    isSelectViewRecognitionPoint,
    programFilter,
    timeFilter,
    statusFilter,
  } = getState().recognition;
  const {
    auth: { user },
  } = getState();

  try {
    dispatch(appOperations.showLoading());
    let response = await api.getHistoryRecognition(
      isSelectViewRecognitionPoint,
      historyRecognition.pageSize,
      historyRecognition.page,
      historyRecognition.accessing,
      statusFilter, // status,
      timeFilter, // month,
      programFilter, // program
      user,
      historyRecognition.filter, // RecognitionHistoryFilter
    );
    let data = response.items.map(item => {
      return convertRecognitionToViewModel(item);
    });
    dispatch(appOperations.hideLoading());
    return dispatch(
      actions.setHistoryRecognition({
        data: data,
        page: historyRecognition.page + 1,
        hasNext: historyRecognition.page < response.totalPage,
      }),
    );
  } catch (error) {
    console.log(error);
    if (isUnauthorized(error)) {
      dispatch(appOperations.hideLoading());
      authOperations.logoutAlert();
    }
  }
};

const loadMoreHistoryRecognition = currentPage => async (
  dispatch,
  getState,
) => {
  const { page, hasNext } = getState().recognition.historyRecognition;
  if (page !== currentPage && !hasNext) {
    return;
  }
  dispatch(appOperations.showLoading());
  await dispatch(getHistoryRecognition());
  dispatch(appOperations.hideLoading());
};

const setSingleHistoryRecognition = item => async (dispatch, getState) => {
  return dispatch(actions.setSingleHistoryRecognition(item));
};

const initFilterHistory = () => dispatch => {
  let current = moment().add(1, 'month');
  const months = [...Array(12)].map((item, index) => {
    return {
      id: index,
      name: current.subtract(1, 'month').format('MMM YYYY'),
      date: moment(current),
    };
  });
  return dispatch(actions.setMonths(months));
};

const applyFilterHistory = () => async (dispatch, getState) => {
  let filterAccessing = getState().recognition.historyFilterTemp.accessing;
  let currentAccessing = getState().recognition.historyRecognition.accessing;
  if (filterAccessing === currentAccessing) {
    return dispatch(actions.applyFilterHistory());
  } else {
    await dispatch(actions.clearHistoryRecognition());
    await dispatch(
      actions.setHistoryRecognition({
        accessing: filterAccessing,
        data: [],
      }),
    );
    await dispatch(loadMoreHistoryRecognition());
    return dispatch(actions.applyFilterHistory());
  }
};

const selectMonthFilterHistoryTemp = id => dispatch => {
  return dispatch(actions.selectMonthFilterHistoryTemp(id));
};

const selectAllMonthFilterHistoryTemp = () => dispatch => {
  return dispatch(actions.selectAllMonthFilterHistoryTemp());
};

const selectOrderFilterHistoryTemp = accessing => dispatch => {
  return dispatch(actions.selectOrderFilterHistoryTemp(accessing));
};

const clearFilterHistoryTemp = () => dispatch => {
  return dispatch(actions.clearFilterHistoryTemp());
};

const initFilterHistoryTemp = () => dispatch => {
  return dispatch(actions.initFilterHistoryTemp());
};

const setEnableScrollChildTabView = enabled => async (dispatch, getState) => {
  const { scrollChildTabViewEnabled } = getState().recognition;
  if (scrollChildTabViewEnabled !== enabled) {
    return await dispatch(actions.setEnableScrollChildTabView(enabled));
  }
};

const getRewards = () => async (dispatch, getState) => {
  const {
    rewards,
    rewardCategory,
    selectedRewardLocationIds: locationIds,
  } = getState().recognition;
  const { page, pageSize, hasNext, query, sortBy, sortOrder } = rewards;
  if (hasNext) {
    try {
      let response = await api.getRewards(
        {
          page,
          pageSize,
          query,
          sortBy,
          sortOrder,
        },
        rewardCategory,
        locationIds.join(','),
      );
      if (response) {
        const data = response.items;
        await dispatch(
          actions.setRewards({
            data: data.map(item => {
              return {
                ...item,
                title: item.brandName ? item.brandName : '',
                subtitle: item.name ? item.name : '',
                coin: item.coins,
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
      console.log(error);
      if (isUnauthorized(error)) {
        dispatch(appOperations.hideLoading());
        authOperations.logoutAlert();
      }
      return false;
    } finally {
      dispatch(appOperations.hideLoading());
    }
  }
};

const loadMoreRewards = currentPage => async (dispatch, getState) => {
  const { page, hasNext } = getState().recognition.rewards;
  if (page !== currentPage && !hasNext) {
    return;
  }
  await dispatch(getRewards());
};

const getSingleReward = id => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  const { language } = getState().app;
  await dispatch(actions.clearSingleReward());
  try {
    let response = await api.getSingleReward(id, language);
    response = {
      ...response,
      title: response.brandName ? response.brandName : '',
      subtitle: response.name ? response.name : '',
      coin: response.coins,
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
      await dispatch(actions.setSingleReward(response));
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

const setRewardCategory = category => async (dispatch, getState) => {
  const { rewardCategory } = getState().recognition;
  if (category === rewardCategory) {
    return;
  }
  await dispatch(actions.clearRewards());
  await dispatch(actions.setRewardCategory(category));
  return dispatch(getRewards());
};

const searchRewards = (category, query) => async (dispatch, getState) => {
  try {
    dispatch(actions.setLoading(true));
    dispatch(appOperations.showLoading());
    await dispatch(actions.clearRewards());
    await dispatch(actions.setRewardCategory(category));
    await dispatch(actions.setSearchRewardsQuery(query));
    await dispatch(getRewards());
  } catch (error) {
  } finally {
    dispatch(appOperations.hideLoading());
    dispatch(actions.setLoading(false));
  }
};

const getSortRewards = () => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    await dispatch(actions.clearRewards());
    await dispatch(getRewards());
  } catch (error) {
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const sortRewards = (sortBy, sortOrder) => async (dispatch, getState) => {
  await dispatch(actions.changeSortRewards({ sortBy, sortOrder }));
};

const clearSearchRewards = category => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    await dispatch(actions.clearRewards());
    await dispatch(actions.setRewardCategory(category));
    await dispatch(actions.clearSearchRewardsQuery());
    return dispatch(getRewards());
  } catch (error) {
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const claimReward = () => async (dispatch, getState) => {
  dispatch(appOperations.showLoading());
  try {
    const { singleReward } = getState().recognition;
    const { language } = getState().app;
    if (singleReward) {
      const { id, coins } = singleReward;
      const response = await api.claimReward(id, language);
      if (response) {
        const {
          remainingRewardCoinBalance,
          expireAt,
          accountRewardId,
        } = response;
        if (remainingRewardCoinBalance) {
          let { walletOverview } = getState().recognition;
          walletOverview = {
            ...walletOverview,
            rewardCoin: {
              ...walletOverview.rewardCoin,
              balance: remainingRewardCoinBalance,
              used: walletOverview.rewardCoin.used + coins,
            },
          };
          dispatch(actions.setClaimRewardsExpiredAt(expireAt));
          dispatch(actions.setWalletOverview(walletOverview));
        }
        return { success: true, accountRewardId };
      }
    }
    return { success: false, message: renderText(UNKNOWN_ERROR) };
  } catch (error) {
    if (error.data && error.data.message) {
      console.log(error.data.message);
      const validation = {
        isValid: false,
        message: errorMsg['ERROR_CODE_' + error.data.code],
      };
      let renderMessage = validation.message
        ? renderText(validation.message)
        : error.data.message;
      dispatch(appOperations.hideLoading());
      return { success: false, message: renderMessage };
    }
    return { success: false, message: renderText(UNKNOWN_ERROR) };
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const changeTabIndex = index => async dispatch => {
  const isRecognitionProgramEnabled = await authTokens.isRecognitionProgramEnabled();
  const tabIndex = isRecognitionProgramEnabled ? 3 : 2;
  switch (index) {
    case tabIndex:
      await dispatch(actions.clearHistoryRecognition());
      dispatch(getHistoryRecognition());
      break;
  }
};

const toggleIsNeedToScroll = () => async dispatch => {
  await dispatch(actions.toggleIsNeedToScroll());
};

const convertCoinsToBudget = coins => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    const response = await api.convertCoinsToBudget(coins);
    // Update coins after convert
    await dispatch(actions.updateCoinsAfterConvertingToBudget(coins));
    // Update budget after convert
    await dispatch(flexibleBenefitActions.updateBudgetAfterConvert(coins));
    const {
      app: { language },
    } = getState();
    return {
      success: true,
      message: language === 'vi' ? response.vi : response.en,
    };
  } catch (error) {
    return { success: false };
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

// recognition schemes
const getRecognitionSchemes = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();
  if (isShowOtherSchemes(user)) {
    try {
      dispatch(appOperations.showLoading());
      const response = await api.getRecognitionSchemes();
      dispatch(actions.setRecognitionSchemes(response));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(appOperations.hideLoading());
    }
  }
};

const getManagerPointCap = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();
  if (isShowOtherSchemes(user) && user.roles.includes('People Manager')) {
    try {
      dispatch(appOperations.showLoading());
      const response = await api.getManagerPointCap();
      dispatch(actions.setManagerPointCap(response));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(appOperations.hideLoading());
    }
  }
};

const setRecognitionProgram = id => async dispatch => {
  dispatch(actions.setRecognitionProgram(id));
};

const addRemoveSelectedEmployee = employee => async (dispatch, getState) => {
  const {
    recognition: { selectedEmployees },
  } = getState();
  const exist = selectedEmployees.find(e => e.id === employee.id);
  if (exist !== undefined) {
    dispatch(actions.removeSelectedEmployee(employee.id));
  } else {
    dispatch(actions.addSelectedEmployee(employee));
  }
};

const removeRecognizeEmployee = employee => async (dispatch, getState) => {
  const {
    recognition: { selectedEmployees },
  } = getState();
  const exist = selectedEmployees.find(e => e.id === employee.id);
  if (exist !== undefined) {
    dispatch(actions.removeSelectedEmployee(employee.id));
    dispatch(actions.removeRecognitionEmployee(employee.id));
  }
};

const addAllSelectedEmployees = () => async (dispatch, getState) => {
  dispatch(actions.addAllSelectedEmployees());
  if (IS.oneOf('pepsi', 'nestle')) {
    const isAdmin = _isAdmin(getState().auth.user);
    dispatch(actions.updatePointForGroupRecognition({ isAdmin }));
  }
};

const updateRecogniseEmployee = employee => async dispatch => {
  dispatch(actions.updateRecognitionEmployee(employee));
};

const applyMessageForAllParticipants = message => async dispatch => {
  dispatch(actions.applyMessageForAllParticipants(message));
};

const createRecognitionByProgram = () => async (dispatch, getState) => {
  const {
    recognition: { recogniseEmployee, programId },
  } = getState();
  try {
    dispatch(appOperations.showLoading());
    await api.createRecognitionByProgram(programId, recogniseEmployee);
    dispatch(actions.clearRecognitionByProgramReqModel());
    dispatch(actions.removeAllSelectedEmployees());
    dispatch(getManagerPointCap());
  } catch (error) {
    if (error.data && error.data.message) {
      console.log('create recognition by program error', error);
      console.log(renderText(errorMsg['ERROR_CODE_' + error.data.code]));
      return {
        success: false,
        message: renderText(errorMsg['ERROR_CODE_' + error.data.code]),
      };
    }
    return { success: false, message: renderText(UNKNOWN_ERROR) };
  } finally {
    dispatch(appOperations.hideLoading());
  }
  return { success: true };
};

const createSelfRecognition = () => async (dispatch, getState) => {
  const { auth, recognition } = getState();
  const employeeId = auth.user.employeeId;
  const programId = recognition.programId;
  const message = recognition.sendRecognition.note;
  const levelId = recognition.levelId;
  const attachments = recognition.listAttachments.map(
    (item, index) => item.url,
  );
  const recogniseEmployee = [
    {
      receiverId: employeeId,
      levelId,
      message,
      attachments,
    },
  ];
  const sendRecognitionForm = recognition.sendRecognition;
  const { note } = sendRecognitionForm;
  let validation = sendSelfRecognitionValidation({
    programId,
    note,
  });
  if (!validation.isValid) {
    dispatch(actions.updateSendRecognitionForm({ validation }));
    return false;
  }
  dispatch(actions.updateSendRecognitionForm({ validation: {} }));
  try {
    await api.createRecognitionByProgram(programId, recogniseEmployee);
    dispatch(actions.changeShowHideSuccessSendModal(true));
    dispatch(actions.removeAllAttachment());
    dispatch(actions.clearActiveSeftRecognition());
  } catch (error) {
    if (error.data && error.data.message) {
      return {
        success: false,
        message: renderText(errorMsg['ERROR_CODE_' + error.data.code]),
      };
    }
    return { success: false, message: renderText(UNKNOWN_ERROR) };
  }
};

const updateSingleHistoryRecognition = recognition => async dispatch => {
  dispatch(actions.updateSingleHistoryRecognition(recognition));
};

const updateRejectedRecognition = () => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    const {
      recognition: { singleHistoryRecognition },
    } = getState();
    await api.updateRejectedRecognition(singleHistoryRecognition);
    dispatch(
      updateSingleHistoryRecognition({
        ...singleHistoryRecognition,
        status: 'Pending',
      }),
    );
  } catch (error) {
    console.error('updateRejectedRecognition', error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const createRecognitionRejectedComment = (comment, recognitionId) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(appOperations.showLoading());
    const response = await api.createRecognitionRejectedComment(
      comment,
      recognitionId,
    );
    dispatch(actions.addNewRecognitionComment(response));
  } catch (error) {
    console.error('createComment', error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const getRecognitionComments = page => async (dispatch, getState) => {
  try {
    const {
      recognition: {
        singleHistoryRecognition: { id },
      },
    } = getState();
    dispatch(appOperations.showLoading());
    const response = await api.getRecognitionComments(id, page);
    dispatch(actions.setRecognitionComments(response));
  } catch (error) {
    console.log('getRecognitionComments error', error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const uploadRecognitionAttachment = (
  file,
  nameFolder = undefined,
) => async dispatch => {
  try {
    dispatch(appOperations.showLoading());
    file.fileName = file.name;
    const response = await api.uploadAttachments(file, nameFolder);
    const fileUpload = {
      data: file,
      url: response,
    };
    dispatch(actions.setAttachment(fileUpload));
    return response;
  } catch (error) {
    console.log('upload file error', error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const removeAllSelectedEmployees = () => async dispatch => {
  dispatch(actions.removeAllSelectedEmployees());
};

const mapRecognizedToSelectedEmployees = () => async dispatch => {
  dispatch(actions.mapRecognizedToSelectedEmployees());
};

const getAllRecognitionSchemes = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  // We only get schemes if isRecognitionSchemeEnabled
  if (user.isRecognitionSchemeEnabled) {
    const schemes = await api.getAllRecognitionSchemes();
    dispatch(actions.setAllRecognitionSchemes(schemes));
  }
};

const setRecognitionProgramFilter = (name, filter) => async (
  dispatch,
  getState,
) => {
  dispatch(actions.setRecognitionProgramFilter({ name, filter }));
};

const resetRecognitionProgramFilter = () => async dispatch => {
  dispatch(actions.resetRecognitionProgramFilter());
};

const applyRecognitionProgramFilter = () => async (dispatch, getState) => {
  // const { recognition } = getState();
  // console.log('applyRecognitionProgramFilter', recognition);
  await dispatch(actions.clearHistoryRecognition());
  await dispatch(loadMoreHistoryRecognition());
  return dispatch(actions.applyFilterHistory());
};

export const checkInEvent = params => async dispatch => {
  try {
    dispatch(appOperations.showLoading());
    dispatch(actions.checkInEvent(params));
    const response = await api.checkInEvent(params);
    dispatch(actions.checkInEventSuccess(response));
    return true;
  } catch (error) {
    dispatch(actions.checkInEventFailed(error));
    return _.get(error, 'data');
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

export const getListSelfRecognition = (
  type,
  isMulti = false,
) => async dispatch => {
  try {
    const response = await api.getAllSelfRecognitionSchemes(type, isMulti);
    return dispatch(actions.getListSelfRecognitionSuccess(response));
  } catch (error) {
    dispatch(actions.getListSelfRecognitionFailed());
    return _.get(error, 'data');
  }
};

export const getUserManagers = employeeId => async (dispatch, getState) => {
  try {
    dispatch(appOperations.showLoading());
    const response = await api.getUserManagers(employeeId);
    dispatch(actions.setUserManagers(response));
  } catch (error) {
    console.log('getUserManagers', error);
  } finally {
    dispatch(appOperations.hideLoading());
  }
};

const applyRecognitionHistoriesFilter = filter => async dispatch => {
  await dispatch(actions.clearHistoryRecognition());
  dispatch(actions.setRecognitionHistoryFilter(filter));
  await dispatch(loadMoreHistoryRecognition());
};

export default {
  resetRecognitionProgramFilter,
  applyRecognitionProgramFilter,
  setRecognitionProgramFilter,
  getAllRecognitionSchemes,
  removeRecognizeEmployee,
  mapRecognizedToSelectedEmployees,
  removeAllSelectedEmployees,
  addAllSelectedEmployees,
  addRemoveSelectedEmployee,
  uploadRecognitionAttachment,
  getRecognitionComments,
  createRecognitionRejectedComment,
  updateSingleHistoryRecognition,
  createRecognitionByProgram,
  applyMessageForAllParticipants,
  updateRecogniseEmployee,
  setRecognitionProgram,
  updateSendRecognitionForm,
  getListRatingCriteriaGroups,
  changeSearchUserQuery,
  changeSearchUserDepartmentId,
  searchUser,
  clearSearchUserData,
  loadMoreSearchUser,
  sendRecognition,
  changeShowHideConfirmSendModal,
  checkSendRecognitionForm,
  clearSendRecognitionForm,
  changeShowHideSuccessSendModal,
  getWalletOverview,
  initRecognitionPage,
  getTopRecentSenders,
  applySelectedBranches,
  selectBranchTemp,
  clearSelectedBranchesTemp,
  initSelectedBranchesTemp,
  clearSelectedBranches,
  setViewPointHistory,
  convertRecognitionToViewModel,
  loadMoreHistoryRecognition,
  setSingleHistoryRecognition,
  applyFilterHistory,
  clearFilterHistoryTemp,
  initFilterHistoryTemp,
  selectAllMonthFilterHistoryTemp,
  selectMonthFilterHistoryTemp,
  selectOrderFilterHistoryTemp,
  setEnableScrollChildTabView,
  loadMoreRewards,
  getSingleReward,
  setRewardCategory,
  claimReward,
  changeTabIndex,
  getRewardCategories,
  initRecognitionRewards,
  searchRewards,
  clearSearchRewards,
  sortRewards,
  getSortRewards,
  createRecognitionReply,
  getRecognitionReplies,
  getRecognitionReplyTemplate,
  toggleIsNeedToScroll,
  convertCoinsToBudget,
  getRecognitionSchemes,
  searchTeamMember,
  updateRejectedRecognition,
  checkInEvent,
  getListSelfRecognition,
  createSelfRecognition,
  getUserManagers,
  getDepartments,
  getRewardLocations,
  applyRecognitionHistoriesFilter,
  recallRecognition,
  getHistoryRecognition,
};
