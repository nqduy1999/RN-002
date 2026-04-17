import React from 'react';
import Switches from 'react-native-switches';

import BuildVersion from '@resources/build_version/BuildVersion';
import Dimensions from '@resources/dimensions';
import { TEXT_DARK_COLOR, TEXT_GRAY_COLOR, LIGHT_GRAY_COLOR } from '@resources/palette';

const { SECONDARY_COLOR, LIGHT_SECONDARY_COLOR } = BuildVersion.palette;
const { isAndroid } = Dimensions;

const Switcher = ({ value, ...props }) => {
    return (
        <Switches
            shape={'line'}
            showText={false}
            buttonSize={24}
            sliderWidth={32}
            sliderHeight={14}
            animationDuration={200}
            borderColor={'transparent'}
            colorSwitchOn={LIGHT_SECONDARY_COLOR}
            colorSwitchOff={LIGHT_GRAY_COLOR}
            buttonColor={value ? SECONDARY_COLOR : isAndroid ? TEXT_DARK_COLOR : TEXT_GRAY_COLOR}
            {...{ value, ...props }}
        />
    )
}

export default Switcher;