import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {GRAY_COLOR} from '../../../resources/palette';
import FieldInput from './FieldInput';

class PasswordInput extends Component {
  constructor() {
    super();

    this.state = {
      isPassword: true,
    };

    let iconProps = {
      buttonStyle: styles.iconButton,
      buttonColor: GRAY_COLOR,
      size: 24,
    };
    this.icons = {
      showPassword: {
        ...iconProps,
        name: 'Eye-Visible',
        onPress: () =>
          this.setState({
            isPassword: false,
          }),
      },
      hidePassword: {
        ...iconProps,
        name: 'Eye-Blind',
        onPress: () =>
          this.setState({
            isPassword: true,
          }),
      },
    };
  }

  render() {
    const {isPassword} = this.state;
    let icon = isPassword ? this.icons.showPassword : this.icons.hidePassword;

    return (
      <FieldInput
        {...this.props}
        secureTextEntry={isPassword}
        iconRight={icon}
      />
    );
  }
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: 'transparent',
    padding: 8,
  },
});

export default PasswordInput;
