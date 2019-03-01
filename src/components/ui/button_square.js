import styled from "styled-components";

const Button = styled.div`
  /* size */
  height: 38px;
  width: 151px;
  /* styles */
  font-family: ${props => props.theme.fontFamily};
  text-align: center;
  vertical-align: middle;
  line-height: 38px;
  border: 1px solid #e6e6e6;
  background-color: transparent;
  color: #c8c8c8;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  :hover {
    border: 1pt solid #002b56;
    color: #002b56;
  }

  :active {
    background-color: #d8d8d8;
  }
`;

export default Button;