import React from 'react';
import {Path, Svg} from 'react-native-svg';

import BuildVersion from '@resources/build_version/BuildVersion';

const icon = ({stroke = BuildVersion.palette.AEA_RED_COLOR ?? '#00AEA0'}) => (
  <Svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M1.33334 8.37037L6.66668 14L14.6667 1.33334"
      stroke={stroke}
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default icon;
