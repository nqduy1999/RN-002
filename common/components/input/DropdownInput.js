import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ERROR_COLOR,
  TEXT_LIGHT_COLOR,
  TEXT_DARK_COLOR,
  LIGHT_COLOR,
  GRAY_COLOR,
} from '@resources/palette';
import ModalDropdown from 'react-native-modal-dropdown';
import TextContent from '../text/TextContent';
import TextError from '../text/TextError';
import Icon from '../icon/Icon';
import {renderText} from '../StringHelper';
import BuildVersion from '@resources/build_version/BuildVersion';

export const FONT_SIZES = {
  regular: 12,
  large: 16,
};

const DropdownInput = ({
  label,
  size = 'large',
  // fontFamily = 'content',
  style,
  icon,
  errorMessage,
  errorEnabled,
  isShowingLabel = true,
  isActive = false,
  show,
  dropdownRef,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextContent
        style={styles.label}
        size="little-smaller"
        // fontFamily='content'
      >
        {isShowingLabel && label}
      </TextContent>

      <View>
        <ModalDropdown
          {...props}
          ref={dropdownRef}
          style={[
            styles.dropdownInput,
            isActive && styles.dropdownInputActive,
            (errorMessage || errorEnabled) && styles.dropdownInputInvalid,
          ]}
          textStyle={[
            styles.dropdownTextInput,
            size && {fontSize: FONT_SIZES[size]},
            // fontFamily && { fontFamily: FONT_FAMILIES[fontFamily] },
            icon && styles.dropdownInputWithIcon,
          ]}
          dropdownStyle={[styles.dropdownOption]}
          dropdownTextStyle={[styles.dropdownOptionText]}
          placeholder={props.placeholder && renderText(props.placeholder)}
          defaultValue={
            props.placeholder === props.defaultValue
              ? renderText(props.defaultValue)
              : props.defaultValue
          }
        />
        {icon ? (
          <Icon
            style={styles.icon}
            {...icon}
            color={TEXT_DARK_COLOR}
            onPress={show}
          />
        ) : null}
        <TextError style={styles.errorMessage} errorMessage={errorMessage} />
      </View>
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
  dropdownInput: {
    color: TEXT_DARK_COLOR,
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GRAY_COLOR,
    width: '100%',
    height: 48,
    justifyContent: 'center',
  },
  dropdownInputActive: {
    borderColor: BuildVersion.palette.ACCENT_COLOR,
  },
  dropdownInputInvalid: {
    borderColor: ERROR_COLOR,
    borderWidth: 1,
  },
  dropdownInputWithIcon: {
    paddingRight: 48,
  },
  dropdownTextInput: {
    fontSize: FONT_SIZES.large,
    lineHeight: 48,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 12,
  },
  dropdownOption: {
    width: '77%',
  },
  dropdownOptionText: {
    fontSize: FONT_SIZES.large,
    paddingHorizontal: 12,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
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

export default DropdownInput;
