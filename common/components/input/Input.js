import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {
  LIGHT_COLOR,
  TEXT_LIGHT_COLOR,
  ERROR_COLOR,
  GRAY_COLOR,
  TEXT_DARK_COLOR,
} from '@resources/palette';
import TextContent from '../text/TextContent';
import Icon from '../icon/Icon';
import { renderText } from '../StringHelper';
import { SVG_ICON_CLOSE } from '@resources/images';
import BuildVersion from '@resources/build_version/BuildVersion';

export const FONT_SIZES = {
  regular: 12,
  large: 16,
};

// export const FONT_FAMILIES = {
//     'title': 'Hirakakupro_W6',
//     'content': 'OpenSans_Regular',
//     'content-bold': 'OpenSans_Bold'
// }
const errorIcon = {
  source: SVG_ICON_CLOSE,
  size: 12,
  buttonColor: ERROR_COLOR,
  stroke: true,
};
const Input = ({
  label,
  labelStyle,
  labelTextSize = 'little-smaller',
  labelNotHasValueStyle,
  labelHasValueStyle,
  size = 'large',
  // fontFamily = 'content',
  style,
  inputStyle,
  iconLeft,
  iconRight,
  errorMessage,
  errorMessageStyle,
  errorEnabled,
  showingErrorIcon = true,
  textValue,
  isShowingLabel = true, //showing label or not (Still have space)
  forceNoSpaceForLabel = false, //remove space for label
  isActive = false,
  hasValue = false,
  disableInputStyle,
  placeholderErrorColor = null,
  inputRef,
  isErrorLabel,
  forcusBorderColor,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {!forceNoSpaceForLabel && (
        <TextContent
          style={[
            { ...styles.label, ...(isErrorLabel && styles.labelError) },
            labelStyle,
            hasValue ? labelHasValueStyle : labelNotHasValueStyle,
          ]}
          size={labelTextSize}
        >
          {isShowingLabel && label}
        </TextContent>
      )}
      <TouchableOpacity
        disabled={props.editable !== false}
        onPress={() => props.onPress && props.onPress()}>
        <TextInput
          {...props}
          ref={inputRef}
          keyboardType={props.keyboardType}
          autoCompleteType={props.autoCompleteType}
          onTouchStart={() => props.onPress && props.onPress()}
          placeholder={props.placeholder && renderText(props.placeholder)}
          value={props.value || textValue}
          placeholderTextColor={
            errorMessage || errorEnabled
              ? placeholderErrorColor || TEXT_LIGHT_COLOR
              : TEXT_LIGHT_COLOR
          }
          style={[
            styles.textInput,
            inputStyle,
            isActive && styles.textInputActive,
            (errorMessage || errorEnabled) && styles.textInputInvalid,
            size && { fontSize: FONT_SIZES[size] },
            // fontFamily && { fontFamily: FONT_FAMILIES[fontFamily] },
            iconLeft && styles.textInputWithIconLeft,
            (iconRight ||
              (showingErrorIcon && (errorMessage || errorEnabled))) &&
            styles.textInputWithIconRight,
            props.editable === false && disableInputStyle,
            {
              ...(forcusBorderColor && isActive && { borderColor: forcusBorderColor }),
            },
          ]}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        {iconLeft ? (
          <Icon
            style={styles.iconLeft}
            color={TEXT_DARK_COLOR}
            {...iconLeft}
            buttonStyle={styles.iconButton}
          />
        ) : null}
        {showingErrorIcon && (errorMessage || errorEnabled) ? (
          <Icon
            style={styles.iconRight}
            color={ERROR_COLOR}
            buttonStyle={styles.iconButton}
            {...errorIcon}
            onPress={() => {
              props.onChangeText('');
            }}
          />
        ) : iconRight ? (
          <Icon
            style={styles.iconRight}
            color={TEXT_DARK_COLOR}
            {...iconRight}
            buttonStyle={styles.iconButton}
          />
        ) : null}
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
  },
  label: {
    minHeight: 21,
    paddingHorizontal: 12,
    color: TEXT_LIGHT_COLOR,
  },
  labelError: {
    color: ERROR_COLOR,
    paddingBottom: 4,
  },
  textInput: {
    fontSize: FONT_SIZES.regular,
    color: TEXT_DARK_COLOR,
    // backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GRAY_COLOR,
    width: '100%',
    height: 48,
    paddingHorizontal: 12,
  },
  textInputActive: {
    borderColor: BuildVersion.palette.ACCENT_COLOR,
  },
  textInputInvalid: {
    borderColor: ERROR_COLOR,
    borderWidth: 1,
  },
  textInputWithIconLeft: {
    paddingLeft: 48,
  },
  textInputWithIconRight: {
    paddingRight: 48,
  },
  iconLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    marginTop: 5,
    alignSelf: 'center',
  },
});

export default Input;
