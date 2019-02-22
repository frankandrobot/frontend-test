import React from 'react';
import GoogleMap from 'google-map-react';
import { css } from '@emotion/core';

import styles from '../../../styles';

// ! TODO: Delete key at https://console.cloud.google.com/
const gMapKey = 'AIzaSyB362coY_atq7ru7333vyyqIzM48NVdHQE';
const Indicator = ({ open }) => (
  <div
    css={css`
      border: 1px solid black;
      border-radius: 50%;
      background-color: ${open ? styles.colors.green : styles.colors.red};
      height: 30px;
      width: 30px;
      display: grid;
    `}
  >
    <img
      src='/static/images/SF.png'
      alt='Restaurant location indicator'
      height='15'
      width='15'
      css={css`
        align-self: center;
        justify-self: center;
      `}
    />
  </div>
);

export const MediaRow = ({ lat, lng, address, image, name, open }) => {
  const zoom = 16;
  return (
    <div
      css={css`
        max-width: calc(100% - ${styles.marginUnit * 2}px);
        width: ${styles.maxContentWidth};
        padding-left: ${styles.marginUnit}px;
        padding-right: ${styles.marginUnit}px;
        padding-top: ${styles.marginUnit * 3}px;
        padding-bottom: ${styles.marginUnit * 3}px;
        height: 375px;
        display: grid;
        grid-template-areas: 'map map image' 'address address address';
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr auto;
        @media screen and (min-width: ${styles.detailPage.minWidthDefinedGrid}) {
          margin-left: auto;
          margin-right: auto;
          padding-right: 0;
          padding-left: 0;
        }
        @media screen and (max-width: ${styles.detailPage.mobileWidth}) {
          max-width: 100%;
          margin-left: 0;
          margin-right: 0;
          padding-right: 0;
          padding-left: 0;
          padding-top: 0;
          height: auto;
          grid-template-areas:
            'map'
            'address'
            'image';
          grid-template-columns: 1fr;
          grid-template-rows: repeat(3, auto);
        }
      `}
    >
      <div
        css={css`
          grid-area: map;
          width: 100%;
          height: 100%;
          min-height: 225px;
        `}
      >
        <GoogleMap bootstrapURLKeys={{ key: gMapKey }} defaultCenter={[lat, lng]} defaultZoom={zoom}>
          <Indicator lat={lat} lng={lng} open={open} />
        </GoogleMap>
      </div>
      <img
        css={css`
          grid-area: image;
          height: 100%;
          min-height: 180px;
          margin-left: ${styles.marginUnit * 2}px;
          object-fit: cover;
          object-position: center center;
          width: calc(100% - 32px);
          @media screen and (max-width: ${styles.detailPage.mobileWidth}) {
            width: calc(100% - ${styles.marginUnit * 3}px);
            margin-left: 0;
            padding-left: ${styles.marginUnit * 1.5}px;
            padding-right: ${styles.marginUnit * 1.5}px;
          }
        `}
        src={image}
        alt={`${name} photo`}
      />
      <div
        css={css`
          font-weight: 300;
          font-size: 20px;
          line-height: 28px;
          grid-area: address;
          padding-top: ${styles.marginUnit}px;
          @media screen and (max-width: ${styles.detailPage.mobileWidth}) {
            margin-left: 0;
            padding-left: ${styles.marginUnit * 1.5}px;
            padding-right: ${styles.marginUnit * 1.5}px;
            padding-bottom: ${styles.marginUnit * 2}px;
            font-size: 18px;
            line-height: 22px;
          }
        `}
      >
        {address}
      </div>
    </div>
  );
};

export default MediaRow;
