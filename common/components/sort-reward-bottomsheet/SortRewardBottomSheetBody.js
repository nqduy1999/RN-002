import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ListContent from '@common/components/list/ListContent';
import TransparentButton from '@common/components/button/TransparentButton';
import OutlineButton from '@common/components/button/OutlineButton';
import {TEXT_DARK_COLOR} from '@resources/palette';
import {GRAY_COLOR, LIGHT_COLOR} from '@resources/palette';
import {SVG_ICON_CHECK_NO_BORDER} from '@resources/images';
import BuildVersion from '@resources/build_version/BuildVersion';

const SortRewardBottomSheetBody = ({style, sortOrders}) => {
  return (
    <View style={[styles.container, style]}>
      <KeyboardAwareScrollView style={styles.scrollView}>
        <ListContent
          style={styles.timeList}
          {...sortOrders}
          contentType="text"
          orientation="vertical"
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 38,
  },
  scrollView: {
    width: '100%',
  },
  timeList: {},
  buttonAllMonths: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    flexDirection: 'row',
  },
  buttonAllMonthsTextActive: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
  buttonAllMonthsText: {
    color: TEXT_DARK_COLOR,
  },
  orderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
  buttonLeft: {
    marginEnd: 12,
  },
  buttonRight: {
    marginStart: 12,
  },
  orderActive: {
    borderColor: BuildVersion.palette.ACCENT_COLOR,
    borderWidth: 0.75,
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 4,
    minHeight: 0,
  },
  orderInactive: {
    borderColor: GRAY_COLOR,
    backgroundColor: LIGHT_COLOR,
    borderWidth: 0.75,
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 4,
    minHeight: 0,
  },
  textActive: {
    color: BuildVersion.palette.ACCENT_COLOR,
    textAlign: 'center',
  },
  textInactive: {
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
  },
});

export default SortRewardBottomSheetBody;
