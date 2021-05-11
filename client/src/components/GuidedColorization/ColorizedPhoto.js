import { useHookstate } from "@hookstate/core";
import React from "react";
import guidedColorizationStore from "./store";

const ColorizedPhoto = () => {
  const selectedFrameId = useHookstate(guidedColorizationStore.selectedFrameId).get();
  const colorizedObjectUrl = useHookstate(guidedColorizationStore.frameById[selectedFrameId].colorizedObjectUrl).get();

  const wasColorized = !!colorizedObjectUrl;

  return (
    <div className="u-flex u-widthFull u-justifyContentCenter u-alignItemsCenter">
      {wasColorized ? (
        <img alt="dummy" src={colorizedObjectUrl} />
      ) : (
        <div className="placeholder u-flex u-justifyContentCenter u-alignItemsCenter u-textWhite u-border u-borderDashed u-borderWhite u-text400 u-roundedMedium">
          <span>Colorized frame appear here</span>
        </div>
      )}
    </div>
  );
};

export default ColorizedPhoto;
