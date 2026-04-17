import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import BuildVersion from '@resources/build_version/BuildVersion';

const TransparentButton = ({
  style,
  buttonStyle,
  textStyle,
  text,
  textSize = 'medium-button',
  textWeight = 'bold',
  multipleText,
  onPress,
  ...props
}) => {
  return (
    <Button
      {...props}
      style={style}
      buttonStyle={{
        ...styles.button,
        ...buttonStyle,
      }}
      textStyle={{
        ...styles.text,
        ...textStyle,
      }}
      text={text}
      textSize={textSize}
      textWeight={textWeight}
      onPress={onPress}
      multipleText={multipleText}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
  },
  text: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
});

export default TransparentButton;
