import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {DARK_COLOR} from '@resources/palette';
import {renderText} from '../StringHelper';

const FONT_SIZES = {
  'very-small': 10,
  small: 12,
  'little-smaller': 13,
  medium: 14,
  large: 16,
  'very-large': 18,
  'medium-button': 17,
  'medium-subtitle': 15,
  'small-title': 18,
  'medium-title': 19,
  'large-title': 21.328,
  'larger-title': 24,
  'largest-title': 34,
  code: 28,
};
const FONT_WEIGHTS = {
  normal: {},
  bold: {
    fontWeight: 'bold',
  },
};
const FONT_STYLE = {
  normal: {},
  italic: {
    fontStyle: 'italic',
  },
};
// export const FONT_FAMILIES = {
//     'title': 'Hirakakupro_W6',
//     'content': 'OpenSans_Regular',
//     'content-bold': 'OpenSans_Bold'
// }

export default class TextContentComponent extends Component {
  render() {
    const {
      size = 'medium',
      weight = 'normal',
      fontStyle = 'normal',
      // fontFamily = 'content',
      ...props
    } = this.props;
    return (
      <Text
        {...props}
        style={[
          styles.text,
          size && {fontSize: FONT_SIZES[size]},
          weight && FONT_WEIGHTS[weight],
          // fontFamily && { fontFamily: FONT_FAMILIES[fontFamily]},
          fontStyle && FONT_STYLE[fontStyle],
          props.style,
        ]}>
        {typeof props.children === 'string' ||
        typeof props.children === 'number'
          ? renderText(`${props.children}`)
          : props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: DARK_COLOR,
  },
});
