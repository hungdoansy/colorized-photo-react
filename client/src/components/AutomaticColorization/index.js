import React from "react";
import classNames from "classnames";
import { useState } from "@hookstate/core";

import automaticColorizationStore, { appendPhotoUrl } from "./store";

import PhotoUploader from "components/shared/PhotoUploader";

export const PhotoDisplay = ({ photo }) => {
  return (
    <div
      className="u-widthFull u-flex u-alignItemsCenter"
      style={{
        minHeight: 300,
        columnGap: "8px",
      }}
    >
      <div
        className="u-flexShrink1 u-flexGrow1 u-heightFull u-flex u-alignItemsCenter u-justifyContentCenter u-border"
        style={{
          flexBasis: "100%",
        }}
      >
        <img alt="dummy" src={photo} style={{ maxWidth: "100%", height: "auto" }} />
      </div>

      <div className="u-flexShrink0 u-flexGrow0">the button</div>

      <div
        className="u-flexShrink1 u-flexGrow1 u-heightFull u-flex u-alignItemsCenter u-justifyContentCenter u-border"
        style={{
          flexBasis: "100%",
        }}
      >
        Image 2
      </div>
    </div>
  );
};

const AutomaticColorization = () => {
  const state = useState(automaticColorizationStore);

  return (
    <div
      className={classNames("u-widthFull u-heightFull", "u-flex u-flexColumn")}
      style={{
        rowGap: "16px",
      }}
    >
      <div className="u-widthFull">
        <PhotoUploader onSuccess={appendPhotoUrl} />
      </div>

      <div
        className="u-widthFull u-flex u-flexColumn"
        style={{
          rowGap: "16px",
        }}
      >
        {state.photoUrls.map((url, index) => (
          <PhotoDisplay key={index} photo={url.get()} />
        ))}
      </div>
    </div>
  );
};

export default AutomaticColorization;
