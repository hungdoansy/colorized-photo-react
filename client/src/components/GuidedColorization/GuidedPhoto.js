import React, { useRef, useState } from "react";
import { useHookstate } from "@hookstate/core";
import styled from "styled-components";

import guidedColorizationStore, { appendPoint } from "./store";
import ColorIndicators from "./ColorIndicators";

const GuidedPhoto = ({ className }) => {
  const photoUrl = useHookstate(guidedColorizationStore.photo.url).get();

  const handleMouseUp = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    appendPoint(y, x);
  };

  if (!photoUrl) {
    return null;
  }

  return (
    <div className={className}>
      <img alt="dummy" src="https://picsum.photos/seed/14/500/400?grayscale" />
      <div className="board" onMouseUp={handleMouseUp} />
      <ColorIndicators />
    </div>
  );
};

export default styled(GuidedPhoto)`
  flex: 0 0 300px;
  display: inline-block;
  position: relative;
  line-height: normal;
  user-select: none;

  img {
    line-height: normal;
    vertical-align: middle;
    pointer-events: none;
  }

  .board {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
