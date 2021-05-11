import React from "react";
import { useHookstate } from "@hookstate/core";
import styled from "styled-components";
import classNames from "classnames";

import PhotoUploader from "components/shared/PhotoUploader";
import { CustomButtonCSS } from "utils/style";

import guidedColorizationStore, { setPhoto } from "./store";
import Frames from "./Frames";
import UploadedPhoto from "./UploadedPhoto";
import SplitIntoFrames from "./SplitIntoFrames";
import ColorizedPhoto from "./ColorizedPhoto";
import ColorizeButton from "./ColorizeButton";
import ColorizationGuider from "./ColorizationGuider";

const GuidedColorization = ({ className }) => {
  const photo = useHookstate(guidedColorizationStore.photo).get();
  const selectedFrameId = useHookstate(guidedColorizationStore.selectedFrameId).get();

  return (
    <div className={classNames(className, "u-flex u-flexColumn u-widthFull")}>
      {!photo.url ? (
        <div
          className="u-widthFull u-flexShrink0"
          style={{
            height: 200,
          }}
        >
          <PhotoUploader onSuccess={setPhoto} />
        </div>
      ) : (
        <>
          <UploadedPhoto />
          {photo.wasSplit ? <Frames /> : <SplitIntoFrames />}
        </>
      )}

      {photo.url && photo.wasSplit && selectedFrameId && (
        <>
          <ColorizationGuider />

          <ColorizeButton />

          <ColorizedPhoto />
        </>
      )}
    </div>
  );
};

export default styled(GuidedColorization)`
  row-gap: 32px;

  .sketch-picker {
    flex: 0 0 300px;
  }

  .placeholder {
    height: 300px;
    width: 500px;
  }

  .uploaded-photo {
    height: 100%;
    width: auto;
  }

  ${CustomButtonCSS}
`;
