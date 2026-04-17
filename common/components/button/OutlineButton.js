import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {LIGHT_COLOR} from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

const OutlineButton = ({
  style,
  buttonStyle,
  textStyle,
  text,
  textSize = 'medium-button',
  textWeight = 'bold',
  onPress,
  onLongPress,
  multipleText,
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
      onLongPress={onLongPress}
      multipleText={multipleText}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: BuildVersion.palette.ACCENT_COLOR,
    backgroundColor: LIGHT_COLOR,
    borderWidth: 1,
  },
  text: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
});

export default OutlineButton;
