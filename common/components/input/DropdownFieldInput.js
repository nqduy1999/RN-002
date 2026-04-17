import React, {Component} from 'react';
import DropdownInput from './DropdownInput';

class DropdownFieldInput extends Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
      isShowingLabel: false,
    };
  }

  onSelect = (index, value) => {
    this.setState({isShowingLabel: true});
    if (this.state.errorEnabled || this.state.errorMessage) {
      this.setState({errorMessage: undefined, errorEnabled: false});
    }
    this.props.onSelect && this.props.onSelect(index, value);
  };

  onDropdownWillShow = () => {
    this.setState({isActive: true});
    return true;
  };

  onDropdownWillHide = () => {
    this.setState({isActive: false});
    return true;
  };

  show = () => {
    this.DropdownRef.show();
    this.onDropdownWillShow();
  };
  UNSAFE_componentWillReceiveProps = props => {
    if (props.errorEnabled || props.errorMessage) {
      this.setState({
        errorMessage: props.errorMessage,
        errorEnabled: props.errorEnabled,
      });
    }
  };

  render() {
    let isAlwayShowingLabel = this.props.isAlwayShowingLabel;
    return (
      <DropdownInput
        {...this.props}
        dropdownRef={ref => (this.DropdownRef = ref)}
        isShowingLabel={isAlwayShowingLabel ? true : this.state.isShowingLabel}
        isActive={this.state.isActive}
        errorEnabled={this.state.errorEnabled}
        errorMessage={this.state.errorMessage}
        onSelect={this.onSelect}
        onDropdownWillHide={this.onDropdownWillHide}
        onDropdownWillShow={this.onDropdownWillShow}
        show={this.show}
      />
    );
  }
}

export default DropdownFieldInput;
