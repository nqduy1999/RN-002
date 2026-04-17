import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import TextGroup from './list-group/TextGroup';
import CollapseTextGroup from './list-group/CollapseTextGroup';
import PackageTextGroup from './list-group/PackageTextGroup';
import VenueStoreItem from './list-item/VenueStoreItem';
import HistoryRecognitionItem from './list-item/HistoryRecognitionItem';
import FlexibleBenefitOptionItem from './list-item/FlexibleBenefitOptionItem';
import FlexibleBenefitWalletHistoryItem from './list-item/FlexibleBenefitWalletHistoryItem';
import WalletHistoryItem from './list-item/WalletHistoryItem';

const CONTENT_TYPES = {
  default: View,
  'history-recognition': HistoryRecognitionItem,
  'venue-store': VenueStoreItem,
  'flexible-benefit-option': FlexibleBenefitOptionItem,
  'flexible-benefit-wallet-history': FlexibleBenefitWalletHistoryItem,
  'wallet-history': WalletHistoryItem,
};

const CONTENT_GROUP_TYPES = {
  default: View,
  'history-recognition': TextGroup,
  'venue-store': CollapseTextGroup,
  'flexible-benefit-option': PackageTextGroup,
  'flexible-benefit-wallet-history': TextGroup,
  'wallet-history': TextGroup,
};

const CONTENT_TOUCHABLE = {
  'search-list': false,
  'share-user': false,
};

const CONTENT_TYPE_ITEM_STYLE = {
  'search-list': {
    margin: 0,
  },
  'history-recognition': {
    marginHorizontal: 18,
  },
};

const CONTENT_TYPE_GROUP_STYLE = {
  'history-recognition': {},
  'flexible-benefit-wallet-history': {
    marginVertical: 0,
  },
};

const CONTENT_TYPE_STYLE = {
  'history-recognition': {},
};

const CONTENT_TYPE_CHILD_STYLE = {
  'flexible-benefit-option': {
    marginTop: 16,
    marginLeft: -4.5,
  },
};

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

const renderGroup = (
  data,
  contentType,
  orientation,
  size,
  onItemPress,
  onChildItemPress,
  query,
) => {
  const dataKeys = Array.from(data.keys());
  return (
    data &&
    dataKeys.map((key, index) =>
      renderGroupItem(
        key,
        data.get(key),
        index,
        contentType,
        orientation,
        size,
        onItemPress,
        onChildItemPress,
        query,
      ),
    )
  );
};

const renderGroupItem = (
  key,
  item,
  index,
  contentType,
  orientation,
  size,
  onItemPress,
  onChildItemPress,
  query,
) => {
  let GroupControl = CONTENT_GROUP_TYPES[contentType];
  let touchable = onItemPress && CONTENT_TOUCHABLE[contentType] !== false;
  const orientationStyle = LAYOUT_ORIENTATIONS[orientation];
  const childStyle = CONTENT_TYPE_CHILD_STYLE[contentType];
  const isCollapse = Array.isArray(item) ? undefined : item.isCollapse;
  return (
    <View key={index}>
      <TouchableOpacity
        disabled={!touchable}
        onPress={() => onItemPress && onItemPress(key)}>
        <GroupControl
          style={{
            ...styles.listItem,
            ...CONTENT_TYPE_GROUP_STYLE[contentType],
          }}
          text={key}
          isSelected={isCollapse}
          onPress={child => onItemPress && onItemPress(key, index, child)}
          query={query}
        />
      </TouchableOpacity>
      {!isCollapse && (
        <View
          style={{
            ...orientationStyle,
            ...childStyle,
          }}>
          {renderChildren(
            Array.isArray(item) ? item : item.list,
            contentType,
            size,
            onChildItemPress,
            query,
          )}
        </View>
      )}
    </View>
  );
};

const renderChildren = (data, contentType, size, onItemPress, query) => {
  return (
    data &&
    data.map((item, index) =>
      renderListItem(item, index, contentType, size, onItemPress, query),
    )
  );
};

const renderListItem = (item, index, contentType, size, onItemPress, query) => {
  let ItemControl = CONTENT_TYPES[contentType];
  let touchable = onItemPress && CONTENT_TOUCHABLE[contentType] !== false;
  return (
    <TouchableOpacity
      key={index}
      disabled={!touchable}
      onPress={() => onItemPress && onItemPress(item, index)}>
      <ItemControl
        style={{
          ...styles.listItem,
          ...CONTENT_TYPE_ITEM_STYLE[contentType],
        }}
        index={index}
        {...item}
        size={size}
        onPress={child => onItemPress && onItemPress(item, index, child)}
        query={query}
      />
    </TouchableOpacity>
  );
};

const ListGroupContent = ({
  style,
  data,
  onItemPress,
  onChildItemPress,
  size = 'medium', // refer to RectangleListItem sizes
  contentType = 'default',
  orientation = 'grid',
  query = null,
  ...props
}) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...CONTENT_TYPE_STYLE[contentType],
        ...style,
      }}>
      {renderGroup(
        data,
        contentType,
        orientation,
        size,
        onItemPress,
        onChildItemPress,
        query,
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

export default ListGroupContent;
