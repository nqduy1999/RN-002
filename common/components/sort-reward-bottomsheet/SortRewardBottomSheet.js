import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {WHITE_MILK_COLOR, SHADOW_COLOR} from '@resources/palette';
import SortRewardBottomSheetHeader from './SortRewardBottomSheetHeader';
import SortRewardBottomSheetBody from './SortRewardBottomSheetBody';
import SortRewardBottomSheetFooter from './SortRewardBottomSheetFooter';
import {IS} from '@resources/build_version/BuildVersion';

const height = Dimensions.get('window').height;

const SortRewardBottomSheet = ({
  rbRef,
  title,
  iconLeft,
  buttonRight,
  buttonAllMonths,
  sortOrders,
  applyButton,
  order,
}) => {
  return (
    <RBSheet
      ref={rbRef}
      height={!IS.PEPSI ? (height * 2) / 3 : 260}
      duration={250}
      customStyles={{
        container: styles.container,
      }}
    >
      <SortRewardBottomSheetHeader
        title={title}
        iconLeft={iconLeft}
        buttonRight={buttonRight}
      />
      <SortRewardBottomSheetBody
        style={styles.body}
        sortOrders={sortOrders}
        buttonAllMonths={buttonAllMonths}
        order={order}
      />
      <SortRewardBottomSheetFooter applyButton={applyButton} />
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: WHITE_MILK_COLOR,
    elevation: 1,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  body: {
    flex: 1,
  },
});

export default SortRewardBottomSheet;
