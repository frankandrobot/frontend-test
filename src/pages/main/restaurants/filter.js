import styled from "styled-components";
import React from "react";

import RadioCheckbox from "../../../components/ui/checkbox_radio";
import Dropdown from "../../../components/ui/dropdown";

const Container = styled.section``;

const FilterText = styled.span`
  display: inline-block;
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizeFilter};
  color: ${props => props.theme.colorFilterBy};
  margin-right: ${props => props.theme.marginRightFilter};
`;

const OpenNow = styled.div`
  border-bottom: 1px solid #c8c8c8;
  margin: 0;
  padding: 0;
  padding-bottom: 6px;
  display: inline-block;
`;

const OpenNowText = styled.label`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  margin-left: 8px;
`;

const Price = styled.span`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
`;

const Category = styled.select``;

export default function Filter() {
  return (
    <Container>
      <FilterText>Filter By:</FilterText>
    </Container>
  );
}

/*
<OpenNow>
          <RadioCheckbox id="open-now" />
          <OpenNowText htmlFor="open-now">Open Now</OpenNowText>
        </OpenNow>
        <Dropdown title={<Price>Price</Price>} width={"10em"} />
        */
