import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import TextContent from './TextContent';
import {TEXT_DARK_COLOR} from '@resources/palette';
import {connect} from 'react-redux';

class TitleComponent extends Component {
  render() {
    const {
      size = 'medium-title',
      weight = 'bold',
      fontFamily = 'content',
      ...props
    } = this.props;
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
  }
}

const styles = StyleSheet.create({
  text: {
    color: TEXT_DARK_COLOR,
  },
});
const mapStateToProps = state => ({
  language: state.app.language,
});
// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, null)(TitleComponent);
