import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

const SvgIcon = ({
  width,
  height,
  tintColor,
  style,
  buttonStyle,
  svgIcon,
  onPress,
}) => {
  let isButton = onPress !== null && onPress !== undefined;
  const Icon = svgIcon;
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={buttonStyle}
        disabled={!isButton}
        onPress={() => onPress && onPress()}>
        <Icon width={width} height={height} tintColor={tintColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default SvgIcon;
