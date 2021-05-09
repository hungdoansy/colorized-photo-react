import React, { useState } from "react";
import { Button, Loader } from "@ahaui/react";

import { removePhoto, removeAllPoints, uploadPhoto } from "./store";

const Header = () => {
  const [loading, setLoading] = useState(false);

  const handleColorizeGuidedPhoto = async () => {
    setLoading(true);

    await uploadPhoto();

    setLoading(false);
  };

  return (
    <div
      className="u-flex"
      style={{
        columnGap: 8,
      }}
    >
      <Button
        size="small"
        variant="primary_outline"
        onClick={removePhoto}
        disabled={loading}
        className="custom-button u-text300"
      >
        Remove current photo
      </Button>

      <Button
        size="small"
        variant="primary_outline"
        onClick={removeAllPoints}
        disabled={loading}
        className="custom-button u-text300"
      >
        Remove all colored points
      </Button>

      <Button
        size="small"
        variant="primary_outline"
        onClick={handleColorizeGuidedPhoto}
        disabled={loading}
        className="custom-button u-text300"
      >
        COLORIZE
      </Button>

      {loading && (
        <div className="u-flex u-justifyContentCenter u-alignItemsCenter">
          <Loader size="small" className="u-textNeutral50 u-marginHorizontalExtraSmall" />;
        </div>
      )}
    </div>
  );
};

export default Header;
