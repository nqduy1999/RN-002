import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextContent from './TextContent';
import {TEXT_DARK_COLOR} from '@resources/palette';
import SvgIcon from '../icon/SvgIcon';
import {SVG_CONGRATS_LEFT, SVG_CONGRATS_RIGHT} from '@resources/images';
const CongratsTitle = ({
  size = 'medium-title',
  weight = 'bold',
  fontFamily = 'content',
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextContent
        {...props}
        size={size}
        weight={weight}
        fontFamily={fontFamily}
        style={[styles.text, props.style]}>
        {props.children}
      </TextContent>
      <SvgIcon
        style={styles.congratsRight}
        svgIcon={SVG_CONGRATS_RIGHT}
        width={32}
        height={36}
      />

      <SvgIcon
        style={styles.congratsLeft}
        svgIcon={SVG_CONGRATS_LEFT}
        width={32}
        height={36}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: TEXT_DARK_COLOR,
  },
  congratsLeft: {
    position: 'absolute',
    left: -50,
    top: -4,
  },
  congratsRight: {
    position: 'absolute',
    right: -50,
    top: -8,
  },
});
export default CongratsTitle;
