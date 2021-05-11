import React, { useCallback } from "react";
import { useHookstate } from "@hookstate/core";

import PhotoGrid from "components/shared/PhotoGrid";

import HorizontalPhotoGrid from "./HorizontalPhotoGrid";
import guidedColorizationStore from "../store";
import FrameWrapper from "./FrameWrapper";

const Frames = () => {
  const frameIds = useHookstate(guidedColorizationStore.frameIds);

  const renderFrame = useCallback(
    (index) => {
      const id = frameIds[index].get();
      console.log("index", index);

      return <FrameWrapper key={id} id={id} />;
    },
    [frameIds]
  );

  return <PhotoGrid length={frameIds.length} renderPhoto={renderFrame} />;
};

export default Frames;
