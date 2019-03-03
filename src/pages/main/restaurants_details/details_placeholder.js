import styled from "styled-components";
import React from "react";

import {
  Header as DummyHeaderContainer,
  Title,
  Stars,
  MiscInfo as DummyMiscInfo,
  Category,
  OpenStatus,
} from "./header";
import {
  Photos as DummyPhotosContainer,
  MapContainer,
  MapCaption,
  Img,
} from "./photos";
import {
  Container as DummyReviewContainer,
  ReviewerPhoto,
  ReviewerInfo as DummyReviewerInfo,
  ReviewerName,
  Date as ReviewDate,
  Body as DummyBody,
  Stars as ReviewStars,
  Text as ReviewText,
} from "./review";
import {
  Section as DummyReviewsSection,
  Count as ReviewsCount,
  ReviewContainer as DummyReviewsContainer,
  Bar as DummyReviewsBar,
} from "./reviews";

const DummyTitle = styled(Title)`
  height: ${props => props.theme.fontSizeH1};
  background: ${props => props.theme.colorPlaceHolder};
  width: 75%;
`;
const DummyStars = styled(Stars)`
  width: 157px;
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyCategory = styled(Category)`
  height: 22px;
  width: 157px;
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyOpen = styled(OpenStatus)`
  height: 22px;
  width: 165px;
  background: ${props => props.theme.colorPlaceHolder};
`;
export function DummyHeader() {
  return (
    <DummyHeaderContainer>
      <DummyTitle />
      <DummyStars rating={0} max={0} />
      <DummyMiscInfo>
        <DummyCategory />
        <DummyOpen />
      </DummyMiscInfo>
    </DummyHeaderContainer>
  );
}

const DummyMapContainer = styled(MapContainer)`
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyMapCaption = styled(MapCaption)`
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyImg = styled(Img)`
  background: ${props => props.theme.colorPlaceHolder};
`;

export function DummyPhotos() {
  return (
    <DummyPhotosContainer>
      <DummyMapContainer />
      <DummyImg src={""} width={""} height={""} />
      <DummyImg src={""} width={""} height={""} />
      <DummyMapCaption />
    </DummyPhotosContainer>
  );
}

const DummyReviewerPhoto = styled(ReviewerPhoto)`
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyReviewerName = styled(ReviewerName)`
  min-width: 100px;
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyReviewDate = styled(ReviewDate)`
  min-width: 100px;
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyReviewStars = styled(ReviewStars)`
  width: 100px;
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyReviewText = styled(ReviewText)`
  background: ${props => props.theme.colorPlaceHolder};
  color: ${props => props.theme.colorPlaceHolder};
`;
const dummyText1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra felis ullamcorper fermentum egestas. Morbi sagittis nibh vel justo convallis pulvinar. ";
const dummyText2 = "Nunc sit amet massa vel libero dictum cursus.";
function DummyReview() {
  return (
    <DummyReviewContainer>
      <DummyReviewerPhoto width={""} height={""} />
      <DummyReviewerInfo>
        <DummyReviewerName />
        <DummyReviewDate />
      </DummyReviewerInfo>
      <DummyBody>
        <DummyReviewStars rating={0} max={0} />
        <DummyReviewText>{dummyText1}</DummyReviewText>
        <DummyReviewText>{dummyText2}</DummyReviewText>
      </DummyBody>
    </DummyReviewContainer>
  );
}

const DummyReviewsCount = styled(ReviewsCount)`
  background: ${props => props.theme.colorPlaceHolder};
  width: 100px;
`;
export function DummyReviews() {
  return (
    <DummyReviewsSection>
      <DummyReviewsCount />
      <DummyReviewsContainer>
        <DummyReview />
        <DummyReviewsBar />
        <DummyReview />
      </DummyReviewsContainer>
    </DummyReviewsSection>
  );
}
