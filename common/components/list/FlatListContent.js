import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import RatingValueCriteriaItem from './list-item/RatingValueCriteriaItem';
import SearchUserItem from './list-item/SearchUserItem';
import TextItem from './list-item/TextItem';
import SelectedBranchItem from './list-item/SelectedBranchItem';
import NewsDocumentsItem from './list-item/NewsDocumentsItem';
import NewsDocumentsCardItem from './list-item/NewsDocumentsCardItem';
import RatingCriteriaGroupItem from './list-item/RatingCriteriaGroupItem';
import NotificationItem from './list-item/NotificationItem';
import RewardCategoryItem from './list-item/RewardCategoryItem';
import RewardItem from './list-item/RewardItem';
import RewardActiveItem from './list-item/RewardActiveItem';
import RewardUsedItem from './list-item/RewardUsedItem';
import RewardExpiredItem from './list-item/RewardExpiredItem';
import AppleStyleSwipeableRow from './list-item/AppleStyleSwipeableRow';
import LatestNewsCardItem from './list-item/LatestNewsCardItem';
import BenefitsItem from './list-item/BenefitsItem';
import FlexibleBenefitsItem from './list-item/FlexibleBenefitsItem';
import RecognitionReplyItem from './list-item/RecognitionReplyItem';
import NotificationCategoryItem from './list-item/NotificationCategoryItem';
import FlexibleBenefitCategoryItem from './list-item/FlexibleBenefitCategoryItem';
import RecognitionSchemeItem from './list-item/RecognitionSchemeItem';
import SearchMultipleUserItem from './list-item/SearchMultipleUserItem';
import SelectedRecognitionEmployeeItem from './list-item/SelectedRecognitionEmployeeItem';
import LevelPointsItem from './list-item/LevelPointsItem';
import RecognitionCommentItem from './list-item/RecognitionCommentItem';
import ProgramFilterItem from './list-item/ProgramFilterItem';

const CONTENT_TYPES = {
  default: View,
  'rating-value-criteria': RatingValueCriteriaItem,
  'search-user': SearchUserItem,
  searchMultipleUser: SearchMultipleUserItem,
  text: TextItem,
  'selected-branch': SelectedBranchItem,
  news: NewsDocumentsItem,
  documents: NewsDocumentsItem,
  'related-articles': NewsDocumentsCardItem,
  'rating-criteria-groups': RatingCriteriaGroupItem,
  notifications: NotificationItem,
  'reward-category': RewardCategoryItem,
  reward: RewardItem,
  'reward-active': RewardActiveItem,
  'reward-used': RewardUsedItem,
  'reward-expired': RewardExpiredItem,
  'latest-news': LatestNewsCardItem,
  benefits: BenefitsItem,
  'flexible-benefits': FlexibleBenefitsItem,
  recognitionReply: RecognitionReplyItem,
  notificationCategory: NotificationCategoryItem,
  flexibleBenefitCategory: FlexibleBenefitCategoryItem,
  recognitionSchemes: RecognitionSchemeItem,
  selectedRecognitionEmployee: SelectedRecognitionEmployeeItem,
  levelPoints: LevelPointsItem,
  recognitionComment: RecognitionCommentItem,
  recognitionProgramFilter: ProgramFilterItem,
};

const CONTENT_TOUCHABLE = {
  'search-list': false,
  'share-user': false,
  documents: false,
  'reward-active': false,
  benefits: false,
};

const CONTENT_TYPE_ITEM_STYLE = {
  'search-list': {
    margin: 0,
  },
  notifications: {
    paddingHorizontal: 18,
  },
  reward: {
    marginBottom: 20,
  },
  benefits: {
    marginHorizontal: 16,
  },
  selectedRecognitionEmployee: {
    marginRight: 10,
  },
};

const CONTENT_WRAPPER_CONTROL = {
  'reward-active': AppleStyleSwipeableRow,
  default: TouchableOpacity,
};

const CONTENT_WRAPPER_CONTROL_PROPS = {
  'reward-active': {
    leftButtonText: 'Xóa',
    enableSwipeLeft: true,
    style: {
      marginBottom: 24,
      borderRadius: 4,
    },
  },
  default: {},
};

const renderListItem = (
  item,
  index,
  contentType,
  size,
  onItemPress,
  onSwipeableLeftOpen,
  query,
  length,
  wrapperProps,
  searchUser,
  isSelfRecognition,
  navigation,
) => {
  let isItemNonVoucher = item.orderStatus === 'InProgress';
  let ItemControl = CONTENT_TYPES[contentType];
  let touchable = onItemPress && CONTENT_TOUCHABLE[contentType] !== false;
  let ItemWrapper = CONTENT_WRAPPER_CONTROL[contentType]
    ? CONTENT_WRAPPER_CONTROL[contentType]
    : CONTENT_WRAPPER_CONTROL.default;
  let ItemWrapperDefaultProps = CONTENT_WRAPPER_CONTROL_PROPS[contentType];
  const recognitionLevels = item?.recognitionLevels || [];

  return (
    <ItemWrapper
      key={index}
      {...ItemWrapperDefaultProps}
      {...wrapperProps}
      disabled={!touchable}
      enableSwipeLeft={!isItemNonVoucher}
      onPress={() => onItemPress && onItemPress(item, index)}
      onSwipeableLeftOpen={() => {
        onSwipeableLeftOpen && onSwipeableLeftOpen(item, index);
      }}>
      <ItemControl
        style={{
          ...styles.listItem,
          ...CONTENT_TYPE_ITEM_STYLE[contentType],
        }}
        {...item}
        size={size}
        index={index}
        length={length}
        onPress={child => onItemPress && onItemPress(item, index, child)}
        query={query}
        searchUser={searchUser}
        recognitionLevels={recognitionLevels}
        isSelfRecognition={isSelfRecognition}
        navigation={navigation}
      />
    </ItemWrapper>
  );
};

const FlatListContent = ({
  style,
  data,
  onItemPress,
  onSwipeableLeftOpen,
  size = 'medium',
  contentType = 'default',
  orientation = 'grid',
  query = null,
  wrapperProps,
  searchUser = false,
  isSelfRecognition,
  navigation,
  ...props
}) => {
  return (
    <FlatList
      {...props}
      style={[styles.container, style]}
      data={data}
      renderItem={({ item, index }) => {
        return renderListItem(
          item,
          index,
          contentType,
          size,
          onItemPress,
          onSwipeableLeftOpen,
          query,
          data.length,
          wrapperProps,
          searchUser,
          isSelfRecognition,
          navigation,
        );
      }}
      keyExtractor={(item, index) => (item.id ? `${item.id}` : `${index}`)}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  listItem: {},
  noMargin: {
    margin: 0,
  },
  noPaddingHorizontal: {
    paddingHorizontal: 0,
  },
});

export default FlatListContent;