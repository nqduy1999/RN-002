import React from 'react';
import {View, StyleSheet, Image, Platform, Animated} from 'react-native';
import Modal from 'react-native-modal';
import {
  TEXT_GRAY_COLOR,
  TEXT_DARK_COLOR,
  LIGHT_COLOR,
} from '@resources/palette';
import {
  TITLE_RATING,
  DESCRIPTION_RATING,
  QUESTION_RATING,
  SUBTITLE_RATING,
  RATING_ANSWER_PLACEHOLDER,
  DESCRIPTION_RATING_SUCCESS,
} from '@resources/string/strings';
import Icon from '../icon/Icon';
import OutlineButton from '@common/components/button/OutlineButton';
import Title from '../text/Title';
import Button from '../button/Button';
import TextContent from '../text/TextContent';
import {LIGHT_GRAY_COLOR, GRAY_COLOR} from '../../../resources/palette';
import FieldValueInput from '@common/components/input/FieldValueInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BuildVersion, {IS} from '@resources/build_version/BuildVersion';

const AnimatedScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView,
);

const renderChildrenRating = (data, isSelected, ratingPoint) => {
  return (
    data &&
    data.map((item, index) =>
      renderListItemRating(item, index, ratingPoint, isSelected),
    )
  );
};

const renderListItemRating = (item, index, ratingPoint, isSelected) => {
  return (
    <OutlineButton
      onPress={() => {
        item.onItemPress && item.onItemPress(item, index + 1);
      }}
      textSize="medium-subtitle"
      text={index + 1}
      style={[styles.buttonRating, styles.buttonRatingLeft]}
      buttonStyle={
        isSelected
          ? ratingPoint === index + 1
            ? styles.orderActive
            : styles.orderInactive
          : styles.order
      }
      textStyle={
        isSelected
          ? ratingPoint === index + 1
            ? styles.textRatingActive
            : styles.textRatingInactive
          : styles.textRating
      }
    />
  );
};

const RatingModal = ({style, rating, isVisible}) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={
          rating.isRating
            ? rating.onBackButtonPress
            : rating.onBackButtonSuccessPress
        }
        onBackdropPress={
          rating.isRating
            ? rating.onBackdropPress
            : rating.onBackdropSuccessPress
        }>
        {rating.isRating && (
          <View
            style={[
              rating.isSelected ? styles.containerIsSelected : styles.container,
              style,
            ]}
            onLayout={e => {}}>
            <AnimatedScrollView
              keyboardShouldPersistTaps="handled"
              enableOnAndroid
              extraHeight={Platform.OS === 'android' ? 150 : 150}
              contentContainerStyle={{flexGrow: 1}}
              scrollEventThrottle={16}>
              <View style={styles.titleSection}>
                <Title style={styles.title} size="medium-button">
                  {TITLE_RATING}
                </Title>
                <Icon
                  {...rating.iconClose}
                  size={14}
                  style={styles.iconClose}
                />
              </View>

              <View style={styles.line} />

              <Image source={rating.icon.source} style={styles.icon} />

              <Title size="medium-subtitle" style={styles.description}>
                {DESCRIPTION_RATING}
              </Title>

              <View style={styles.containerButtonRatingFirst}>
                {renderChildrenRating(
                  rating.data,
                  rating.isSelected,
                  rating.ratingPoint,
                )}
              </View>

              <TextContent size="small" style={styles.textNoteRating}>
                {SUBTITLE_RATING}
              </TextContent>

              {rating.isSelected && (
                <Title size="medium-subtitle" style={styles.description}>
                  {QUESTION_RATING}
                </Title>
              )}

              {rating.isSelected && (
                <FieldValueInput
                  {...rating.answerRatingInput}
                  value={rating.answerRatingInput}
                  style={styles.answerRating}
                  multiline={true}
                  placeholder={RATING_ANSWER_PLACEHOLDER}
                  inputStyle={styles.answerRatingInput}
                />
              )}

              <Button
                {...rating.button}
                style={styles.button}
                buttonStyle={
                  rating.answerRating && rating.answerRating.length > 0
                    ? styles.buttonActiveStyle
                    : styles.buttonStyle
                }
                gradient={rating.isSelected}
              />
            </AnimatedScrollView>
          </View>
        )}

        {rating.isRatingSuccess && (
          <View style={[styles.containerSuccess, style]}>
            <Image source={rating.iconSuccess.source} style={styles.icon} />

            <Title size="medium-title" style={styles.description}>
              {DESCRIPTION_RATING_SUCCESS}
            </Title>

            <Button
              style={styles.button}
              buttonStyle={[
                styles.buttonStyle,
                IS.PEPSI && styles.buttonStylePepsi,
              ]}
              {...rating.buttonSuccess}
            />
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_COLOR,
    height: 490,
    borderRadius: 4,
  },
  containerIsSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_COLOR,
    height: Platform.OS === 'android' ? 642 : 620,
    alignSelf: 'center',
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
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  iconClose: {
    marginRight: 16,
  },
  title: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 32,
    flex: 1,
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
    alignItems: 'flex-end',
  },
  description: {
    color: TEXT_DARK_COLOR,
    textAlign: 'center',
    marginLeft: 24,
    marginRight: 24,
  },
  descriptionExpireAt: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  descriptionHighlight: {
    color: TEXT_DARK_COLOR,
  },
  button: {
    marginTop: 32,
    marginBottom: 32,
  },
  buttonStyle: {
    backgroundColor: GRAY_COLOR,
    minHeight: 32,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  buttonStylePepsi: {
    backgroundColor: BuildVersion.palette.ACCENT_COLOR,
  },
  buttonActiveStyle: {
    backgroundColor: BuildVersion.palette.ACCENT_COLOR,
    minHeight: 32,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  line: {
    backgroundColor: LIGHT_GRAY_COLOR,
    width: '100%',
    height: 1,
  },
  order: {
    borderColor: GRAY_COLOR,
    backgroundColor: LIGHT_COLOR,
    borderWidth: 1,
    borderRadius: 21,
    minHeight: 0,
  },
  orderActive: {
    backgroundColor: BuildVersion.palette.ACCENT_COLOR,
    borderWidth: 1,
    borderRadius: 21,
    minHeight: 0,
  },
  orderInactive: {
    backgroundColor: LIGHT_GRAY_COLOR,
    borderColor: LIGHT_GRAY_COLOR,
    borderWidth: 1,
    borderRadius: 21,
    minHeight: 0,
  },
  textRating: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  textRatingActive: {
    color: LIGHT_COLOR,
    textAlign: 'center',
  },
  textRatingInactive: {
    color: TEXT_GRAY_COLOR,
    textAlign: 'center',
  },
  buttonRating: {
    width: 42,
    height: 40,
    marginTop: 10,
    borderRadius: 21,
  },
  buttonRatingLeft: {
    marginEnd: 12,
  },
  containerButtonRatingFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  containerButtonRatingSecond: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
  },
  textNoteRating: {
    color: TEXT_GRAY_COLOR,
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  answerRating: {
    paddingHorizontal: 18,
    alignSelf: 'center',
    maxWidth: 320,
  },
  answerRatingInput: {
    height: 96,
    textAlignVertical: 'top',
  },
  containerSuccess: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
  },
});

export default RatingModal;
