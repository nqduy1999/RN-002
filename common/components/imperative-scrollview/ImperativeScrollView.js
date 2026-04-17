import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {Animated, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const AnimatedScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView,
);

const ImperativeScrollView = (props, ref) => {
  const scrollViewRef = useRef(null);
  useImperativeHandle(ref, () => ({
    scrollToStart: options => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: options ? options.animated : true,
        });
      }
    },
    scrollToEnd: options => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd(options);
      }
    },
    scrollTo: options => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo(options);
      }
    },
  }));
  return (
    <AnimatedScrollView
      innerRef={innerRef => (scrollViewRef.current = innerRef)}
      keyboardShouldPersistTaps="handled"
      extraHeight={Platform.OS === 'android' ? 150 : 300}
      enableOnAndroid
      {...props}
    />
  );
};

export default forwardRef(ImperativeScrollView);
