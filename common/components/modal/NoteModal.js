import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Icon from '../icon/Icon';
import {TEXT_GRAY_COLOR, LIGHT_COLOR} from '@resources/palette';
import {
  MODAL_TITLE_NOTE,
  DESCRIPTION_NOTE_MODAL,
} from '@resources/string/strings';
import TextContent from '@common/components/text/TextContent';
import Title from '../text/Title';
import Button from '../button/Button';
import TransparentButton from '../button/TransparentButton';
import BuildVersion from '@resources/build_version/BuildVersion';
const eveStyles = BuildVersion.styles || {};

const NoteModal = ({
  titleStyle,
  yesButton,
  noButton,
  isVisible,
  onBackButtonPress,
  onBackdropPress,
}) => {
  const icon = {
    name: 'Information',
    type: 'Line',
    size: 30,
  };

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}>
        <View style={[styles.container]}>
          <View style={styles.titleSectionTop}>
            <Icon color={BuildVersion.palette.ACCENT_COLOR} {...icon} />
            <Title style={{...styles.titleTop, ...titleStyle}}>
              {MODAL_TITLE_NOTE}
            </Title>
          </View>
          <View>
            <TextContent style={styles.description}>
              {DESCRIPTION_NOTE_MODAL}
            </TextContent>
          </View>
          <View style={styles.buttonWrapper}>
            <TransparentButton
              style={styles.button}
              textStyle={{...styles.textStyle, ...styles.noButtonText}}
              buttonStyle={styles.buttonStyle}
              {...noButton}
            />
            <Button
              style={styles.button}
              buttonStyle={styles.buttonStyle}
              textStyle={{...styles.textStyle, ...eveStyles.button}}
              {...yesButton}
            />
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
    paddingHorizontal: 30,
  },
  titleSectionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  titleTop: {
    color: BuildVersion.palette.ACCENT_COLOR,
    marginLeft: 8,
  },
  description: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
    alignItems: 'baseline',
    marginTop: 16,
  },
  buttonWrapper: {
    marginTop: 32,
    marginBottom: 32,
    marginHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 130,
    marginHorizontal: 10,
  },
  buttonStyle: {
    minHeight: 32,
    justifyContent: 'center',
  },
  textStyle: {
    textAlignVertical: 'center',
  },
  noButtonText: {
    color: TEXT_GRAY_COLOR,
  },
});

export default NoteModal;
