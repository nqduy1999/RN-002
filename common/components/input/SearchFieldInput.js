import React, {Component} from 'react';
import Input from './Input';

class SearchFieldInput extends Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.timeout = 0;

    this.state = {
      value: '',
    };
  }
  onChangeText(text) {
    const {onSearchQueryChanged} = this.props;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.setState({value: text});
    this.timeout = setTimeout(() => {
      onSearchQueryChanged && onSearchQueryChanged(text);
    }, 1000);
  }
  render() {
    return (
      <Input
        {...this.props}
        onChangeText={this.onChangeText}
        value={this.state.value}
      />
    );
  }
}

export default SearchFieldInput;
