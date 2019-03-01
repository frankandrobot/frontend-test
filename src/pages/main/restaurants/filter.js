import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

import RadioCheckbox from "../../../components/ui/checkbox_radio";
import Dropdown from "../../../components/ui/dropdown";
import _Button from "../../../components/ui/button_square";

const Container = styled.section`
  padding-top: 26px;
  padding-bottom: 26px;
  margin-left: ${props => props.theme.bodyPaddingLeft};
  margin-right: ${props => props.theme.bodyPaddingRight};
`;

const FilterText = styled.span`
  display: inline-block;
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizeFilter};
  color: ${props => props.theme.colorFilterBy};
  margin-right: ${props => props.theme.marginRightFilter};
`;

const OpenNow = styled.div`
  display: inline-block;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid ${props => props.theme.colorFilterBottomBar};
  padding-bottom: 8px;
  margin-right: ${props => props.theme.marginRightFilter};
  display: inline-block;
`;

const OpenNowText = styled.label`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizeFilter};
  color: ${props => props.theme.colorFilterText};
  margin-left: 8px;
`;

const Price = styled.div`
  display: inline-block;
  margin-right: ${props => props.theme.marginRightFilter};
`;

const Categories = styled.div`
  display: inline-block;
  margin-right: ${props => props.theme.marginRightFilter};
`;

const Button = styled(_Button)`
  float: right;
  margin-top: -8px;
`;

const prices = ["All", "$", "$$", "$$$", "$$$$"];
export const categories = [
  { value: "All", label: "All" },
  { value: "italian", label: "Italian" },
  { value: "seafood", label: "Seafood" },
  { value: "steak", label: "Steakhouses" },
  { value: "japanese", label: "Japanese" },
  { value: "tradamerican", label: "American" },
  { value: "mexican", label: "Mexican" },
  { value: "thai", label: "Thai" },
];
export const categoriesByValue = categories.reduce(
  (total, { value, label }) =>
    Object.assign(total, { [value]: { label, value } }),
  {}
);

export default function Filter(props) {
  const {
    openNow,
    onChangeOpenNow,
    priceFilter,
    onChangePriceFilter,
    catFilter,
    onChangeCatFilter,
    onClear,
  } = props;
  return (
    <Container>
      <FilterText>Filter By:</FilterText>
      <OpenNow>
        <RadioCheckbox
          id="open-now"
          checked={openNow}
          onChange={onChangeOpenNow}
        />
        <OpenNowText htmlFor="open-now">Open Now</OpenNowText>
      </OpenNow>
      <Price>
        <Dropdown
          width={"6em"}
          title={"Price"}
          options={prices}
          selected={priceFilter}
          onChange={onChangePriceFilter}
        />
      </Price>
      <Categories>
        <Dropdown
          width={"10em"}
          title={"Categories"}
          options={categories}
          selected={catFilter}
          onChange={onChangeCatFilter}
        />
      </Categories>
      <Button onClick={onClear}>clear all</Button>
    </Container>
  );
}

Filter.propTypes = {
  openNow: PropTypes.bool.isRequired,
  onChangeOpenNow: PropTypes.func.isRequired,
  priceFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangePriceFilter: PropTypes.func.isRequired,
  catFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeCatFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
