import React from "react";
import classNames from "classnames";

import PhotoUploader from "components/shared/PhotoUploader";

const AutomaticColorization = () => {
  return (
    <div className={classNames("u-widthFull u-heightFull", "u-flex u-flexColumn")}>
      <div>
        <PhotoUploader />
      </div>
    </div>
  );
};

export default AutomaticColorization;
