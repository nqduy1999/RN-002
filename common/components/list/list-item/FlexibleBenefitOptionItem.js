import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextContent from '../../text/TextContent';
import {
  LIGHT_COLOR,
  GRAY_COLOR,
  TEXT_GRAY_COLOR,
  DISABLE_BACKGROUND_COLOR,
} from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

const FlexibleBenefitOptionItem = ({
  style,
  name = null,
  isSelected = false,
  ...props
}) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...(isSelected === true && styles.activeContainer),
        ...style,
      }}>
      <TextContent
        style={{
          ...styles.text,
          ...(isSelected === true && styles.activeText),
          ...(isSelected === false && styles.inactiveText),
        }}
        size="little-smaller">
        {name}
      </TextContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4.5,
    marginVertical: 4,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: LIGHT_COLOR,
    borderColor: GRAY_COLOR,
    borderWidth: 0.5,
  },
  activeContainer: {
    borderColor: BuildVersion.palette.ACCENT_COLOR,
  },
  inactiveContainer: {
    backgroundColor: DISABLE_BACKGROUND_COLOR,
    borderColor: GRAY_COLOR,
  },
  text: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
    lineHeight: 18,
    textAlignVertical: 'center',
  },
  activeText: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
  inactiveText: {},
});

export default FlexibleBenefitOptionItem;
