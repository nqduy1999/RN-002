import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import TextContent from '../../text/TextContent';
import {
  LIGHT_COLOR,
  GRAY_COLOR,
  TEXT_GRAY_COLOR,
  LIGHT_ACCENT_COLOR,
  DISABLE_BACKGROUND_COLOR,
} from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

const {width} = Dimensions.get('window');

const RatingValueCriteriaItem = ({
  style,
  text = null,
  isSelected = undefined,
  ...props
}) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...(isSelected === true && styles.activeContainer),
        ...(isSelected === false && styles.inactiveContainer),
        ...style,
      }}>
      <TextContent
        style={{
          ...styles.text,
          ...(isSelected === true && styles.activeText),
          ...(isSelected === false && styles.inactiveText),
        }}
        weight={isSelected === true ? 'bold' : 'normal'}>
        {text}
      </TextContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: (width - 54) / 3,
    marginHorizontal: 4.5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: LIGHT_COLOR,
    borderColor: GRAY_COLOR,
    borderWidth: 0.75,
  },
  activeContainer: {
    backgroundColor: LIGHT_ACCENT_COLOR,
    borderColor: BuildVersion.palette.ACCENT_COLOR,
  },
  inactiveContainer: {
    backgroundColor: DISABLE_BACKGROUND_COLOR,
    borderColor: GRAY_COLOR,
  },
  text: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  activeText: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
  inactiveText: {},
});

export default RatingValueCriteriaItem;
