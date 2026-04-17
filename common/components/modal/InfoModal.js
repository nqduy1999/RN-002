import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Icon from '../icon/Icon';
import {
  TEXT_GRAY_COLOR,
  TEXT_DARK_COLOR,
  LIGHT_COLOR,
} from '@resources/palette';
import Title from '../text/Title';
import {renderText} from '../StringHelper';
import Button from '../button/Button';
import HighlightTextContent from '../text/HighlightTextContent';
import BuildVersion from '@resources/build_version/BuildVersion';

const InfoModal = ({
  style,
  title,
  iconTitle,
  description,
  highlightWords,
  button,
  isVisible,
  onBackButtonPress,
  onBackdropPress,
}) => {
  let highlightWordsTranslatable = highlightWords.map(item => renderText(item));
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}>
        <View style={[styles.container, style]}>
          <View style={styles.titleSection}>
            <Icon {...iconTitle} color={BuildVersion.palette.ACCENT_COLOR} />
            <Title style={styles.title}>{title}</Title>
          </View>
          <HighlightTextContent
            style={styles.description}
            size="little-smaller"
            searchWords={highlightWordsTranslatable}
            highlightStyle={styles.descriptionHighlight}
            textToHighlight={renderText(description)}
          />
          <Button
            style={styles.button}
            buttonStyle={styles.buttonStyle}
            {...button}
          />
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
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    color: BuildVersion.palette.ACCENT_COLOR,
    marginStart: 8,
  },
  description: {
    marginTop: 12,
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  descriptionHighlight: {
    color: TEXT_DARK_COLOR,
  },
  button: {
    marginVertical: 32,
    marginHorizontal: 40,
  },
  buttonStyle: {
    backgroundColor: BuildVersion.palette.ACCENT_COLOR,
  },
});

export default InfoModal;
