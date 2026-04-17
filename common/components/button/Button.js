import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LIGHT_COLOR, GRAY_COLOR } from '@resources/palette';
import Icon from '../icon/Icon';
import TextContent from '../text/TextContent';
import HorizontalLinearGradient from '../gradient/HorizontalLinearGradient';
import SvgIcon from '../icon/SvgIcon';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';

const renderIcon = (icon, iconStyle, IsButtonIcon) => {
  if (icon) {
    if (icon.svgIcon) {
      return (
        <SvgIcon
          style={IsButtonIcon ? null : { ...styles.icon, ...iconStyle }}
          {...icon}
        />
      );
    }
    return (
      <Icon
        style={IsButtonIcon ? null : { ...styles.icon, ...iconStyle }}
        {...icon}
      />
    );
  } else {
    return null;
  }
};

const Button = ({
  style,
  gradient = false,
  buttonStyle,
  textStyle,
  text,
  multipleText,
  textSize = 'medium-button',
  textWeight = 'bold',
  onPress,
  onLongPress,
  icon,
  iconStyle,
  disabled = false,
}) => {
  const ButtonContainer = gradient && !disabled && !IS.PEPSI && !IS.NESTLE ? HorizontalLinearGradient : View;
  const IsButtonIcon = !text && icon;
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        disabled={disabled}
        onLongPress={() => !disabled && onLongPress && onLongPress()}
        onPress={() => !disabled && onPress && onPress()}>
        <ButtonContainer
          style={[
            styles.button,
            (IS.PEPSI || IS.NESTLE) && styles.accentButton,
            buttonStyle,
          ]}>
          {!IsButtonIcon && (
            <TextContent
              style={[styles.text, textStyle]}
              size={textSize}
              weight={textWeight}>
              {multipleText
                ? multipleText.map((item, index) => (
                    <TextContent key={index} style={item.style}>
                      {item.text}
                    </TextContent>
                  ))
                : text}
            </TextContent>
          )}
          {renderIcon(icon, iconStyle, IsButtonIcon)}
        </ButtonContainer>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: GRAY_COLOR,
    borderRadius: 30,
    minHeight: 50,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: LIGHT_COLOR,
  },
  icon: {
    marginLeft: 5,
  },
  accentButton: {
    backgroundColor: BuildVersion.palette.ACCENT_COLOR,
  },
});

export default Button;
