import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import {TEXT_DARK_COLOR, LIGHT_COLOR} from '@resources/palette';
import Title from '../text/Title';
import {renderText} from '../StringHelper';
import Button from '../button/Button';
import {DESCRIPTION_RATING_SUCCESS} from '@resources/string/strings';

const RatingSuccessModal = ({
  style,
  ratingSuccess,
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
          <Image source={ratingSuccess.icon.source} style={styles.icon} />

          <Title size="medium-title" style={styles.description}>
            {DESCRIPTION_RATING_SUCCESS}
          </Title>

          <Button
            style={styles.button}
            buttonStyle={styles.buttonStyle}
            {...ratingSuccess.button}
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
  },
  titleSection: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
  },
  icon: {
    marginTop: 24,
    marginBottom: 24,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  description: {
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
    marginLeft: 24,
    marginRight: 24,
  },
  button: {
    marginTop: 32,
    marginBottom: 32,
  },
  buttonStyle: {
    minHeight: 32,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
});

export default RatingSuccessModal;
