import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

const Container = styled.div`
  /* position/size */
  display: inline-block;
  width: 16px;
  height: 16px;
  position: relative;
  /* styles */
  margin: 0;
  margin-bottom: -2px;
  background: #ffffff;
  border-radius: 100%;
  border: 1px solid #c8c8c8;
`;

const Input = styled.input`
  display: none;
`;

const RadioButton = styled.label`
  /* position/size */
  display: inline-block;
  width: 8px;
  height: 8px;
  top: 3px;
  left: 3px;
  /* styles */
  cursor: pointer;
  position: absolute;
  z-index: 1;
  border-radius: 100%;
  border: 1px solid #ffffff;
  background: #ffffff;
  /* the checked state */
  ${Input}:checked ~ & {
    border: 1px solid #c8c8c8;
    background: #002b56;
  }
`;

export default class RadioCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ checked: event.target.checked });
    if (this.props.onChange) {
      this.props.onChange(event.target.checked);
    }
  }

  render() {
    const { id } = this.props;
    const { checked } = this.state;

    return (
      <Container>
        <Input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={this.handleChange}
        />
        <RadioButton htmlFor={id} />
      </Container>
    );
  }
}

RadioCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool.isRequired,
};
