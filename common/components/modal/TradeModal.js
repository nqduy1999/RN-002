import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import {
  TEXT_GRAY_COLOR,
  TEXT_DARK_COLOR,
  LIGHT_COLOR,
} from '@resources/palette';
import Title from '../text/Title';
import Button from '../button/Button';
import TransparentButton from '../button/TransparentButton';
import TextContent from '../text/TextContent';
import TextCurrency from '../text/TextCurrency';
import Slider from '../slider/Slider';
import HorizontalLinearGradient from '../gradient/HorizontalLinearGradient';
import { GRAY_COLOR, TRACK_MAX_COLOR, TEXT_LIGHT_COLOR } from '../../../resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

const TradeModal = ({
  style,
  title,
  description,
  money = 0,
  yesButton,
  noButton,
  sliderPoint,
  isVisible,
  onBackButtonPress,
  onBackdropPress,
}) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}>
        <View style={[styles.container, style]}>
          <View style={styles.titleSection}>
            <Title style={styles.title} size="medium-button">
              {title}
            </Title>
          </View>
          <TextCurrency
            style={{ marginTop: 20 }}
            isShowIcon={false}
            value={money}
          />
          <View style={styles.sliderTack}>
            <TextContent style={styles.tackMin} size="large" weight="bold">
              {sliderPoint.minimumValue}
            </TextContent>
            <TextContent style={styles.tackMax} size="large" weight="bold">
              {sliderPoint.maximumValue}
            </TextContent>
          </View>
          <Slider
            style={styles.slider}
            {...sliderPoint}
            customMinimumTrack={
              <HorizontalLinearGradient style={styles.track} />
            }
            maximumTrackTintColor={TRACK_MAX_COLOR}
            thumbStyle={styles.thumb}
          />
          <TextContent style={styles.description}>{description}</TextContent>
          <View style={styles.buttonWrapper}>
            <TransparentButton
              style={styles.button}
              textStyle={{ ...styles.textStyle, ...styles.noButtonText }}
              buttonStyle={styles.buttonStyle}
              {...noButton}
            />
            <Button
              style={styles.button}
              buttonStyle={[styles.buttonStyle, money === 0 && styles.buttonDisabled]}
              textStyle={styles.textStyle}
              gradient={true}
              disabled={money === 0}
              {...yesButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const windows = Dimensions.get('window');

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
    marginTop: 20,
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
    alignItems: 'flex-end',
  },
  description: {
    marginTop: 12,
    color: TEXT_LIGHT_COLOR,
    textAlign: 'center',
  },
  descriptionExpireAt: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  descriptionHighlight: {
    color: TEXT_DARK_COLOR,
  },
  buttonWrapper: {
    marginTop: 16,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonStyle: {
    minHeight: 32,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: GRAY_COLOR,
  },
  textStyle: {
    textAlignVertical: 'center',
  },
  noButtonText: {
    color: TEXT_GRAY_COLOR,
  },
  track: {
    width: '100%',
    height: 5,
    borderRadius: 5,
  },
  thumb: {
    width: 17,
    height: 17,
    borderRadius: 17 / 2,
    backgroundColor: LIGHT_COLOR,
    borderColor: BuildVersion.palette.ACCENT_COLOR,
    borderWidth: 3,
  },
  slider: {
    width: '100%',
  },
  sliderTack: {
    marginTop: 5,
    width: '100%',
  },
  tackMin: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    textAlign: 'left',
    color: GRAY_COLOR,
  },
  tackMax: {
    position: 'absolute',
    bottom: -15,
    right: 0,
    textAlign: 'right',
    color: GRAY_COLOR,
  },
});

export default TradeModal;
