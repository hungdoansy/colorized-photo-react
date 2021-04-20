import React from "react";
import classNames from "classnames";

import PhotoUploader from "components/shared/PhotoUploader";
import photo1 from "assets/dummy-photo1.jpeg";
import photo2 from "assets/dummy-photo2.jpeg";

const PhotoDisplay = ({ photo }) => {
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
  return (
    <div
      className={classNames("u-widthFull u-heightFull", "u-flex u-flexColumn")}
      style={{
        rowGap: "16px",
      }}
    >
      <div className="u-widthFull">
        <PhotoUploader />
      </div>

      <div
        className="u-widthFull u-flex u-flexColumn"
        style={{
          rowGap: "16px",
        }}
      >
        <PhotoDisplay photo={photo1} />
        <PhotoDisplay photo={photo2} />
      </div>
    </div>
  );
};

export default AutomaticColorization;
