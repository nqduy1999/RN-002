import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from '../icon/Icon';
import {
  TEXT_GRAY_COLOR,
  LIGHT_COLOR,
  TEXT_DARK_COLOR,
} from '@resources/palette';
import Title from '../text/Title';
import { renderText } from '../StringHelper';
import Button from '../button/Button';
import TransparentButton from '../button/TransparentButton';
import HighlightTextContent from '../text/HighlightTextContent';
import TextContent from '../text/TextContent';
import { FLEXA } from '@resources/images';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
const eveStyles = BuildVersion.styles || {};

const renderTitleSection = ({ iconPosition, icon, title, titleStyle }) => {
  if (iconPosition === 'title') {
    return (
      <View style={styles.titleSectionTitle}>
        <Icon color={BuildVersion.palette.ACCENT_COLOR} {...icon} />
        <Title style={{ ...styles.title, ...titleStyle }}>{title}</Title>
      </View>
    );
  } else if (iconPosition === 'top') {
    return (
      <View style={styles.titleSectionTop}>
        <Icon color={BuildVersion.palette.ACCENT_COLOR} {...icon} />
        <Title style={{ ...styles.titleTop, ...titleStyle }}>{title}</Title>
      </View>
    );
  }
};
const YesNoModal = ({
  style,
  title,
  titleStyle,
  icon,
  iconPosition = 'title',
  description,
  highlightWords,
  yesButton,
  noButton,
  isVisible,
  onBackButtonPress,
  onBackdropPress,
  highlightStyle,
  onCancelPres,
  onConfirmPress,
}) => {
  var isFlexA = false;
  var contentFistFlexA = [];
  var highlightContentFist = [];
  var point = '';

  let highlightWordsTranslatable = highlightWords.map(item => renderText(item));

  if (highlightWordsTranslatable.length > 0) {
    isFlexA = highlightWordsTranslatable[0].indexOf('FlexA') > 1;
    if (isFlexA) {
      contentFistFlexA = description.split('FlexA');
      highlightContentFist = highlightWordsTranslatable[0].split('FlexA');
      point = highlightWordsTranslatable[0].replace('FlexA', '');
    }
  }
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}>
        <View style={[styles.container, style]}>
          {renderTitleSection({ iconPosition, icon, title, titleStyle })}
          {isFlexA ? (
            <View>
              <TextContent
                size="little-smaller"
                style={styles.descriptionTextFlexA}>
                <HighlightTextContent
                  style={styles.description}
                  size="little-smaller"
                  searchWords={[highlightContentFist[0]]}
                  highlightStyle={{
                    ...styles.descriptionHighlight,
                    ...highlightStyle,
                  }}
                  textToHighlight={contentFistFlexA[0]}
                />
                <Image source={FLEXA} style={styles.imageRewardCoinAIA} />
                {highlightContentFist[1] === '' ? (
                  <TextContent
                    size="little-smaller"
                    style={styles.descriptionFlexA}>
                    {contentFistFlexA[1]}
                  </TextContent>
                ) : (
                  <HighlightTextContent
                    style={styles.description}
                    size="little-smaller"
                    searchWords={[contentFistFlexA[1]]}
                    highlightStyle={{
                      ...styles.descriptionHighlight,
                      ...highlightStyle,
                    }}
                    textToHighlight={contentFistFlexA[1]}
                  />
                )}
              </TextContent>
            </View>
          ) : (
            <HighlightTextContent
              style={styles.description}
              size="little-smaller"
              searchWords={highlightWordsTranslatable}
              highlightStyle={{
                ...styles.descriptionHighlight,
                ...highlightStyle,
              }}
              textToHighlight={renderText(description)}
            />
          )}
          <View style={styles.buttonWrapper}>
            <TransparentButton
              style={styles.button}
              textStyle={{
                ...styles.textStyle,
                ...styles.noButtonText,
                ...(IS.NESTLE && {
                  fontWeight: 'normal',
                })
              }}
              buttonStyle={styles.buttonStyle}
              {...noButton}
              onPress={noButton?.onPress || onCancelPres}
            />
            <Button
              style={styles.button}
              buttonStyle={{
                ...styles.buttonStyle,
                ...(IS.NESTLE && {
                  backgroundColor: '#00AFAA',
                })
              }}
              textStyle={{ ...styles.textStyle, ...eveStyles.button }}
              {...yesButton}
              onPress={yesButton?.onPress || onConfirmPress}
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
  titleSectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  titleSectionTop: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 11,
  },
  title: {
    color: BuildVersion.palette.ACCENT_COLOR,
    marginStart: 8,
  },
  titleTop: {
    color: BuildVersion.palette.ACCENT_COLOR,
    marginTop: 8,
  },
  description: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
    alignItems: 'baseline',
  },
  descriptionHighlight: {
    color: !IS.PEPSI ? TEXT_DARK_COLOR : '#0066D3',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginTop: 16,
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
  imageRewardCoinAIA: {
    resizeMode: 'contain',
    width: 36,
    height: 12,
  },
  containerViewTextFlexA: {
    flexDirection: 'row',
  },
  descriptionTextFlexA: {
    color: TEXT_GRAY_COLOR,
    alignItems: 'center',
    textAlign: 'center',
  },
  descriptionFlexA: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
    alignItems: 'baseline',
  },
});

export default YesNoModal;
