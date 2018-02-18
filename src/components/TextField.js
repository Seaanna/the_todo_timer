import React, { Component } from 'react';
import TextFieldMui from 'material-ui/TextField';

class TextField extends Component {
  render() {
    return (
      <TextFieldMui
        floatingLabelFocusStyle={{color: "#1e88e5"}}
        underlineFocusStyle={{borderColor: "#1e88e5"}}
        {...this.props}
      />
    );
  }
}

export default TextField;
