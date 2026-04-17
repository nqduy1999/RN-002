import {
  UPDATE_SEND_RECOGNITION_FORM,
  SET_LIST_RATING_CRITERIA_GROUPS,
  CHANGE_SEARCH_USER_QUERY,
  CHANGE_SEARCH_USER_DEPARTMENT_ID,
  CLEAR_SEARCH_USER_DATA,
  SET_SEARCH_USER_LIST,
  CLEAR_SEND_RECOGNITION_FORM,
  CHANGE_SHOW_HIDE_CONFIRM_SEND_MODAL,
  CHANGE_SHOW_HIDE_SUCCESS_SEND_MODAL,
  SET_WALLET_OVERVIEW,
  SET_BRANCHES,
  SELECT_BRANCH_TEMP,
  CLEAR_SELECTED_BRANCHES_TEMP,
  CLEAR_SELECTED_BRANCHES,
  APPLY_SELECTED_BRANCHES,
  INIT_SELECTED_BRANCHES_TEMP,
  SET_VIEW_POINT_HISTORY,
  SET_HISTORY_RECOGNITION,
  CLEAR_HISTORY_RECOGNITION,
  CLEAR_RECOGNITION,
  SET_SINGLE_HISTORY_RECOGNITION,
  INIT_FILTER_HISTORY_TEMP,
  APPLY_FILTER_HISTORY,
  CLEAR_FILTER_HISTORY_TEMP,
  SELECT_ALL_MONTH_FILTER_HISTORY_TEMP,
  SELECT_MONTH_FILTER_HISTORY_TEMP,
  SELECT_ORDER_FILTER_HISTORY_TEMP,
  SET_MONTHS,
  LOAD_MORE_SEARCH_USER,
  SET_ENABLE_SCROLL_CHILD_TAB_VIEW,
  SET_REWARDS,
  SET_SINGLE_REWARD,
  CLEAR_SINGLE_REWARD,
  CLEAR_REWARDS,
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
  REMOVE_RECOGNIZE_EMPLOYEE,
  UPDATE_RECOGNITION_EMPLOYEE,
  APPLY_MESSAGE_FOR_ALL_PARTICIPANTS,
  CLEAR_CREATE_RECOGNITION_BY_PROGRAM_REQ_MODEL,
  UPDATE_SINGLE_HISTORY_RECOGNITION,
  SET_RECOGNITION_COMMENTS,
  ADD_NEW_RECOGNITION_COMMENT,
  ADD_SELECTED_EMPLOYEE,
  REMOVE_SELECTED_EMPLOYEE,
  ADD_ALL_SELECTED_EMPLOYEE,
  REMOVE_ALL_SELECTED_EMPLOYEE,
  MAP_RECOGNIZED_TO_SELECTED_EMPLOYEES,
  SET_ALL_RECOGNITION_SCHEMES,
  SET_RECOGNITION_PROGRAM_FILTER,
  RESET_RECOGNITION_PROGRAM_FILTER,
  SET_MANAGER_POINT_CAP,
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
  UPDATE_SELECTED_EMPLOYEE,
  SET_REWARD_LOCATIONS,
  UPDATE_REWARD_LOCATIONS,
  CLEAR_REWARD_LOCATIONS,
  APPLY_FILTER_REWARD_LOCATIONS,
  SET_RECOGNITION_HISTORY_FILTER,
  CHANGE_SHOW_HIDE_CONFIRM_RECALL_MODAL,
  CHANGE_SHOW_HIDE_SUCCESS_RECALL_MODAL,
} from './constants';
import {
  MODAL_TITLE_SUCCESS_RECALL_RECOGNITION,
  MODAL_TITLE_FAIL_RECALL_RECOGNITION,
  MODAL_DESCRIPTION_SUCCESS_RECALL_RECOGNITION,
  MODAL_DESCRIPTION_SUCCESS_RECALL_RECOGNITION_PART,
  MODAL_DESCRIPTION_FAIL_RECALL_RECOGNITION,
} from '@resources/string/strings';
import i18n from 'react-native-i18n';
import { commonConfig as config } from '../../config';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';

const setting = BuildVersion.setting;
const maxGroupEmployeeSendPoint = 30;

const defaultState = {
  isLoading: false,
  walletOverview: {
    rewardCoin: {
      balance: 0,
      received: 0,
      used: 0,
    },
    recognitionPoint: {
      balance: 0,
      usedThisWeek: 0,
      usedToDay: 0,
      lastUsed: 0,
    },
  },
  isShowConfirmSendModal: false,
  isShowSuccessSendModal: false,
  isShowConfirmRecallModal: false,
  isShowSuccessRecallModal: false,
  recallModalTitle: '',
  recallModalDescription: '',
  isUsingCoin: false,
  sendRecognition: {
    point: 5,
    criteriaId: undefined,
    criteriaIds: [],
    receiverId: -1,
    note: '',
    isPublish: true,
    notifyTo: [],
    groupKudosPoint: '0',
    groupKudosAllocateType: 'equally',
    isGroupKudos: false,
  },
  ratingCriteriaGroups: {
    vi: [],
    en: [],
  },
  topRecentSender: config.LOAD_TOP_RECENT_SENDER_SIZE,
  recentSenders: [],
  searchUserQuery: '',
  searchUserDepartmentId: 0,
  searchUserList: {
    data: [],
    pageSize: config.LOAD_SEARCH_USER_SIZE,
    currentPage: 0,
    nextPage: 1,
  },
  searchUserListDisplay: [],
  branches: [],
  selectedBranchesTemp: [],
  selectedBranches: [],
  isSelectViewRecognitionPoint: IS.NESTLE,
  historyRecognition: {
    data: [],
    page: 1,
    pageSize: 16,
    hasNext: true,
    accessing: false,
    filter: {
      time: {
        id: 0,
        name: '',
        startDate: undefined,
        endDate: undefined,
      },
      type: {
        id: 'All',
        name: '',
      },
    },
  },
  historyFilter: {
    accessing: undefined,
    months: [],
  },
  historyFilterTemp: {
    accessing: undefined,
    months: [],
  },
  months: [],
  scrollChildTabViewEnabled: false,
  scrollParentEnabled: true,
  rewards: {
    data: [],
    page: 1,
    pageSize: 16,
    hasNext: true,
    query: '',
    sortBy: setting.rewardSortBy,
    sortOrder: 'Asc',
  },
  rewardCategory: 36,
  singleReward: undefined,
  claimRewardExpiredAt: null,
  rewardCategories: [],
  singleHistoryRecognition: null,
  recognitionReplyTemplate: {
    icons: [],
    messages: {
      vi: [],
      en: [],
    },
  },
  recognitionReplies: {
    recognitionId: 0,
    items: [],
    page: 0,
    pageSize: 15,
    total: 0,
    totalPage: 1,
  },
  isNeedToScroll: false,
  recognitionSchemes: [],
  programId: null,
  levelId: null,
  recogniseEmployee: [],
  recognitionComments: [],
  selectedEmployees: [],
  allRecognitionSchemes: [],
  programFilter: null,
  timeFilter: null,
  statusFilter: null,
  managerPointCap: {
    expiryDate: '',
    managerCap: undefined,
    usedPoints: undefined,
  },
  selfRecognition: [],
  selfRecognitionForm: {},
  listAttachments: [],
  activeSelfRecognition: null,
  levelData: {},
  userManagers: [],
  departments: [],
  selectedEmployee: null,
  rewardLocations: [],
  selectedRewardLocationIds: [],
};

const reduce = (state = defaultState, action) => {
  let hasNext = true;
  switch (action.type) {
    case SET_MANAGER_POINT_CAP:
      return { ...state, managerPointCap: { ...action.managerPointCap } };
    case SET_RECOGNITION_PROGRAM_FILTER:
      switch (action.filter.name) {
        case 'program':
          return {
            ...state,
            programFilter: action.filter.filter,
          };
        case 'time':
          return {
            ...state,
            timeFilter: action.filter.filter,
          };
        case 'status':
          return {
            ...state,
            statusFilter: action.filter.filter,
          };
      }
      return { ...state };
    case RESET_RECOGNITION_PROGRAM_FILTER:
      return {
        ...state,
        programFilter: defaultState.programFilter,
        timeFilter: defaultState.timeFilter,
        statusFilter: defaultState.statusFilter,
      };
    case SET_ALL_RECOGNITION_SCHEMES:
      return { ...state, allRecognitionSchemes: [...action.schemes] };
    case MAP_RECOGNIZED_TO_SELECTED_EMPLOYEES:
      const selectedEmployees = state.recogniseEmployee.map(r => r.employee);
      return { ...state, selectedEmployees: [...selectedEmployees] };
    case ADD_NEW_RECOGNITION_COMMENT:
      return {
        ...state,
        recognitionComments: [...state.recognitionComments, action.comment],
      };
    case SET_RECOGNITION_COMMENTS:
      return {
        ...state,
        recognitionComments:
          action.comments.page === 1
            ? [...action.comments.items]
            : [
              ...state.recognition.recognitionComments,
              ...action.comments.items,
            ],
      };
    case UPDATE_SINGLE_HISTORY_RECOGNITION:
      return { ...state, singleHistoryRecognition: { ...action.recognition } };
    case CLEAR_CREATE_RECOGNITION_BY_PROGRAM_REQ_MODEL:
      return { ...state, recogniseEmployee: [] };
    case APPLY_MESSAGE_FOR_ALL_PARTICIPANTS:
      const employees = state.recogniseEmployee.map(e => {
        return { ...e, message: action.message };
      });
      return { ...state, recogniseEmployee: [...employees] };
    case REMOVE_RECOGNIZE_EMPLOYEE:
      return {
        ...state,
        recogniseEmployee: [
          ...state.recogniseEmployee.filter(e => e.receiverId !== action.id),
        ],
      };
    case ADD_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployees: [...state.selectedEmployees, { ...action.employee }],
      };
    case REMOVE_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployees: [
          ...state.selectedEmployees.filter(e => e.id !== action.id),
        ],
      };
    case ADD_ALL_SELECTED_EMPLOYEE:
      return {
        ...state,
        recogniseEmployee: [
          ...state.selectedEmployees.map(employee => {
            return {
              receiverId: employee.id,
              levelId: 0,
              message: '',
              employee: employee,
            };
          }),
        ],
      };
    case REMOVE_ALL_SELECTED_EMPLOYEE:
      return { ...state, selectedEmployees: [] };
    case UPDATE_RECOGNITION_EMPLOYEE:
      const recogniseEmployee = state.recogniseEmployee.map(e => {
        if (e.receiverId !== action.employee.receiverId) {
          return e;
        }
        return { ...action.employee };
      });
      return { ...state, recogniseEmployee: [...recogniseEmployee] };
    case UPDATE_RECOGNISE_EMPLOYEE:
      const { employeeId, value, isAdmin } = action.payload;
      const newList = [...state.recogniseEmployee];
      const existing = newList.find(e => e.receiverId === employeeId);
      existing.point = +value;
      existing.isCustom = true;

      if (!IS.NESTLE && !isAdmin && existing.point > maxGroupEmployeeSendPoint) {
        existing.point = maxGroupEmployeeSendPoint;
      }

      return {
        ...state,
        recogniseEmployee: newList,
      };

    case SET_RECOGNITION_PROGRAM:
      return {
        ...state,
        programId: action.programId,
      };
    case SET_RECOGNITION_SCHEMES:
      return {
        ...state,
        recognitionSchemes:
          setting.version === 'athena'
            ? action.schemes[i18n.currentLocale()]
            : action.schemes,
      };
    case UPDATE_COINS_AFTER_CONVERT_TO_BUDGET:
      return {
        ...state,
        walletOverview: {
          ...state.walletOverview,
          rewardCoin: {
            ...state.walletOverview.rewardCoin,
            balance: state.walletOverview.rewardCoin.balance - action.coins,
          },
        },
      };
    case TOGGLE_IS_NEED_TO_SCROLL:
      return {
        ...state,
        isNeedToScroll: !state.isNeedToScroll,
      };
    case CLEAR_RECOGNITION_REPLY:
      return {
        ...state,
        recognitionReplies: { ...defaultState.recognitionReplies },
      };
    case CREATE_RECOGNITION_REPLY:
      return {
        ...state,
        recognitionReplies: {
          ...state.recognitionReplies,
          items: [
            ...state.recognitionReplies.items,
            {
              key: action.reply.createdAt,
              replies: [action.reply],
              isSender: true,
            },
          ],
        },
        isNeedToScroll: true,
      };
    case SET_RECOGNITION_REPLIES:
      return {
        ...state,
        recognitionReplies: {
          ...action.replies,
          items:
            action.replies.page === 1
              ? [...action.replies.items]
              : [...action.replies.items, ...state.recognitionReplies.items],
        },
        isNeedToScroll: action.replies.page === 1,
      };
    case SET_RECOGNITION_REPLY_TEMPLATE:
      return { ...state, recognitionReplyTemplate: { ...action.template } };
    case UPDATE_SEND_RECOGNITION_FORM:
      return {
        ...state,
        sendRecognition: {
          ...state.sendRecognition,
          ...action.form,
        },
      };
    case SET_LIST_RATING_CRITERIA_GROUPS:
      return {
        ...state,
        ratingCriteriaGroups: action.ratingCriteriaGroups,
      };
    case CHANGE_SEARCH_USER_QUERY:
      return {
        ...state,
        searchUserQuery: action.searchUserQuery,
      };

    case CHANGE_SEARCH_USER_DEPARTMENT_ID:
      return {
        ...state,
        searchUserDepartmentId: action.searchUserDepartmentId,
      };

    case SET_SEARCH_USER_LIST:
      hasNext = true;
      if (action.searchUserList.length <= state.searchUserList.pageSize) {
        hasNext = false;
      }
      return {
        ...state,
        searchUserList: {
          ...state.searchUserList,
          data: action.searchUserList,
          currentPage: 0,
          nextPage: 1,
          hasNext: hasNext,
        },
        searchUserListDisplay: [
          ...action.searchUserList.slice(0, state.searchUserList.pageSize),
        ],
      };
    case LOAD_MORE_SEARCH_USER:
      hasNext = true;
      if (
        state.searchUserList.data.length <=
        state.searchUserList.nextPage * state.searchUserList.pageSize
      ) {
        hasNext = false;
      }
      let currentPage = state.searchUserList.nextPage;
      let nextPage = state.searchUserList.nextPage + 1;
      return {
        ...state,
        searchUserList: {
          ...state.searchUserList,
          currentPage: currentPage,
          nextPage: nextPage,
          hasNext: hasNext,
        },
        searchUserListDisplay: [
          ...state.searchUserListDisplay,
          ...state.searchUserList.data.slice(
            currentPage * state.searchUserList.pageSize,
            nextPage * state.searchUserList.pageSize,
          ),
        ],
      };
    case CLEAR_SEARCH_USER_DATA:
      return {
        ...state,
        searchUserList: defaultState.searchUserList,
        searchUserListDisplay: defaultState.searchUserListDisplay,
      };
    case CLEAR_SEND_RECOGNITION_FORM:
      return {
        ...state,
        sendRecognition: {
          ...defaultState.sendRecognition,
          isGroupKudos: state.sendRecognition.isGroupKudos,
        },
      };
    case CHANGE_SHOW_HIDE_CONFIRM_SEND_MODAL:
      return {
        ...state,
        isShowConfirmSendModal: action.isShowConfirmSendModal,
      };
    case CHANGE_SHOW_HIDE_SUCCESS_SEND_MODAL:
      return {
        ...state,
        isShowSuccessSendModal: action.isShowSuccessSendModal,
      };
    case CHANGE_SHOW_HIDE_CONFIRM_RECALL_MODAL:
      return {
        ...state,
        isShowConfirmRecallModal: action.isShowConfirmRecallModal,
      };
    case CHANGE_SHOW_HIDE_SUCCESS_RECALL_MODAL:
      let recallModalTitle = MODAL_TITLE_SUCCESS_RECALL_RECOGNITION;
      let recallModalDescription = MODAL_DESCRIPTION_SUCCESS_RECALL_RECOGNITION;

      if (action.payload.data) {
        const {
          data: { recognitionAmount, recalledAmount },
        } = action.payload;
        if (recalledAmount === recognitionAmount && recalledAmount > 0) {
          recallModalTitle = MODAL_TITLE_SUCCESS_RECALL_RECOGNITION;
          recallModalDescription = MODAL_DESCRIPTION_SUCCESS_RECALL_RECOGNITION;
        } else if (recalledAmount > 0) {
          recallModalTitle = MODAL_TITLE_SUCCESS_RECALL_RECOGNITION;
          recallModalDescription = MODAL_DESCRIPTION_SUCCESS_RECALL_RECOGNITION_PART;
        } else {
          recallModalTitle = MODAL_TITLE_FAIL_RECALL_RECOGNITION;
          recallModalDescription = MODAL_DESCRIPTION_FAIL_RECALL_RECOGNITION;
        }
      }

      return {
        ...state,
        isShowSuccessRecallModal: action.payload.show,
        recallModalTitle: recallModalTitle,
        recallModalDescription: recallModalDescription,
        isUsingCoin: action.payload.data?.isUsingCoin ?? false,
      };
    case SET_WALLET_OVERVIEW:
      return {
        ...state,
        walletOverview: action.walletOverview,
      };
    case SET_BRANCHES:
      return {
        ...state,
        branches: action.branches,
        selectedBranches: [],
        selectedBranchesTemp: [],
      };
    case INIT_SELECTED_BRANCHES_TEMP:
      return {
        ...state,
        selectedBranchesTemp: state.selectedBranches,
      };
    case SELECT_BRANCH_TEMP:
      return {
        ...state,
        selectedBranchesTemp:
          state.selectedBranchesTemp.findIndex(item => item === action.id) !==
            -1
            ? state.selectedBranchesTemp.filter(item => item !== action.id)
            : [...state.selectedBranchesTemp, action.id],
      };
    case CLEAR_SELECTED_BRANCHES_TEMP:
      return {
        ...state,
        selectedBranchesTemp: [],
      };
    case CLEAR_SELECTED_BRANCHES:
      return {
        ...state,
        selectedBranches: [],
        selectedBranchesTemp: [],
      };
    case APPLY_SELECTED_BRANCHES:
      return {
        ...state,
        selectedBranches: state.selectedBranchesTemp,
      };
    case SET_VIEW_POINT_HISTORY:
      return {
        ...state,
        isSelectViewRecognitionPoint: action.isSelectViewRecognitionPoint,
      };
    case CLEAR_HISTORY_RECOGNITION:
      return {
        ...state,
        historyRecognition: defaultState.historyRecognition,
      };
    case SET_HISTORY_RECOGNITION:
      if (action.historyRecognition.page) {
        if (action.historyRecognition.page <= state.historyRecognition.page) {
          return state;
        }
      }
      return {
        ...state,
        historyRecognition: {
          ...state.historyRecognition,
          ...action.historyRecognition,
          data: [
            ...state.historyRecognition.data,
            ...action.historyRecognition.data,
          ],
        },
      };
    case SET_SINGLE_HISTORY_RECOGNITION:
      return {
        ...state,
        singleHistoryRecognition: action.singleHistoryRecognition,
      };
    case CLEAR_RECOGNITION:
      return {
        ...defaultState,
        walletOverview: state.walletOverview,
      };
    case SET_MONTHS:
      return {
        ...state,
        months: action.months,
      };
    case INIT_FILTER_HISTORY_TEMP:
      return {
        ...state,
        historyFilterTemp: state.historyFilter,
      };
    case APPLY_FILTER_HISTORY:
      return {
        ...state,
        historyFilter: state.historyFilterTemp,
      };
    case CLEAR_FILTER_HISTORY_TEMP:
      return {
        ...state,
        historyFilterTemp: defaultState.historyFilterTemp,
      };
    case SELECT_ALL_MONTH_FILTER_HISTORY_TEMP:
      return {
        ...state,
        historyFilterTemp: {
          ...state.historyFilterTemp,
          months: [],
        },
      };
    case SELECT_MONTH_FILTER_HISTORY_TEMP:
      return {
        ...state,
        historyFilterTemp: {
          ...state.historyFilterTemp,
          months:
            state.historyFilterTemp.months.findIndex(
              item => item === action.id,
            ) !== -1
              ? state.historyFilterTemp.months.filter(
                item => item !== action.id,
              )
              : [...state.historyFilterTemp.months, action.id],
        },
      };
    case SELECT_ORDER_FILTER_HISTORY_TEMP:
      return {
        ...state,
        historyFilterTemp: {
          ...state.historyFilterTemp,
          accessing: action.accessing,
        },
      };
    case SET_ENABLE_SCROLL_CHILD_TAB_VIEW:
      return {
        ...state,
        scrollChildTabViewEnabled: action.scrollChildTabViewEnabled,
        scrollParentEnabled: !action.scrollChildTabViewEnabled,
      };
    case SET_SINGLE_REWARD:
      return {
        ...state,
        singleReward: action.singleReward,
      };
    case SET_REWARDS:
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
    case CLEAR_SINGLE_REWARD:
      return {
        ...state,
        singleReward: defaultState.singleReward,
      };
    case CLEAR_REWARDS:
      return {
        ...state,
        rewards: {
          ...state.rewards,
          data: [],
          page: 1,
          pageSize: 16,
          hasNext: true,
        },
      };
    case SET_REWARD_CATEGORY:
      return {
        ...state,
        rewardCategory: action.rewardCategory,
      };
    case SET_TOP_RECENT_SENDER:
      return {
        ...state,
        recentSenders: action.recentSenders,
      };
    case SET_CLAIM_REWARD_EXPIRED_AT:
      return {
        ...state,
        claimRewardExpiredAt: action.claimRewardExpiredAt,
      };
    case SET_REWARD_CATEGORIES:
      return {
        ...state,
        rewardCategories: action.rewardCategories,
      };
    case CLEAR_REWARD_CATEGORIES:
      return {
        ...state,
        rewardCategories: [],
      };
    case SET_SEARCH_REWARDS_QUERY:
      return {
        ...state,
        rewards: { ...state.rewards, query: action.query },
      };
    case CLEAR_SEARCH_REWARDS_QUERY:
      return {
        ...state,
        rewards: { ...state.rewards, query: '' },
      };
    case CHANGE_SORT_REWARDS:
      return {
        ...state,
        rewards: {
          ...state.rewards,
          sortOrder: action.sortOption.sortOrder,
          sortBy: action.sortOption.sortBy,
        },
      };
    case GET_LIST_SELF_RECOGNITION_SUCCESS:
      return {
        ...state,
        selfRecognition: action.data,
      };
    case GET_LIST_SELF_RECOGNITION_FAILED:
      return {
        ...state,
        selfRecognition: [],
      };
    case SET_LEVEL_ID_SELF_RECOGNITION:
      return {
        ...state,
        levelId: action.levelId,
      };
    case SET_ATTACHMENT:
      const stateClone = { ...state };
      const listAttachs = stateClone.listAttachments;
      listAttachs.push(action.fileUpload);
      return {
        ...state,
        listAttachments: listAttachs,
      };
    case REMOVE_ITEM_ATTACHMENT:
      const _state = { ...state };
      const listAttach = _state.listAttachments;
      listAttach.splice(action.indexFile, 1);
      return {
        ...state,
        listAttachments: listAttach,
      };
    case REMOVE_ALL_ITEM_ATTACHMENT:
      return {
        ...state,
        listAttachments: [],
      };
    case SET_ACTIVE_SELF_RECOGNITION:
      return {
        ...state,
        activeSelfRecognition: action.indexActive,
      };
    case CLEAR_ACTIVE_SELF_RECOGNITION:
      return {
        ...state,
        activeSelfRecognition: null,
        programId: null,
        levelId: null,
      };
    case SET_LEVEL_POINT:
      return {
        ...state,
        levelData: action.payload,
      };
    case CLEAR_NOTE:
      return {
        ...state,
        sendRecognition: {
          ...state.sendRecognition,
          note: '',
          groupKudosPoint: '0',
          groupKudosAllocateType: 'equally',
        },
        selectedEmployees: [],
        recogniseEmployee: [],
      };
    case SET_RECOGNITION_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_USER_MANAGERS:
      return {
        ...state,
        userManagers: action.payload,
      };
    case CLEAR_USER_MANAGERS:
      return {
        ...state,
        userManagers: [],
        sendRecognition: {
          ...state.sendRecognition,
          notifyTo: [],
        },
      };
    case UPDATE_POINT_FOR_GROUP_RECOGNITION:
      const { groupKudosPoint, groupKudosAllocateType } = state.sendRecognition;
      const receivers = state.recogniseEmployee.map(receiver => ({
        ...receiver,
      }));
      const point = +groupKudosPoint;

      let updatedReceivers = [];
      let equallyPoint = 0;
      let updatePoint = point;


      if (action.payload.isUpdateGroupKudosPoint) {
        // if the total point is updated, we will reset the custom
        // --> set all custom to false
        receivers.forEach(receiver => {
          receiver.isCustom = false;
        });
      }

      if (groupKudosAllocateType === 'equally') {
        // equal divide
        if (receivers.length > 0) {
          // rounding point down
          equallyPoint = Math.floor(point / receivers.length);

          // just allow maximum allocate point is maxGroupEmployeeSendPoint if not admin
          if (!IS.NESTLE && !action.payload.isAdmin && equallyPoint > maxGroupEmployeeSendPoint) {
            equallyPoint = maxGroupEmployeeSendPoint;
          }
        }
        updatedReceivers = receivers.map(receiver => ({
          ...receiver,
          point: equallyPoint,
          isCustom: false,
        }));
      } else {
        // manual divide
        if (receivers.length === 0) return state;
        const receiversCustom = receivers.filter(receiver => receiver.isCustom);
        const totalPointOfReceiversCustom = receiversCustom
          .map(x => x.point ?? 0)
          .reduce((prev, curr) => prev + curr, 0);
        const receiversNoCustom = receivers.filter(
          receiver => !receiver.isCustom,
        );

        // if [total of point custom] >= [point]
        // --> set [point] = [total of point custom]
        // --> the equal point = 0
        if (totalPointOfReceiversCustom >= point) {
          updatePoint = totalPointOfReceiversCustom;
          equallyPoint = 0;
        } else {
          // else [total of point custom] < point
          // --> will have remaining point to divide for [no custom receiver]
          if (receiversNoCustom.length > 0) {
            // have [no custom receiver]
            const remainingPoint = updatePoint - totalPointOfReceiversCustom;
            equallyPoint = Math.floor(
              remainingPoint / receiversNoCustom.length,
            );
            // just allow maximum allocate point is maxGroupEmployeeSendPoint if not admin
            if (!IS.NESTLE && !action.payload.isAdmin && equallyPoint > maxGroupEmployeeSendPoint) {
              equallyPoint = maxGroupEmployeeSendPoint;
            }
          } else {
            // [no custom receiver], but [total of custom point] < point
            // --> [point] = [total of custom point]
            updatePoint = totalPointOfReceiversCustom;
          }
        }

        updatedReceivers = receivers.map(receiver => ({
          ...receiver,
          point: receiver.isCustom ? receiver.point : equallyPoint,
        }));
      }

      return {
        ...state,
        sendRecognition: {
          ...state.sendRecognition,
          // point: updatePoint,
          groupKudosPoint: `${updatePoint}`,
        },
        recogniseEmployee: updatedReceivers,
      };

    case SET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };

    case UPDATE_DEPARTMENTS:
      const { id, level } = action.payload;
      let updatedDepartments = [];

      switch (level) {
        case 1:
          updatedDepartments = state.departments.map(d => ({
            ...d,
            children: d.children.map(sd => ({
              ...sd,
              children: sd.children.map(f => ({
                ...f,
                isSelected: f.id === 0,
              })),
              isSelected: sd.id === 0,
            })),
            isSelected: d.id === id,
          }));
          break;

        case 2:
          updatedDepartments = state.departments.map(d => ({
            ...d,
            children: d.children.map(sd => ({
              ...sd,
              children: sd.children.map(f => ({
                ...f,
                isSelected: sd.id === 0,
              })),
              isSelected: sd.id === id,
            })),
          }));
          break;
        case 3:
          updatedDepartments = state.departments.map(d => ({
            ...d,
            children: d.children.map(sd => ({
              ...sd,
              children: sd.children.map(f => ({
                ...f,
                isSelected: f.id === id,
              })),
            })),
          }));
          break;
      }

      return {
        ...state,
        departments: updatedDepartments,
      };

    case UPDATE_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload,
      };

    case SET_REWARD_LOCATIONS:
      return {
        ...state,
        rewardLocations: action.payload,
      };
    case UPDATE_REWARD_LOCATIONS:
      const locationId = action.payload;
      return {
        ...state,
        rewardLocations: state.rewardLocations.map(location => ({
          ...location,
          isSelected:
            location.id === locationId
              ? !location.isSelected
              : location.isSelected,
        })),
      };

    case CLEAR_REWARD_LOCATIONS:
      return {
        ...state,
        rewardLocations: state.rewardLocations.map(location => ({
          ...location,
          isSelected: false,
        })),
      };

    case APPLY_FILTER_REWARD_LOCATIONS:
      return {
        ...state,
        selectedRewardLocationIds: state.rewardLocations
          .filter(location => location.isSelected)
          .map(location => location.id),
      };

    case SET_RECOGNITION_HISTORY_FILTER:
      return {
        ...state,
        historyRecognition: {
          ...state.historyRecognition,
          filter: {
            ...state.historyRecognition.filter,
            time: action.payload.time,
            type: action.payload.type,
          },
        },
      };

    default:
      return state;
  }
};

export default reduce;
