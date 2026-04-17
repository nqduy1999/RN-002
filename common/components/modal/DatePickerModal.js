import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import {
  TEXT_GRAY_COLOR,
  TEXT_DARK_COLOR,
  LIGHT_COLOR,
} from '@resources/palette';
import Title from '../text/Title';
import Button from '../button/Button';
import TransparentButton from '../button/TransparentButton';
import { LIGHT_GRAY_COLOR_2 } from '../../../resources/palette';
import ScrollPicker from '../datepicker/ScrollPicker';
import TextContent from '../text/TextContent';
import {
  LABEL_JAN_MONTH,
  LABEL_FEB_MONTH,
  LABEL_MAR_MONTH,
  LABEL_APR_MONTH,
  LABEL_MAY_MONTH,
  LABEL_JUN_MONTH,
  LABEL_JUL_MONTH,
  LABEL_AUG_MONTH,
  LABEL_SEP_MONTH,
  LABEL_OCT_MONTH,
  LABEL_NOV_MONTH,
  LABEL_DEC_MONTH,
} from '@resources/string/strings';
import moment from 'moment';
import BuildVersion from '@resources/build_version/BuildVersion';

const maxYear = 60;
const yearStart = moment().year() - 17 - maxYear;

export default class DatePickerModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      month: props.value.month(),
      year: props.value.year() - yearStart,
      day: props.value.date() - 1,
    };
  }

  componentDidUpdate() {
    const { isVisible, value } = this.props;
    if (isVisible) {
      this.setState({
        month: value.month(),
        year: value.year() - yearStart,
        day: value.date() - 1,
      });
    }
  }

  renderMonthArray = () => {
    return [
      { text: LABEL_JAN_MONTH, value: 1 },
      { text: LABEL_FEB_MONTH, value: 2 },
      { text: LABEL_MAR_MONTH, value: 3 },
      { text: LABEL_APR_MONTH, value: 4 },
      { text: LABEL_MAY_MONTH, value: 5 },
      { text: LABEL_JUN_MONTH, value: 6 },
      { text: LABEL_JUL_MONTH, value: 7 },
      { text: LABEL_AUG_MONTH, value: 8 },
      { text: LABEL_SEP_MONTH, value: 9 },
      { text: LABEL_OCT_MONTH, value: 10 },
      { text: LABEL_NOV_MONTH, value: 11 },
      { text: LABEL_DEC_MONTH, value: 12 },
    ];
  };
  renderYearArray = () => {
    return [...Array(60)].map((item, index) => {
      return yearStart + index;
    });
  };
  renderDayArray = () => {
    return [
      ...Array(
        moment(
          '1' + '/' + (this.state.month + 1) + '/' + this.state.year,
          'DD/MM/YYYY',
        ).daysInMonth(),
      ),
    ].map((item, index) => index + 1);
  };
  render() {
    const {
      style,
      title,
      titleStyle,
      yesButton,
      noButton,
      isVisible,
      onBackButtonPress,
      onBackdropPress,
    } = this.props;
    return (
      <View>
        <Modal
          isVisible={isVisible}
          onBackButtonPress={onBackButtonPress}
          onBackdropPress={onBackdropPress}>
          <View style={[styles.container, style]}>
            <View style={styles.titleSection}>
              <Title style={{ ...styles.title, ...titleStyle }}>{title}</Title>
            </View>
            <View style={styles.dateSection}>
              <ScrollPicker
                wrapperStyle={{ flex: 0, width: 56 }}
                dataSource={this.renderDayArray()}
                selectedIndex={this.state.day}
                onValueChange={(data, selectedIndex) => {
                  this.setState({
                    day: selectedIndex,
                  });
                }}
                wrapperHeight={120}
                wrapperColor={LIGHT_COLOR}
                itemHeight={40}
                highlightColor={LIGHT_GRAY_COLOR_2}
                renderItem={(data, index, isSelected) => {
                  return (
                    <View key={index}>
                      <TextContent
                        style={
                          isSelected
                            ? styles.dateSelected
                            : styles.dateUnselected
                        }
                        size="medium-subtitle"
                        weight={isSelected ? 'bold' : 'normal'}>
                        {data}
                      </TextContent>
                    </View>
                  );
                }}
              />
              <ScrollPicker
                wrapperStyle={{ flex: 0, width: 86, marginHorizontal: 5 }}
                dataSource={this.renderMonthArray()}
                selectedIndex={this.state.month}
                onValueChange={(data, selectedIndex) => {
                  //
                  this.setState({ month: selectedIndex });
                }}
                wrapperHeight={120}
                wrapperColor={LIGHT_COLOR}
                itemHeight={40}
                highlightColor={LIGHT_GRAY_COLOR_2}
                renderItem={(data, index, isSelected) => {
                  return (
                    <View key={index}>
                      <TextContent
                        style={
                          isSelected
                            ? styles.dateSelected
                            : styles.dateUnselected
                        }
                        size="medium-subtitle"
                        weight={isSelected ? 'bold' : 'normal'}>
                        {data.text}
                      </TextContent>
                    </View>
                  );
                }}
              />
              <ScrollPicker
                wrapperStyle={{ flex: 0, width: 76 }}
                dataSource={this.renderYearArray()}
                selectedIndex={this.state.year}
                onValueChange={(data, selectedIndex) => {
                  this.setState({ year: selectedIndex });
                }}
                wrapperHeight={120}
                wrapperColor={LIGHT_COLOR}
                itemHeight={40}
                highlightColor={LIGHT_GRAY_COLOR_2}
                renderItem={(data, index, isSelected) => {
                  return (
                    <View key={index}>
                      <TextContent
                        style={
                          isSelected
                            ? styles.dateSelected
                            : styles.dateUnselected
                        }
                        size="medium-subtitle"
                        weight={isSelected ? 'bold' : 'normal'}>
                        {data}
                      </TextContent>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                style={styles.button}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.textStyle}
                {...yesButton}
                onPress={() => {
                  yesButton.onPress(
                    moment
                      .utc()
                      .year(this.state.year + yearStart)
                      .month(this.state.month)
                      .date(this.state.day + 1),
                  );
                }}
              />
              <TransparentButton
                style={styles.button}
                textStyle={{ ...styles.textStyle, ...styles.noButtonText }}
                buttonStyle={styles.buttonStyle}
                {...noButton}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_COLOR,
    borderRadius: 4,
    paddingHorizontal: 30,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    color: TEXT_DARK_COLOR,
  },
  buttonWrapper: {
    marginBottom: 8,
    alignItems: 'center',
  },
  button: {
    width: 130,
    marginBottom: 16,
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
  dateSection: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateScroll: {
    width: 20,
    marginHorizontal: 2.5,
  },
  dateSelected: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
  dateUnselected: {
    color: TEXT_GRAY_COLOR,
  },
  dateDivider: {
    backgroundColor: LIGHT_GRAY_COLOR_2,
    height: 1,
  },
});
