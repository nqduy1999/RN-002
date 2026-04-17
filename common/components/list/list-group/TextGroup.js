import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextContent from '../../text/TextContent';
import {TRACK_MAX_COLOR, TEXT_GRAY_COLOR} from '@resources/palette';

const TextGroup = ({style, text = null, isSelected = undefined, ...props}) => {
  return (
    <View
      {...props}
      style={{
        ...styles.container,
        ...style,
      }}>
      <TextContent
        style={{
          ...styles.text,
        }}
        size="little-smaller">
        {text}
      </TextContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 7,
    marginVertical: 12,
    paddingStart: 18,
    backgroundColor: TRACK_MAX_COLOR,
  },
  text: {
    color: TEXT_GRAY_COLOR,
    alignSelf: 'flex-start',
  },
});

export default TextGroup;
