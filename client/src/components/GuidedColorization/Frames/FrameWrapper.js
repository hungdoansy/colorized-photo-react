import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { Form } from "@ahaui/react";
import { useState } from "@hookstate/core";

import guidedColorizationStore, { selectFrameById } from "../store";

const FrameWrapper = ({ className, id }) => {
  console.log("id", id);
  const frame = useState(guidedColorizationStore.frameById[id]).get();
  const selectedFrameId = useState(guidedColorizationStore.selectedFrameId).get();

  const wasColorized = !!frame.colorizedObjectUrl;
  const isSelected = selectedFrameId === id;

  const handleSelect = () => {
    if (!isSelected) {
      selectFrameById(id);
    }
  };

  return (
    <div className={classNames(className, "u-roundedMedium u-overflowHidden")}>
      <img alt="dummy" src={frame.objectUrl} />

      {wasColorized && (
        <div className="colorized-overlay">
          <span className="u-text500 u-fontMedium u-textWhite">Colorized</span>
        </div>
      )}

      <div className="selector-wrapper u-cursorPointer" onClick={handleSelect}>
        <span className="u-text500 u-fontMedium u-textWhite">{isSelected ? "Unselect" : "Select to colorize"}</span>
      </div>

      <div className="check-wrapper">
        <Form.Check
          id={`radio-${id}`}
          type="radio"
          name="selected-frame-radio"
          checked={isSelected}
          onChange={handleSelect}
          className="custom-radio"
        />
      </div>
    </div>
  );
};

export default styled(FrameWrapper)`
  display: inline-block;
  position: relative;
  width: 100%;

  vertical-align: middle;
  user-select: none;

  img {
    width: 100%;
    height: auto;
  }

  &:hover {
    .selector-wrapper {
      visibility: visible;
    }

    .colorized-overlay {
      visibility: hidden;
    }
  }

  .colorized-overlay {
    position: absolute;
    top: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selector-wrapper {
    visibility: hidden;

    position: absolute;
    top: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .check-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;

    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;

    padding-left: 8px;
    padding-right: 8px;
  }
`;
