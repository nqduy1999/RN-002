import React, { Component } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { BACKGROUND_COLOR } from '@resources/palette';
import { STATUS_BAR_HEIGHT } from '@resources/dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IS } from '@resources/build_version/BuildVersion';
const windows = Dimensions.get('window');
class BackgroundTemplate extends Component {
  componentDidMount() {
    const { onInitialized } = this.props;
    if (onInitialized) {
      onInitialized();
    }
  }

  renderContent() {
    const { children, scrollable, fullscreen, scrollRef, bounces, containerstyle } = this.props;

    if (scrollable) {
      return (
        <KeyboardAwareScrollView
          bounces={bounces !== undefined ? bounces : true}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          extraHeight={Platform.OS === 'android' ? 150 : 300}
          innerRef={scrollRef}
          {...scrollable}>
          <View style={[fullscreen && styles.fullScreen, containerstyle]}>
            {children}
          </View>
        </KeyboardAwareScrollView>
      );
    }

    return <View style={styles.contentContainer}>{children}</View>;
  }

  render() {
    const {
      style,
      wrapperStyle,
      imageStyle,
      source,
      resizeMode = 'cover',
      ignoreSafeAreaView = false,
      subContent,
    } = this.props;
    const Wrapper = ignoreSafeAreaView ? View : SafeAreaView;
    return (
      <ImageBackground
        style={[styles.background, style, wrapperStyle]}
        imageStyle={imageStyle}
        resizeMode={resizeMode}
        source={source}>
        <Wrapper style={styles.safeAreaView}>
          {this.renderContent()}
          {subContent}
        </Wrapper>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  fullScreen: {
    height: IS.PEPSI ? windows.height : windows.height - STATUS_BAR_HEIGHT,
  },
});

export default BackgroundTemplate;
