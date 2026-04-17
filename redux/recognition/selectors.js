import { createSelector } from 'reselect';
import {
  LABEL_GIVE_POINT,
  LABEL_FLEX_POINTS,
} from '../../resources/string/strings';
import moment from 'moment';
import { IS } from '@resources/build_version/BuildVersion';
const branchesSelector = state => state.recognition.branches;
const currentSelectedBranchesSelector = state =>
  state.recognition.selectedBranches;
const selectedBranchesTempSelector = state =>
  state.recognition.selectedBranchesTemp;
const searchUserListSelector = state => state.recognition.searchUserListDisplay;
const historyRecognitionSelector = state =>
  state.recognition.historyRecognition.data;
const flexibleBenefitWalletHistoriesSelector = state =>
  state.flexibleBenefits.flexibleBenefitWalletHistories.data;

const monthsSelector = state => state.recognition.months;
const historyFilterMonthsTempSelector = state =>
  state.recognition.historyFilterTemp.months;
const historyFilterMonthsSelector = state =>
  state.recognition.historyFilter.months;
const historyFilterSelector = state => state.recognition.historyFilter;
const isSelectViewRecognitionPointSelector = state =>
  state.recognition.isSelectViewRecognitionPoint;
const recentSendersSelector = state => state.recognition.recentSenders;
const recognitionPoint = state => state.recognition.walletOverview.recognitionPoint;
const rewardCoin = state => state.recognition.walletOverview.rewardCoin;

const branchesWithStateSelector = createSelector(
  [branchesSelector, selectedBranchesTempSelector],
  (branches, selectedBranchesTemp) => {
    return branches.map(item => {
      return {
        ...item,
        isSelected:
          selectedBranchesTemp.findIndex(
            selectedBranch => selectedBranch === item.id,
          ) !== -1,
      };
    });
  },
);

const filteredUsersSelector = createSelector(
  [currentSelectedBranchesSelector, searchUserListSelector],
  (branches, users) => {
    return users.filter(
      item =>
        branches.length === 0 ||
        branches.findIndex(branch => branch === item.branchId) !== -1,
    );
  },
);

const filteredRecentSendersSelector = createSelector(
  [currentSelectedBranchesSelector, recentSendersSelector],
  (branches, users) => {
    return users.filter(
      item =>
        branches.length === 0 ||
        branches.findIndex(branch => branch === item.branchId) !== -1,
    );
  },
);

const selectedBranchesSelector = createSelector(
  [branchesSelector, currentSelectedBranchesSelector],
  (branches, selectedBranches) => {
    return branches.filter(
      item =>
        selectedBranches.findIndex(
          selectedBranch => selectedBranch === item.id,
        ) !== -1,
    );
  },
);

const selectedHistoryFilterMonthsTempSelector = createSelector(
  [monthsSelector, historyFilterMonthsTempSelector],
  (months, selectedMonthsTemp) => {
    return months.map(item => {
      return {
        ...item,
        isSelected:
          selectedMonthsTemp.findIndex(
            selectedMonth => selectedMonth === item.id,
          ) !== -1,
      };
    });
  },
);

const currentHistoryFilterMonthsWithStateSelector = createSelector(
  [monthsSelector, historyFilterMonthsSelector],
  (months, selectedMonthsTemp) => {
    return months.map(item => {
      return {
        ...item,
        isSelected:
          selectedMonthsTemp.findIndex(
            selectedMonth => selectedMonth === item.id,
          ) !== -1,
      };
    });
  },
);

const selectedHistoryFilterMonthSelector = createSelector(
  currentHistoryFilterMonthsWithStateSelector,
  months => {
    return months.filter(item => item.isSelected);
  },
);

const filteredHistoryRecognitionSelector = createSelector(
  [
    historyRecognitionSelector,
    selectedHistoryFilterMonthSelector,
    historyFilterSelector,
  ],
  (items, selectedMonth, historyFilter) => {
    let months = items;
    if (selectedMonth.length !== 0) {
      months = items.filter(
        item =>
          selectedMonth.findIndex(month =>
            month.date.isSame(item.createdAtDate, 'month'),
          ) != -1,
      );
    }
    if (historyFilter.accessing != undefined) {
      if (historyFilter.accessing) {
        return months.sort((a, b) => {
          return a.createdAtDate > b.createdAtDate;
        });
      } else {
        return months.sort((a, b) => {
          return a.createdAtDate < b.createdAtDate;
        });
      }
    } else {
      return months;
    }
  },
);

const currentFilterChoiceCountSelector = createSelector(
  historyFilterSelector,
  historyFilter => {
    let count = 0;
    if (historyFilter.accessing !== undefined) {
      count += 1;
    }
    count += historyFilter.months.length;
    return count;
  },
);

const historyRecognitionGroupByDateSelector = createSelector(
  [
    filteredHistoryRecognitionSelector,
    historyFilterSelector,
    isSelectViewRecognitionPointSelector,
  ],
  (items, historyFilter, isSelectViewRecognitionPoint) => {
    const map = new Map();
    items.forEach(item => {
      var convertItem = {
        ...item,
        function: item.title,
        title: item.fullName,
        subtitle: `${IS.NESTLE ? `${item.title} - ` : ''}${item.department}`,
        historyPoint: item.point,
        historyPointLabel: isSelectViewRecognitionPoint
          ? LABEL_GIVE_POINT
          : LABEL_FLEX_POINTS,
      };
      const key = item.createdAtDate.format('DD/MM/YYYY');
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [convertItem]);
      } else {
        collection.push(convertItem);
      }
    });
    return map;
  },
);

const flexibleBenefitWalletHistoriesGroupByDateSelector = createSelector(
  [flexibleBenefitWalletHistoriesSelector],
  data => {
    // console.log('data', data);
    const map = new Map();
    data.forEach(item => {
      var convertItem = {
        ...item,
      };
      const key = moment(item.createdAt).format('DD/MM/YYYY');
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [convertItem]);
      } else {
        collection.push(convertItem);
      }
    });
    return map;
  },
);

const selfRecognitionSelector = state => state.recognition.selfRecognition;

const listAttachmentsSelector = state =>
  state.recognition.listAttachments || [];

const activeItemSelector = state => state.recognition.activeSelfRecognition;

const getLevelId = state => state.recognition.levelId;

const getLevelData = state => state.recognition.levelData;

const getUserManagersSelector = state => state.recognition.userManagers;

const getSendRecognitionSelector = state => state.recognition.sendRecognition;

const getRewardLocationsSelector = state => state.recognition.rewardLocations;
const getSelectedRewardLocationIdsSelector = state =>
  state.recognition.selectedRewardLocationIds;
const getRewardsSelector = state => state.recognition.rewards;

export {
  filteredUsersSelector,
  branchesWithStateSelector,
  selectedBranchesSelector,
  historyRecognitionGroupByDateSelector,
  flexibleBenefitWalletHistoriesGroupByDateSelector,
  selectedHistoryFilterMonthsTempSelector,
  selectedHistoryFilterMonthSelector,
  currentFilterChoiceCountSelector,
  filteredRecentSendersSelector,
  recognitionPoint,
  rewardCoin,
  selfRecognitionSelector,
  listAttachmentsSelector,
  activeItemSelector,
  getLevelId,
  getLevelData,
  getUserManagersSelector,
  getSendRecognitionSelector,
  getRewardLocationsSelector,
  getSelectedRewardLocationIdsSelector,
  getRewardsSelector,
};
