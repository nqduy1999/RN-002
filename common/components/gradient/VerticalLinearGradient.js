import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BuildVersion, { IS } from '@resources/build_version/BuildVersion';
import { isCustomize, getCustomize } from '@utils/CoreUtils';

const VerticalLinearGradient = props => {
  const linearGradientProps = {
    colors: BuildVersion.palette.VERTICAL_LINEAR_GRADIENT_BACKGROUND_COLORS,
    start: { x: 0, y: 0 },
    end: !IS.PEPSI ? { x: 0, y: 1 } : { x: 1, y: 0 },
    locations: !IS.PEPSI ? [0, 1] : [0.05, 0.65, 1],
    ...props,
  };
  if (isCustomize()) {
    return (
      <View style={{ backgroundColor: getCustomize('mainColor') }}>
        {props.children}
      </View>
    )
  }
  return (
    <LinearGradient {...linearGradientProps}>
      {props.children}
    </LinearGradient>
  );
};

export default VerticalLinearGradient;