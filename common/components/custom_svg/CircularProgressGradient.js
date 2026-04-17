import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { LIGHT_GRAY_COLOR } from '../../../resources/palette';
import BuildVersion from '@resources/build_version/BuildVersion';

const CircularProgressGradient = ({
  size = 130,
  strokeHighlightWidth = 8,
  strokeWidth = 2,
  strokeColor = LIGHT_GRAY_COLOR,
  completePercent = 0,
}) => {
  const { PI } = Math;
  const r = (size - strokeHighlightWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = r * 2 * PI;

  return (
    <Svg width={size} height={size} style={styles.container}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop
            offset="0"
            stopColor={
              BuildVersion.palette.VERTICAL_LINEAR_GRADIENT_BACKGROUND_COLORS[1]
            }
          />
          <Stop
            offset="1"
            stopColor={
              BuildVersion.palette.VERTICAL_LINEAR_GRADIENT_BACKGROUND_COLORS[0]
            }
          />
        </LinearGradient>
      </Defs>
      <Circle
        stroke={strokeColor}
        fill="none"
        {...{
          strokeWidth,
          cx,
          cy,
          r,
        }}
      />
      <Circle
        stroke="url(#grad)"
        fill="none"
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeWidth={strokeHighlightWidth}
        strokeDashoffset={circumference * (1 - completePercent)}
        strokeLinecap="round"
        {...{
          cx,
          cy,
          r,
        }}
      />
    </Svg>
  );
};
const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '270deg' }],
  },
});
export default CircularProgressGradient;
