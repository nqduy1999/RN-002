import React, { Fragment, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import Icon from '../icon/Icon';
import {
  TEXT_GRAY_COLOR,
  TEXT_DARK_COLOR,
  LIGHT_COLOR,
} from '@resources/palette';
import Title from '../text/Title';
import { renderText } from '../StringHelper';
import Button from '../button/Button';
import HighlightTextContent from '../text/HighlightTextContent';
import TextContent from '../text/TextContent';
import { FLEXA } from '@resources/images';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';

const eveStyles = BuildVersion.styles || {};

const SuccessModal = ({
  style,
  title,
  icon,
  description,
  // descriptionExpiredAt,
  highlightWords = [],
  button,
  buttonNominateNow,
  isVisible,
  isSendRecog,
  onBackButtonPress,
  onBackdropPress,
}) => {

  const [showMsg, setShowMsg] = useState(false);

  let isFlexA = false;
  let contentFistFlexA = [];
  // let highlightContentFist = [];
  // let point = '';

  let highlightWordsTranslatable = highlightWords.map(item => renderText(item));

  if (highlightWordsTranslatable.length > 0) {
    isFlexA = highlightWordsTranslatable[0].indexOf('FlexA') > 1;
    if (isFlexA) {
      contentFistFlexA = description.split('FlexA');
      // highlightContentFist = highlightWordsTranslatable[0].split('FlexA');
      // point = highlightWordsTranslatable[0].replace('FlexA', '');
    }
  }

  let contentMsg, actionButton;

  if (showMsg) {
    contentMsg = (
      <Fragment>
        <Text style={styles.showMsgTxt}>
          {I18n.t('sendRecogSuccessMsg')}
        </Text>
        {IS.NESTLE &&
          <Text style={styles.showMsgTxt}>
            {I18n.t('makeNominationSugguestMsg')}
          </Text>
        }
      </Fragment>
    )
  } else {
    if (isFlexA) {
      contentMsg = (
        <View>
          <View style={styles.viewFlexA}>
            <TextContent size="little-smaller" style={styles.description}>
              {contentFistFlexA[0]}
            </TextContent>
            <Image
              source={FLEXA}
              style={styles.imageRewardCoinDescriptionAIA}
            />
            {!!contentFistFlexA[1] &&
              <TextContent size="little-smaller" style={styles.description}>
                {contentFistFlexA[1]}
              </TextContent>
            }
          </View>
        </View>
      )
    } else {
      contentMsg = (
        <HighlightTextContent
          style={styles.description}
          size="little-smaller"
          searchWords={highlightWordsTranslatable}
          highlightStyle={styles.descriptionHighlight}
          textToHighlight={renderText(description)}
        />
      )
    }
  }

  if (IS.NESTLE && showMsg) {
    actionButton = (
      <View style={{ flexDirection: 'row' }}>
        <Button
          style={[styles.dualButton, { marginRight: 10 }]}
          buttonStyle={{ minHeight: 32, backgroundColor: 'transparent' }}
          textStyle={{ fontWeight: 'normal', color: '#7B7B7B' }}
          {...button}
          gradient={false}
        />
        <Button
          style={[styles.dualButton, { marginLeft: 10 }]}
          buttonStyle={{ minHeight: 32, backgroundColor: '#00AFAA' }}
          textStyle={eveStyles.button}
          {...buttonNominateNow}
        />
      </View>
    )
  } else {
    actionButton = (
      <Button
        style={styles.button}
        buttonStyle={{
          ...styles.buttonStyle,
          ...(IS.NESTLE && {
            backgroundColor: '#00AFAA',
          })
        }}
        textStyle={eveStyles.button}
        {...button}
        {...(isSendRecog && IS.NESTLE && !showMsg && {
          onPress: () => setShowMsg(true),
        })}
      />
    )
  }

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}>
        <View style={[styles.container, style]}>

          <View style={styles.titleSection}>

            {icon && <Icon {...icon} size={48} style={styles.icon} />}

            <Title style={styles.title} size="medium-button">
              {showMsg ? I18n.t('sendRecogSuccessTitle') : title}
            </Title>

          </View>

          {contentMsg}
          {actionButton}

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
    alignItems: 'flex-end',
  },
  description: {
    marginTop: 12,
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  descriptionExpireAt: {
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
    backgroundColor: BuildVersion.palette.ACCENT_COLOR,
    minHeight: 32,
    justifyContent: 'center',
  },
  imageRewardCoinAIA: {
    resizeMode: 'contain',
    width: 40,
    height: 14,
    marginTop: 14,
    alignSelf: 'center',
  },
  imageRewardCoinDescriptionAIA: {
    resizeMode: 'contain',
    width: 34,
    height: 12,
    marginTop: 14,
    alignSelf: 'center',
  },
  viewFlexA: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  showMsgTxt: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
    color: '#7B7B7B',
  },
  dualButton: {
    flex: 1,
    marginTop: 16,
    marginBottom: 32,
  },
});

export default SuccessModal;