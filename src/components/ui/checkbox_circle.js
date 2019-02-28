import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

const Container = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Input = styled.input`
  display: none;
`;

const Checkbox = styled.label`
  /* position/ size */
  display: inline-block;
  height: 16px;
  width: 16px;
  border-radius: 100%;
  border: 1px solid #c8c8c8;

  /* styles */
  background-color: #ffffff;
  /* checked styles */
  ${Input}:checked ~ & {
    background-color: black;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
  }

  /* check mark */
  :after {
    position: absolute;
    content: "";
    display: none;
    left: 7px;
    top: 3px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  /* Show the checkmark when checked */
  ${Input}:checked ~ &:after {
    display: block;
  }
`;

export default function Component(props) {
  const { id } = props;

  return (
    <Container htmlFor={id}>
      <Input type="checkbox" defaultChecked={false} id={id} />
      <Checkbox htmlFor={id} />
    </Container>
  );
}

Component.propTypes = {
  id: PropTypes.string.isRequired,
};
