import React from 'react';
import {StyleSheet} from 'react-native';
import TextContent from './TextContent';
import {ERROR_COLOR} from '@resources/palette';

const TextError = ({
  errorMessage,
  size = 'small',
  fontFamily = 'content',
  ...props
}) => {
  return errorMessage ? (
    <TextContent
      {...props}
      size={size}
      fontFamily={fontFamily}
      style={[styles.text, props.style]}>
      {errorMessage}
    </TextContent>
  ) : null;
};
const styles = StyleSheet.create({
  text: {
    color: ERROR_COLOR,
  },
});
export default TextError;
