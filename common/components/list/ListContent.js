import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import RatingValueCriteriaItem from './list-item/RatingValueCriteriaItem';
import SearchUserItem from './list-item/SearchUserItem';
import BoxItem from './list-item/BoxItem';
import TextItem from './list-item/TextItem';
import SelectedBranchItem from './list-item/SelectedBranchItem';
import NewsDocumentsItem from './list-item/NewsDocumentsItem';
import NewsDocumentsCardItem from './list-item/NewsDocumentsCardItem';
import RatingCriteriaGroupItem from './list-item/RatingCriteriaGroupItem';
import NotificationItem from './list-item/NotificationItem';
import RewardCategoryItem from './list-item/RewardCategoryItem';
import FlexibleCategoryItem from './list-item/FlexibleCategoryItem';
import RewardItem from './list-item/RewardItem';
import RewardActiveItem from './list-item/RewardActiveItem';
import RewardUsedItem from './list-item/RewardUsedItem';
import RewardExpiredItem from './list-item/RewardExpiredItem';
import LatestNewsCardItem from './list-item/LatestNewsCardItem';
import FeaturedDocumentsCardItem from './list-item/FeaturedDocumentsCardItem';
import BenefitsItem from './list-item/BenefitsItem';
import TopBenefitsItem from './list-item/TopBenefitsItem';
import FlexibleBenefitsItem from './list-item/FlexibleBenefitsItem';
import FlexibleBenefitOptionItem from './list-item/FlexibleBenefitOptionItem';
import RecognitionReplyItem from './list-item/RecognitionReplyItem';
import NotificationCategoryItem from './list-item/NotificationCategoryItem';
import FlexibleBenefitCategoryItem from './list-item/FlexibleBenefitCategoryItem';
import RecognitionSchemeItem from './list-item/RecognitionSchemeItem';
import LevelPointsItem from './list-item/LevelPointsItem';
import ProgramFilterItem from './list-item/ProgramFilterItem';

const CONTENT_TYPES = {
  default: View,
  'rating-value-criteria': RatingValueCriteriaItem,
  'search-user': SearchUserItem,
  box: BoxItem,
  text: TextItem,
  'selected-branch': SelectedBranchItem,
  news: NewsDocumentsItem,
  documents: NewsDocumentsItem,
  'related-articles': NewsDocumentsCardItem,
  'rating-criteria-groups': RatingCriteriaGroupItem,
  notifications: NotificationItem,
  'reward-category': RewardCategoryItem,
  'flexible-category': FlexibleCategoryItem,
  reward: RewardItem,
  'reward-active': RewardActiveItem,
  'reward-used': RewardUsedItem,
  'reward-expired': RewardExpiredItem,
  'latest-news': LatestNewsCardItem,
  'featured-documents': FeaturedDocumentsCardItem,
  benefits: BenefitsItem,
  'top-benefits': TopBenefitsItem,
  'flexible-benefits': FlexibleBenefitsItem,
  'flexible-benefit-option': FlexibleBenefitOptionItem,
  recognitionReply: RecognitionReplyItem,
  notificationCategory: NotificationCategoryItem,
  flexibleBenefitCategory: FlexibleBenefitCategoryItem,
  recognitionSchemes: RecognitionSchemeItem,
  levelPoints: LevelPointsItem,
  recognitionProgramFilter: ProgramFilterItem,
};

const CONTENT_TOUCHABLE = {
  'search-list': false,
  'share-user': false,
  documents: false,
  'reward-category': false,
  'rating-criteria-groups': false,
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
};

const CONTENT_TYPE_STYLE = {
  'search-list': {
    paddingHorizontal: 0,
  },
};

const CONTENT_TOUCHABLE_WRAPPER = {};

const LAYOUT_ORIENTATIONS = {
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  vertical: {
    // flexDirection: 'column',
    // flexWrap: 'nowrap'
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
};

const renderChildren = (
  data,
  contentType,
  size,
  onItemPress,
  query,
  styleListItem,
  expandedId,
  isLoading,
) => {
  return (
    data &&
    data.map((item, index) =>
      renderListItem(
        item,
        index,
        contentType,
        size,
        onItemPress,
        query,
        data.length,
        styleListItem,
        expandedId,
        isLoading,
      ),
    )
  );
};

const renderListItem = (
  item,
  index,
  contentType,
  size,
  onItemPress,
  query,
  length,
  styleListItem,
  expandedId,
  isLoading,
) => {
  let ItemControl = CONTENT_TYPES[contentType];
  let touchable = onItemPress && CONTENT_TOUCHABLE[contentType] !== false;
  let TouchableWrapper = CONTENT_TOUCHABLE_WRAPPER[contentType]
    ? CONTENT_TOUCHABLE_WRAPPER[contentType]
    : TouchableOpacity;
  return (
    <TouchableWrapper
      key={index}
      disabled={!touchable || isLoading === true}
      onPress={() => onItemPress && onItemPress(item, index)}>
      <ItemControl
        style={{
          ...styles.listItem,
          ...CONTENT_TYPE_ITEM_STYLE[contentType],
          ...styleListItem,
        }}
        {...item}
        size={size}
        length={length}
        index={index}
        onPress={child => onItemPress && onItemPress(item, index, child)}
        query={query}
        expandedId={expandedId}
      />
    </TouchableWrapper>
  );
};

const ListContent = ({
  style,
  styleListItem,
  data,
  onItemPress,
  size = 'medium', // refer to RectangleListItem sizes
  contentType = 'default',
  orientation = 'grid',
  query = null,
  expandedId,
  isLoading,
  ...props
}) => {
  const orientationStyle = LAYOUT_ORIENTATIONS[orientation];
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...orientationStyle,
        ...CONTENT_TYPE_STYLE[contentType],
        ...style,
      }}>
      {renderChildren(
        data,
        contentType,
        size,
        onItemPress,
        query,
        styleListItem,
        expandedId,
        isLoading,
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItem: {},
  noMargin: {
    margin: 0,
  },
  noPaddingHorizontal: {
    paddingHorizontal: 0,
  },
});

export default ListContent;
