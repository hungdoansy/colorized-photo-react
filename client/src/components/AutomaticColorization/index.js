/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import classNames from "classnames";
import { useState } from "@hookstate/core";
import { Icon } from "@ahaui/react";
import axios from "axios";

import automaticColorizationStore, { appendPhotoUrl, getPhotoById, updateColorizedUrlById } from "./store";

import PhotoUploader from "components/shared/PhotoUploader";

const endpoint = "http://localhost:9001";

export const PhotoDisplay = ({ id }) => {
  const photo = useState(automaticColorizationStore.photoById[id]).get();

  const handleUploadPhotoToRemote = async () => {
    const blob = await fetch(photo.originUrl).then((r) => r.blob());
    console.log("blob", blob);
    const formData = new FormData();
    formData.append("file", blob, photo.filename);

    axios
      .post(`${endpoint}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        const colorizedPhotoString = res.data?.colorizedPhoto;

        const colorizedPhoto = await fetch(colorizedPhotoString).then((r) => r.blob());
        console.log("colorizedPhoto", colorizedPhoto);

        const colorizedPhotoUrl = window.URL.createObjectURL(colorizedPhoto);

        console.log("colorizedPhoto", colorizedPhoto.slice(0, 10));
        updateColorizedUrlById(id, colorizedPhotoUrl);
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
        className="u-flexShrink1 u-flexGrow1 u-flex u-alignItemsCenter u-justifyContentCenter u-border"
        style={{
          flexBasis: "100%",
          alignSelf: "stretch",
        }}
      >
        <img alt="dummy" src={photo.originUrl} style={{ maxWidth: "100%", height: "auto" }} />
      </div>

      <div className="u-flexShrink0 u-flexGrow0 u-paddingSmall">
        <div onClick={handleUploadPhotoToRemote}>
          <Icon size="large" name="arrowForward" className="u-textWhite hover:u-textGray u-cursorPointer" />
        </div>
      </div>

      <div
        className="u-flexShrink1 u-flexGrow1 u-flex u-alignItemsCenter u-justifyContentCenter u-border"
        style={{
          flexBasis: "100%",
          alignSelf: "stretch",
        }}
      >
        {photo.colorizedUrl && (
          <img alt="dummy" src={photo.colorizedUrl} style={{ maxWidth: "100%", height: "auto" }} />
        )}
      </div>
    </div>
  );
};

const AutomaticColorization = () => {
  const state = useState(automaticColorizationStore);

  return (
    <div
      className="u-flex u-flexColumn u-widthFull"
      style={{
        rowGap: "16px",
      }}
    >
      <div
        className="u-widthFull u-flexShrink0"
        style={{
          height: 200,
        }}
      >
        <PhotoUploader onSuccess={appendPhotoUrl} />
      </div>

      <div
        className="u-widthFull u-flex u-flexColumn u-flexGrow1"
        style={{
          rowGap: "16px",
        }}
      >
        {state.ids.map((id) => (
          <PhotoDisplay key={id.get()} id={id.get()} />
        ))}
      </div>
    </div>
  );
};

export default AutomaticColorization;
