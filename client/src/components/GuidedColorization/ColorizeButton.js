import React, { useState } from "react";
import { useHookstate } from "@hookstate/core";
import { Button } from "@ahaui/react";
import styled from "styled-components";

import guidedColorizationStore, { colorizeFrame } from "./store";
import { CustomButtonCSS } from "utils/style";
import classNames from "classnames";

const ColorizeButton = ({ className }) => {
  const selectedFrameId = useHookstate(guidedColorizationStore.selectedFrameId).get();
  const [loading, setLoading] = useState(false);

  const handleColorizeGuidedPhoto = async () => {
    setLoading(true);

    await colorizeFrame(selectedFrameId);

    setLoading(false);
  };

  return (
    <div className={classNames(className, "u-widthFull u-flex u-justifyContentCenter")}>
      <Button
        style={{
          width: 200,
        }}
        variant="primary_outline"
        onClick={handleColorizeGuidedPhoto}
        disabled={loading}
        className="custom-button u-text300"
      >
        COLORIZE
      </Button>
    </div>
  );
};

export default styled(ColorizeButton)`
  ${CustomButtonCSS}
`;
