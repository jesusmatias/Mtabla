// @flow

import * as React from "react";

type Props = {|
  +type?: string,
  +label: string,
  +placeHolder: string
|};

type State = {|
  value: string
|};

class FormTextInput extends React.PureComponent<Props, State> {
  state = {
    value: ""
  };

  _handleChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({ value: event.target.value });
  };

  render(): React.Node {
    const type = this.props.type || "text";
    const { label, placeHolder } = this.props;
    const { value } = this.state;
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <input
          className="form-control"
          onChange={this._handleChange}
          placeholder={placeHolder}
          type={type}
          value={value}
        />
      </div>
    );
  }
}

export default FormTextInput;