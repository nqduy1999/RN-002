import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  GRAY_COLOR,
  LIGHT_GRAY_COLOR_2,
  LIGHT_COLOR,
} from '@resources/palette';
import TextContent from '../../text/TextContent';
import BuildVersion from '@resources/build_version/BuildVersion';

class RecognitionTabBar extends Component {
  renderTab(title, page, isTabActive, onPressHandler) {
    return (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => onPressHandler(page)}
        key={`${title}`}>
        <View style={[styles.text, isTabActive ? styles.underLine : null]}>
          <TextContent
            size="medium-subtitle"
            weight={isTabActive ? 'bold' : 'normal'}
            style={isTabActive ? styles.textActive : styles.textInactive}>
            {title}
          </TextContent>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.tabs,
          {backgroundColor: this.props.backgroundColor},
          this.props.style,
        ]}>
        <View style={styles.divider} />
        {this.props.tabs.map((item, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(item.title, page, isTabActive, this.props.goToPage);
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    paddingBottom: 12,
    alignSelf: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: LIGHT_COLOR,
  },
  textActive: {
    color: BuildVersion.palette.ACCENT_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textInactive: {
    color: GRAY_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  underLine: {
    borderBottomColor: BuildVersion.palette.ACCENT_COLOR,
    borderBottomWidth: 2,
  },
  divider: {
    position: 'absolute',
    bottom: 1,
    height: 1,
    width: '100%',
    backgroundColor: LIGHT_GRAY_COLOR_2,
  },
});

export default RecognitionTabBar;
