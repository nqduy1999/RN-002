import React, {Component} from 'react';
import Input from './Input';

class FieldValueInput extends Component {
  constructor() {
    super();
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeTextShowingLabel = this.onChangeTextShowingLabel.bind(this);
    this.state = {
      isActive: false,
      isShowingLabel: false,
      hasValue: false,
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
    this.setState({
      errorMessage: props.errorMessage,
      errorEnabled: props.errorEnabled,
    });
  };
  render() {
    let isAlwayShowingLabel = this.props.isAlwayShowingLabel;
    return (
      <Input
        {...this.props}
        isShowingLabel={isAlwayShowingLabel ? true : this.state.isShowingLabel}
        isActive={this.state.isActive}
        hasValue={this.state.hasValue}
        textValue={this.props.value}
        errorEnabled={this.state.errorEnabled}
        errorMessage={this.state.errorMessage}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChangeText={
          isAlwayShowingLabel
            ? this.onChangeText
            : this.onChangeTextShowingLabel
        }
      />
    );
  }
}

export default FieldValueInput;
