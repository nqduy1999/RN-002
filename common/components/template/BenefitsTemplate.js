import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import {
  LIGHT_COLOR,
  LIGHT_GRAY_COLOR_2,
  SHADOW_COLOR,
  TEXT_DARK_COLOR,
} from '@resources/palette';
import Title from '@common/components/text/Title';
import { } from '@resources/string/strings';
import FlatListContent from '../list/FlatListContent';
import OutlineButton from '../button/OutlineButton';
import { SVG_ARROW_DOWN, SVG_ARROW_UP } from '../../../resources/images';
import {
  BUTTON_VIEW_MORE,
  BUTTON_VIEW_LESS,
} from '../../../resources/string/strings';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
import ShadowView from 'react-native-simple-shadow-view';

import AIAContributionPlusIntro from '@areas/app/customize/aia/contribution-plus/intro';

class BenefitsTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapseMode: true,
    };
    this.onViewMorePress = this.onViewMorePress.bind(this);
  }

  renderViewMoreButton(length, showLimit) {
    if (length > showLimit) {
      return (
        <OutlineButton
          style={styles.viewMoreButton}
          buttonStyle={styles.viewMoreButtonStyle}
          textStyle={styles.viewMoreButtonTextStyle}
          textSize="little-smaller"
          icon={{
            source: this.state.collapseMode ? SVG_ARROW_DOWN : SVG_ARROW_UP,
            stroke: true,
            color: BuildVersion.palette.ACCENT_COLOR,
            size: 15,
          }}
          text={this.state.collapseMode ? BUTTON_VIEW_MORE : BUTTON_VIEW_LESS}
          onPress={this.onViewMorePress}
        />
      );
    } else {
      return null;
    }
  }

  onViewMorePress() {
    this.setState({ collapseMode: !this.state.collapseMode });
  }

  _renderTitle = () => {
    const { title } = this.props;
    if (!title) return;
    return (
      <View style={styles.titleSection}>
        <Title style={styles.title} size="medium-subtitle">
          {title}
        </Title>
      </View>
    )
  }

  _renderAIAContributionPlus = () => {
    const { showAIAContributionPlus, navigation } = this.props;
    return showAIAContributionPlus && IS.AIA && <AIAContributionPlusIntro {...{ navigation }}/>;
  }

  _renderList = () => {
    const { data, onItemPress, showLimit } = this.props;
    return (
      <FlatListContent
        contentType="benefits"
        data={
          this.state.collapseMode && data.length > showLimit
            ? data.slice(0, showLimit)
            : data
        }
        onItemPress={onItemPress}
        orientation="vertical"
      />
    )
  }

  _renderContent = () => {
    const { data, showLimit } = this.props;
    return (
      <Fragment>
        {this._renderTitle()}
        {this._renderAIAContributionPlus()}
        {this._renderList()}
        {this.renderViewMoreButton(data.length, showLimit)}
      </Fragment>
    )
  }

  render() {
    const { style } = this.props;
    if (Platform.OS === 'android') {
      return (
        <ShadowView style={{ ...styles.containerShadowView, ...style }}>
          <View>
            {this._renderContent()}
          </View>
        </ShadowView>
      )
    }
    return (
      <View style={{ ...styles.container, ...style }}>
        {this._renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_COLOR,
    width: Dimensions.get('window').width - 36,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderRadius: 4,
    borderWidth: 0.75,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    paddingBottom: 16,
  },
  containerShadowView: {
    backgroundColor: LIGHT_COLOR,
    width: Dimensions.get('window').width - 36,
    borderColor: LIGHT_GRAY_COLOR_2,
    borderRadius: 4,
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    paddingBottom: 16,
  },
  titleSection: {
    paddingStart: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 12,
  },
  title: {
    flex: 1,
    color: TEXT_DARK_COLOR,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  iconRight: {
    flexShrink: 1,
    alignItems: 'flex-end',
  },
  iconButtonStyle: {
    padding: 12,
    marginEnd: 4,
    width: 48,
    height: 48,
  },
  viewMoreButton: {
    flex: 1,
    width: 'auto',
  },
  viewMoreButtonStyle: {
    alignSelf: 'center',
    minHeight: 0,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderColor: BuildVersion.palette.ACCENT_COLOR,
  },
  viewMoreButtonTextStyle: {
    color: BuildVersion.palette.ACCENT_COLOR,
  },
});

export default BenefitsTemplate;
