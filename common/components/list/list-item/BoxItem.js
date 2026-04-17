import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextContent from '../../text/TextContent';
import Dimensions from '@resources/dimensions';
import { TEXT_DARK_COLOR } from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';
import { toRgbA } from '@utils/StyleUtils';

const { ACCENT_COLOR } = BuildVersion.palette;
const { screenWidth } = Dimensions;

const BoxItem = ({ index, style, text = null, isSelected = undefined, ...props }) => {
  return (
    <View {...props} style={{
      backgroundColor: isSelected ? toRgbA(ACCENT_COLOR, 0.2) : '#EFEFEF',
      marginRight: (index + 1) % 3 ? 10 : 0,
      ...styles.container,
      ...style,
    }}>
      <TextContent
        numberOfLines={1}
        style={{
          ...styles.text,
          ...(isSelected && styles.activeText),
        }}
        size="medium-subtitle"
        weight={isSelected === true ? 'bold' : 'normal'}>
        {text}
      </TextContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (screenWidth - 40 - 20) / 3,
    height: 36,
    marginTop: 10,
    paddingHorizontal: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: TEXT_DARK_COLOR,
  },
  activeText: {
    color: ACCENT_COLOR,
  },
});

export default BoxItem;
