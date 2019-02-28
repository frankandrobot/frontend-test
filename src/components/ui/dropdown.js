import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import toMap from "../../utils/toMap";

import Checkbox from "./checkbox_circle";

const Select = styled.div`
  :selection {
    background: transparent;
  }
  :-moz-selection {
    background: transparent;
  }
  /* size and position */
  position: relative;
  display: inline-block;
  /* styles */
  cursor: pointer;
  outline: none;
  margin: 0;
  padding: 0;
  width: ${props => props.width};
  /* the dropdown caret */
  :after {
    position: absolute;
    top: 6px;
    right: 0;
    display: block;
    content: "";
    width: 5px;
    height: 5px;
    border: solid #969696;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(${props => (props.open ? "225deg" : "45deg")});
    -ms-transform: rotate(${props => (props.open ? "225deg" : "45deg")});
    transform: rotate(${props => (props.open ? "225deg" : "45deg")});
    -webkit-transition: all 0.1s ease-in;
    -moz-transition: all 0.1s ease-in;
    -ms-transition: all 0.1s ease-in;
    -o-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
  }
`;

const TitleLabel = styled.label`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizeFilter};
  color: ${props => props.theme.colorFilterText};
`;

const Options = styled.ul`
  /* size & position */
  position: absolute;
  padding: 0;
  margin: 0;
  width: 100%;
  /* styles */
  background: white;
  border-radius: inherit;
  border: 1px solid #c8c8c8;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  list-style: none;
  /* hiding */
  opacity: ${props => (props.open ? 1 : 0)};
  pointer-events: ${props => (props.open ? "auto" : "none")};
  -webkit-transition: all 0.1s ease-in;
  -moz-transition: all 0.1s ease-in;
  -ms-transition: all 0.1s ease-in;
  -o-transition: all 0.1s ease-in;
  transition: all 0.1s ease-in;
`;

const LI = styled.li`
  width: 100%;
`;

const Label = styled.label`
  width: 100%;
  display: inline-block;
  /* styles */
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  color: #002b56;
  padding: 16px;
  background: inherit;
  :hover {
    background: #e5e5e5;
  }
`;

export default class Dropdown extends React.Component {
  static defaultProps = {
    title: "dropdown",
    options: ["option1", "option2", "option3"],
  };

  constructor(props) {
    super(props);
    this.state = { open: false };

    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.select = React.createRef();
    this.options = React.createRef();
  }

  componentDidMount() {
    // need to use the DOM because React event listeners
    // are in the root DOM. This keeps the document listener
    // from playing well with the list item listeners.
    document.addEventListener("click", this.toggleVisibility);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.toggleVisibility);
  }

  toggleVisibility = evt => {
    const select = this.select.current;
    const options = this.options.current;
    if (options.contains(evt.target)) {
      // Need to figure out if we're clicking in one of the
      // options, and if so then let the handleOptionClick do
      // its work
    } else if (select.contains(evt.target)) {
      // We clicked the select title, so toggle the state
      this.setState({ open: !this.state.open });
    } else {
      this.setState({ open: false });
    }
  };

  handleOptionClick = (opt, evt) => {
    const { selected, onChange } = this.props;
    const selectedMap = toMap(selected);
    if (selectedMap[opt]) {
      onChange(selected.filter(x => x !== opt));
    } else {
      onChange(selected.concat([opt]));
    }
    evt.preventDefault();
  };

  render() {
    const { title, options, width, selected } = this.props;
    const { open } = this.state;
    const selectedMap = toMap(selected);
    const listOptions = options.map(opt => (
      <LI key={opt} onClick={this.handleOptionClick.bind(this, opt)}>
        <Label htmlFor={opt}>
          <Checkbox id={opt} checked={!!selectedMap[opt]} />
          {opt}
        </Label>
      </LI>
    ));

    return (
      <Select ref={this.select} tabIndex={1} width={width} open={open}>
        <TitleLabel>{title}</TitleLabel>
        <Options ref={this.options} open={open}>
          {listOptions}
        </Options>
      </Select>
    );
  }
}

Dropdown.propTypes = {
  width: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
