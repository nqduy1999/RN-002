import React, {Component} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {LIGHT_COLOR} from '../../../../resources/palette';
import {renderText} from '../../StringHelper';
import BuildVersion from '@resources/build_version/BuildVersion';

export default class AppleStyleSwipeableRow extends Component {
  renderLeftActions = (style, progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    const {leftButtonText} = this.props;
    return (
      <RectButton style={[styles.leftAction, style]}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          {renderText(leftButtonText)}
        </Animated.Text>
      </RectButton>
    );
  };

  render() {
    const {
      children,
      enableSwipeLeft,
      onSwipeableLeftOpen,
      removeOnSwipeableLeftOpen,
      style,
    } = this.props;
    return (
      <Swipeable
        ref={ref => (this.currentRef = ref)}
        onSwipeableLeftOpen={() => {
          // console.log('onSwipeableLeftOpen');
          removeOnSwipeableLeftOpen ? this.currentRef.close() : null;
          onSwipeableLeftOpen ? onSwipeableLeftOpen() : null;
        }}
        friction={1}
        leftThreshold={100}
        renderLeftActions={(progress, drag) =>
          enableSwipeLeft ? this.renderLeftActions(style, progress, drag) : null
        }>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BuildVersion.palette.RED_COLOR,
  },
  actionText: {
    backgroundColor: 'transparent',
    color: LIGHT_COLOR,
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
