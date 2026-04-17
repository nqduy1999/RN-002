import React, { Component } from 'react';
import { StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { LIGHT_COLOR } from '@resources/palette';
import { STATUS_BAR_HEIGHT } from '@resources/dimensions';
import ParallaxScrollView from '../scroll/ParallaxScrollView';

const windows = Dimensions.get('window');
export const PARALLAX_HEADER_HEIGHT =
  (windows.height + STATUS_BAR_HEIGHT) / 4 - 16;
export const STICKY_HEADER_HEIGHT = PARALLAX_HEADER_HEIGHT * 0.65 - 16 * 0.5;

class ParallaxTemplate extends Component {

  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
    this.scrollView = null;
    this.state = {
      scrollEnabled: true,
      visibleHeader: true,
      prvVisibleHeader: true,
    };
  }

  componentDidMount() {
    const { onInitialized } = this.props;
    if (onInitialized) {
      onInitialized();
    }
  }

  componentDidUpdate() {
    const { scrollEnabled } = this.props;
    if (!!scrollEnabled && !this.state.scrollEnabled) {
      this.setState({ scrollEnabled: true });
    }
  }

  render() {
    const {
      style,
      children,
      headerBackgroundColor,
      backgroundColor,
      renderForeground,
      renderBackground,
      renderStickyHeader,
      renderFixedHeader,
      onDisableScroll,
    } = this.props;

    return (
      <ParallaxScrollView
        scrollRef={ref => {
          this.scrollView = ref;
        }}
        onChangeHeaderVisibility={visible => {
          if (visible !== this.state.visibleHeader) {
            this.setState({
              visibleHeader: visible,
            });
          }
        }}
        onScrollEndDrag={() => {
          if (this.state.visibleHeader) {
            this.scrollView &&
              this.scrollView._component.getScrollResponder().scrollTo({ y: 0 });
          } else {
            this.scrollView &&
              this.scrollView._component.getScrollResponder().scrollTo({
                y: PARALLAX_HEADER_HEIGHT - STICKY_HEADER_HEIGHT,
                animated: true,
              });
            this.setState({ scrollEnabled: false });
            onDisableScroll && onDisableScroll();
          }
        }}
        style={[styles.parallaxScrollView, style]}
        contentContainerStyle={styles.contentContainer}
        headerBackgroundColor={headerBackgroundColor || LIGHT_COLOR}
        backgroundColor={backgroundColor || LIGHT_COLOR}
        renderBackground={renderBackground}
        renderForeground={renderForeground}
        renderStickyHeader={renderStickyHeader}
        renderFixedHeader={renderFixedHeader}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        keyboardShouldPersistTaps="handled"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}>
        {children}
      </ParallaxScrollView>
    );
  }

}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    ...(Platform.OS === 'android'
      ? { height: Dimensions.get('window').height }
      : null),
  },
  parallaxScrollView: {
    backgroundColor: 'blue',
  },
});

export default ParallaxTemplate;
