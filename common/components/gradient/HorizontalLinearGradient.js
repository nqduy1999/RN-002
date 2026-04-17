import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {HORIZONTAL_LINEAR_GRADIENT_BUTTON_COLORS} from '@resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';
const palette = BuildVersion?.palette;
const HorizontalLinearGradient = props => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      locations={[0.1493, 0.7687]}
      colors={
        palette?.HORIZONTAL_LINEAR_GRADIENT_BUTTON_COLORS
          ? palette.HORIZONTAL_LINEAR_GRADIENT_BUTTON_COLORS
          : HORIZONTAL_LINEAR_GRADIENT_BUTTON_COLORS
      }
      {...props}>
      {props.children}
    </LinearGradient>
  );
};

export default HorizontalLinearGradient;
