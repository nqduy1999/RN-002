import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GRAY_COLOR, TEXT_DARK_COLOR, DARK_GRAY_COLOR} from '@resources/palette';
import Icon from '@common/components/icon/Icon';
import Title from '@common/components/text/Title';
import TransparentButton from '@common/components/button/TransparentButton';
import BuildVersion from '@resources/build_version/BuildVersion';
const eveStyles = BuildVersion.styles || {};

const SortRewardBottomSheetHeader = ({style, title, iconLeft, buttonRight}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      <View style={styles.titleSection}>
        <View style={styles.mid}>
          <Title size="large-title" style={styles.title}>
            {title}
          </Title>
        </View>
        <View style={styles.left}>
          <Icon
            {...iconLeft}
            buttonStyle={styles.icon}
            buttonColor={GRAY_COLOR}
            size={24}
            stroke={true}
          />
        </View>
        <View style={styles.right}>
          <TransparentButton
            {...buttonRight}
            buttonStyle={styles.button}
            textWeight="normal"
            textStyle={eveStyles.reset}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: 'center',
  },
  line: {
    backgroundColor: DARK_GRAY_COLOR,
    borderRadius: 3,
    width: 60,
    height: 6,
  },
  titleSection: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    paddingStart: 20,
  },
  icon: {
    width: 60,
    height: 32,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  mid: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  button: {
    marginEnd: 0,
    paddingHorizontal: 38,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
});

export default SortRewardBottomSheetHeader;
