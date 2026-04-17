import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {GRAY_COLOR} from '@resources/palette';
import FieldInput from '@common/components/input/FieldInput';
import {
  SVG_ICON_SEARCH,
  SVG_SORT,
  SVG_SORT_IOS,
  CLOSE_GREY_BACKGROUND,
} from '@resources/images';
import {FIELD_SEARCH_REWARD_PLACEHOLDER} from '@resources/string/strings';
import Icon from '../icon/Icon';
import SortRewardBottomSheet from '../sort-reward-bottomsheet/SortRewardBottomSheet';
import BuildVersion, {IS} from '@resources/build_version/BuildVersion';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import {getSelectedRewardLocationIdsSelector} from '@redux/recognition/selectors';

const setting = BuildVersion.setting;
const SearchRewards = ({
  categoryList,
  searchRewards,
  clearSearchRewards,
  currentSearchRewardsQuery,
  bottomSheet,
  openSortRewards,
  currentSearchRewardSortOrder,
  currentSearchRewardSortBy,
  isFlexibleBenefits,
  navigation,
}) => {
  const [query, setQuery] = useState('');
  const selectedRewardLocationIds = useSelector(
    getSelectedRewardLocationIdsSelector,
  );

  const bottomSheetData = {
    ...bottomSheet,
    sortOrders: {
      ...bottomSheet.sortOrders,
      data: bottomSheet.sortOrders.data.map(s => {
        return {
          ...s,
          isSelected:
            s.sortBy === currentSearchRewardSortBy &&
            s.sortOrder === currentSearchRewardSortOrder,
        };
      }),
    },
  };

  const allCategory =
    categoryList &&
    categoryList.data &&
    categoryList.data.length > 0 &&
    categoryList.data[0];

  const handleSearchRewards = () => {
    isFlexibleBenefits
      ? searchRewards(query)
      : searchRewards(allCategory.id, query);
  };

  const handleClearSearchQuery = () => {
    setQuery('');
    if (currentSearchRewardsQuery) {
      isFlexibleBenefits
        ? clearSearchRewards()
        : clearSearchRewards(allCategory.id);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FieldInput
          style={styles.searchInput}
          placeholder={FIELD_SEARCH_REWARD_PLACEHOLDER}
          value={query}
          returnKeyType="search"
          onSubmitEditing={handleSearchRewards}
          iconLeft={{
            source: SVG_ICON_SEARCH,
            stroke: true,
            size: 24,
            color: GRAY_COLOR,
            onPress: () => handleSearchRewards,
            buttonColor: GRAY_COLOR,
          }}
          iconRight={
            query && {
              source: CLOSE_GREY_BACKGROUND,
              stroke: false,
              size: 24,
              color: GRAY_COLOR,
              onPress: handleClearSearchQuery,
            }
          }
          onChangeText={text => setQuery(text)}
        />
        <TouchableOpacity
          onPress={
            IS.PEPSI
              ? () => navigation.navigate('RewardFilterPage')
              : openSortRewards
          }>
          <Icon
            source={Platform.OS === 'ios' ? SVG_SORT_IOS : SVG_SORT}
            style={styles.sortBtn}
            buttonStyle={styles.iconButton}
            size={24}
            stroke={Platform.OS === 'ios' ? false : true}
            color={
              currentSearchRewardSortOrder !== 'Asc' ||
              currentSearchRewardSortBy !== setting.rewardSortBy ||
              selectedRewardLocationIds.length > 0
                ? !IS.PEPSI
                  ? BuildVersion.palette.ACCENT_COLOR
                  : BuildVersion.palette.SECONDARY_COLOR
                : GRAY_COLOR
            }
          />
        </TouchableOpacity>
      </View>
      <SortRewardBottomSheet {...bottomSheetData} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginVertical: 0,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 9,
  },
  sortBtn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withNavigation(SearchRewards);
