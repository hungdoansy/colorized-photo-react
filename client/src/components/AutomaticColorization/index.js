/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import classNames from "classnames";
import { useState } from "@hookstate/core";
import { Icon } from "@ahaui/react";
import axios from "axios";

import automaticColorizationStore, { appendPhotoUrl } from "./store";

import PhotoUploader from "components/shared/PhotoUploader";

const endpoint = "http://localhost:9001";

export const PhotoDisplay = ({ photoUrl, filename }) => {
  const handleUploadPhotoToRemote = async () => {
    const blob = await fetch(photoUrl).then((r) => r.blob());

    const formData = new FormData();
    formData.append("file", blob, filename);

    axios.post(`${endpoint}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

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
        <img alt="dummy" src={photoUrl} style={{ maxWidth: "100%", height: "auto" }} />
      </div>

      <div className="u-flexShrink0 u-flexGrow0 u-paddingSmall">
        <div onClick={handleUploadPhotoToRemote}>
          <Icon size="large" name="arrowForward" className="u-textWhite hover:u-textGray u-cursorPointer" />
        </div>
      </div>

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
        {state.photoUrls.map(({ url, filename }, index) => (
          <PhotoDisplay key={index} photoUrl={url.get()} filename={filename.get()} />
        ))}
      </div>
    </div>
  );
};

export default AutomaticColorization;
