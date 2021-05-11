import React from "react";
import styled from "styled-components";
import { useHookstate } from "@hookstate/core";
import { Icon } from "@ahaui/react";
import classNames from "classnames";

import guidedColorizationStore, { setPhoto, removePhoto, removeAllPoints, uploadPhoto } from "./store";

const UploadedPhoto = ({ className }) => {
  const photoUrl = useHookstate(guidedColorizationStore.photo.url).get();

  if (!photoUrl) {
    return null;
  }

  return (
    <div
      className={classNames(className, "u-widthFull u-flexShrink0 u-flex u-justifyContentCenter")}
      style={{
        height: 300,
      }}
    >
      <div className="wrapper u-inlineFlex u-heightFull u-positionRelative u-roundedMedium u-overflowHidden">
        <img className="uploaded-photo" alt="dummy" src={photoUrl} />
        <div
          className="trash-overlay u-positionAbsolute u-flex u-justifyContentCenter u-alignItemsCenter hover:u-textNegative u-userSelectNone u-cursorPointer"
          onClick={removePhoto}
        >
          <span className="u-fontMedium">Remove this photo</span>
          <Icon size="small" name="trash" />
        </div>
      </div>
    </div>
  );
};

export default styled(UploadedPhoto)`
  .trash-overlay {
    opacity: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.5);

    transition: opacity 0.2s linear;
  }

  .wrapper:hover {
    .trash-overlay {
      opacity: 1;
    }
  }
`;
