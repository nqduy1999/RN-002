import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from '../icon/Icon';
import { TEXT_DARK_COLOR, LIGHT_COLOR } from '@resources/palette';
import { SVG_ICON_CHECK_NO_BORDER } from '@resources/images';
import Title from '../text/Title';
import TextContent from '../text/TextContent';
import BuildVersion from '@resources/build_version/BuildVersion';

const renderOptions = (options, onItemPress) => {
  return options.map((option, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.optionsItem}
        onPress={() => onItemPress(option)}>
        <View style={styles.optionsItemWrapper}>
          <TextContent
            style={
              option.isSelected
                ? styles.optionTextSelected
                : styles.optionTextUnselected
            }
            size="medium-subtitle"
            weight={option.isSelected ? 'bold' : 'normal'}>
            {option.text}
          </TextContent>
          {option.isSelected && (
            <Icon
              source={SVG_ICON_CHECK_NO_BORDER}
              size={16}
              color={BuildVersion.palette.ACCENT_COLOR}
              stroke={true}
              style={styles.icon}
            />
          )}
          <Icon color />
        </View>
      </TouchableOpacity>
    );
  });
};

const OptionsModal = ({
  style,
  title,
  options,
  isVisible,
  onBackButtonPress,
  onBackdropPress,
  onItemPress,
}) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}>
        <View style={[styles.container, style]}>
          <View style={styles.titleSection}>
            <Title style={styles.title}>{title}</Title>
          </View>
          <View style={styles.optionsSection}>
            {renderOptions(options, onItemPress)}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    color: TEXT_DARK_COLOR,
    marginBottom: 12,
  },
  optionsSection: {
    marginHorizontal: 16,
    width: '100%',
  },
  optionsItem: {},
  optionsItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  optionTextSelected: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
  optionTextUnselected: {
    color: TEXT_DARK_COLOR,
  },
  icon: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
});

export default OptionsModal;
