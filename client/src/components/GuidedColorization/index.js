import React, { useState } from "react";
import { useHookstate } from "@hookstate/core";
import styled from "styled-components";
import classNames from "classnames";

import PhotoUploader from "components/shared/PhotoUploader";
import { CustomButtonCSS } from "utils/style";

import guidedColorizationStore, { setPhoto } from "./store";
import ColorPicker from "./ColorPicker";
import GuidedPhoto from "./GuidedPhoto";
import Header from "./Header";
import Points from "./Points";

const GuidedColorization = ({ className }) => {
  const photo = useHookstate(guidedColorizationStore.photo).get();

  return (
    <div className={classNames(className, "u-flex u-flexColumn u-widthFull")}>
      <div
        className="u-widthFull u-flexShrink0"
        style={{
          height: 200,
        }}
      >
        <PhotoUploader onSuccess={setPhoto} />
      </div>

      {photo.url && (
        <>
          <Header />

          <div className="colorization-section u-flex u-justifyContentAround u-alignItemsCenter">
            <ColorPicker />
            <GuidedPhoto />
            <Points />
          </div>
          <div className="u-flex u-widthFull u-justifyContentCenter u-alignItemsCenter">
            {photo.colorizedUrl ? (
              <img alt="dummy" src={photo.colorizedUrl} />
            ) : (
              <div className="placeholder u-flex u-justifyContentCenter u-alignItemsCenter u-textWhite u-border u-borderDashed u-borderWhite u-text400 u-roundedMedium">
                <span>Colorized photos appear here</span>
              </div>
            )}
          </div>
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

  ${CustomButtonCSS}
`;
