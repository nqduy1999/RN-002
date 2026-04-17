import React from 'react';
import {StyleSheet} from 'react-native';
import TextContent from './TextContent';
import {TEXT_DARK_COLOR} from '@resources/palette';

const Title = ({
  size = 'medium-title',
  weight = 'bold',
  fontFamily = 'content',
  ...props
}) => {
  return (
    <TextContent
      {...props}
      size={size}
      weight={weight}
      fontFamily={fontFamily}
      style={[styles.text, props.style]}>
      {props.children}
    </TextContent>
  );
};

const styles = StyleSheet.create({
  text: {
    color: TEXT_DARK_COLOR,
  },
});
export default Title;
