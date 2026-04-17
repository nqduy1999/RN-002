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
import {ERROR_COLOR} from '../../../resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';
const eveStyles = BuildVersion.styles || {};

const ErrorModal = ({
  style,
  title,
  icon,
  description,
  highlightWords = [],
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
            {icon && (
              <Icon
                size={48}
                style={styles.icon}
                color={ERROR_COLOR}
                {...icon}
              />
            )}
            <Title style={styles.title} size="medium-button">
              {title}
            </Title>
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
            textStyle={eveStyles.button}
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
    alignItems: 'center',
    marginTop: 0,
  },
  icon: {
    marginTop: 24,
  },
  title: {
    marginTop: 12,
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
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
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 30,
  },
  buttonStyle: {
    backgroundColor: ERROR_COLOR,
    minHeight: 32,
    justifyContent: 'center',
  },
});

export default ErrorModal;
