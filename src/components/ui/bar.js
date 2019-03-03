import styled from "styled-components";

const Bar = styled.hr`
  color: ${props => props.theme.colorLine}; /* old IE */
  background-color: ${props => props.theme.colorLine};
  border: none;
  height: 2px;
  clear: both;
`;

export default Bar;
