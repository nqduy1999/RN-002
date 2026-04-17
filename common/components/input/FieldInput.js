import React, {Component} from 'react';
import Input from './Input';

class FieldInput extends Component {
  constructor() {
    super();
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTextShowingLabel = this.onChangeTextShowingLabel.bind(this);
    this.state = {
      isActive: false,
      isShowingLabel: false,
      hasValue: false,
      textValue: undefined,
    };
  }

  onFocus = () => {
    if (this.props.isHighlightContainer === false) {
      return;
    }
    this.setState({isActive: true});
    this.props.onFocus && this.props.onFocus();
  };

  onBlur = () => {
    if (this.props.isHighlightContainer === false) {
      return;
    }
    this.setState({isActive: false});
    this.props.onBlur && this.props.onBlur();
  };

  onChangeTextShowingLabel = text => {
    this.setState({textValue: text});
    if (this.state.errorEnabled || this.state.errorMessage) {
      this.setState({errorMessage: undefined, errorEnabled: false});
    }
    if (text.length !== 0) {
      this.setState({
        isShowingLabel: true,
        hasValue: true,
      });
    } else {
      this.setState({isShowingLabel: false, hasValue: false});
    }
    this.props.onChangeText && this.props.onChangeText(text);
  };

  onChangeText = text => {
    this.setState({textValue: text});
    if (this.state.errorEnabled || this.state.errorMessage) {
      this.setState({errorMessage: undefined, errorEnabled: false});
    }
    if (text.length !== 0) {
      this.setState({
        hasValue: true,
      });
    } else {
      this.setState({hasValue: false});
    }
    this.props.onChangeText && this.props.onChangeText(text);
  };

  UNSAFE_componentWillReceiveProps = props => {
    if (
      this.props.value === props.value &&
      this.props.secureTextEntry === props.secureTextEntry
    ) {
      if (props.errorEnabled || props.errorMessage) {
        this.setState({
          errorMessage: props.errorMessage,
          errorEnabled: props.errorEnabled,
        });
      }
    }
    if (props.value == '') {
      this.setState({textValue: props.value});
    }
  };
  render() {
    let isAlwayShowingLabel = this.props.isAlwayShowingLabel;
    return (
      <Input
        {...this.props}
        isShowingLabel={isAlwayShowingLabel ? true : this.state.isShowingLabel}
        isActive={this.state.isActive}
        hasValue={this.state.hasValue}
        textValue={this.props.value ? this.props.value : this.state.textValue}
        errorEnabled={this.state.errorEnabled}
        errorMessage={this.state.errorMessage}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        keyboardType={this.props.keyboardType}
        autoCompleteType={this.props.autoCompleteType}
        onChangeText={
          isAlwayShowingLabel
            ? this.onChangeText
            : this.onChangeTextShowingLabel
        }
      />
    );
  }
}

export default FieldInput;
