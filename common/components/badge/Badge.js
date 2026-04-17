import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextContent from '../text/TextContent';
import {LIGHT_COLOR} from '@resources/palette';

const Badge = ({style, textStyle, text}) => {
  return (
    <View style={{...styles.container, ...style}}>
      <TextContent
        style={{...styles.text, ...textStyle}}
        size="small"
        weight="bold">
        {`${text}`}
      </TextContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: LIGHT_COLOR,
    borderColor: 'transparent',
  },
  text: {
    color: 'transparent',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Badge;
