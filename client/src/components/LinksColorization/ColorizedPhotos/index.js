import React from "react";
import { useHookstate } from "@hookstate/core";
import styled from "styled-components";
import classNames from "classnames";

import Header from "./Header";
import linksColorizationStore from "../store";
import PhotoGrid from "../PhotoGrid";

const PhotoWrapper = styled.div`
  display: inline-block;

  vertical-align: middle;
  width: 100%;

  user-select: none;

  > img {
    width: 100%;
    height: auto;
  }
`;

const ColorizedPhotos = ({ className }) => {
  const linksColorizationState = useHookstate(linksColorizationStore).get();
  const { ids, photoById } = linksColorizationState;

  const colorizedPhotos = ids.filter((id) => !!photoById[id].colorizedUrl).map((id) => photoById[id]);

  const renderPhoto = (index) => {
    const photo = colorizedPhotos[index];

    return (
      <PhotoWrapper key={photo.id}>
        <img alt="dummy" src={photo.colorizedUrl} />
      </PhotoWrapper>
    );
  };

  return (
    <div className={classNames(className, "u-widthFull")}>
      <Header />

      {colorizedPhotos.length ? (
        <PhotoGrid length={colorizedPhotos.length} renderPhoto={renderPhoto} />
      ) : (
        <div className="placeholder u-widthFull u-flex u-justifyContentCenter u-alignItemsCenter u-textWhite u-border u-borderDashed u-borderWhite u-text400 u-roundedMedium">
          <span>Colorized photos appear here</span>
        </div>
      )}
    </div>
  );
};

export default styled(ColorizedPhotos)`
  .colorized-photos {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &:after {
      content: "";
      flex: auto;
    }
  }

  .colorized-photo {
    display: inline-block;
    height: 30vh;
    flex-grow: 1;
    padding: 6px;

    > img {
      height: 100%;
      min-width: 100%;
    }

    &:last-child {
      flex-grow: 10;
    }
  }

  .placeholder {
    height: 200px;
  }
`;
