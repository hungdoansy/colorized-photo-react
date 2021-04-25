import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { Form } from "@ahaui/react";
import { useState } from "@hookstate/core";

import linksColorizationStore, { selectPhotoById, unselectPhotoById } from "../store";

const PhotoWrapper = ({ className, id }) => {
  const photo = useState(linksColorizationStore.photoById[id]).get();

  const wasColorized = !!photo.colorizedUrl;

  const text = photo.selected ? "Unselect" : "Select for colorization";

  const handleClick = () => {
    if (wasColorized) {
      return;
    }

    if (photo.selected) {
      unselectPhotoById(id);
    } else {
      selectPhotoById(id);
    }
  };

  return (
    <div className={classNames(className)}>
      <img alt="dummy" src={photo.originUrl} />

      {!photo.colorizedUrl ? (
        <div className="selector-wrapper u-cursorPointer" onClick={handleClick}>
          <span className="u-text500 u-fontMedium u-textWhite">{text}</span>
        </div>
      ) : (
        <div className="colorized-overlay">
          <span className="u-text500 u-fontMedium u-textWhite">Colorized</span>
        </div>
      )}

      {photo.selected && !photo.colorizedUrl && (
        <div className="photo-overlay">
          <div className="check-wrapper">
            <Form.Check
              isValid
              id="form.check2"
              checked
              disabled
              onChange={() => {}}
              label={photo.colorizedUrl ? "Colorized" : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default styled(PhotoWrapper)`
  display: inline-block;
  position: relative;

  vertical-align: middle;
  width: 100%;

  user-select: none;

  &:hover {
    .selector-wrapper {
      visibility: visible;
    }
  }

  > img {
    width: 100%;
    height: auto;
  }

  .colorized-overlay {
    position: absolute;
    top: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selector-wrapper {
    visibility: hidden;

    position: absolute;
    top: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .photo-overlay {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 30px;

    background: rgba(255, 255, 255, 0.8);

    display: flex;
  }

  .check-wrapper {
    height: 30px;
    width: 100%;

    display: flex;
    align-items: center;

    padding-left: 8px;
    padding-right: 8px;
  }
`;
