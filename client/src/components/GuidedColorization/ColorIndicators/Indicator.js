/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import classNames from "classnames";
import React from "react";
import styled from "styled-components";

import { highlightPointById, unhighlightPoint } from "../store";

const OuterCircleRadius = 10;
const InnerCircleRadius = 2;

const Indicator = ({ className, id, y, x, backgroundColor, isHighlighted }) => {
  return (
    <div
      className={classNames(className, "u-flex u-justifyContentCenter u-alignItemsCenter u-cursorPointer")}
      style={{
        top: y - OuterCircleRadius,
        left: x - OuterCircleRadius,
        width: OuterCircleRadius * 2 + 1,
        height: OuterCircleRadius * 2 + 1,
      }}
      data-highlight={isHighlighted}
      onMouseEnter={() => highlightPointById(id)}
      onMouseOver={() => highlightPointById(id)}
      onMouseLeave={() => unhighlightPoint()}
    >
      <div
        style={{
          backgroundColor,
          width: InnerCircleRadius * 2 + 1,
          height: InnerCircleRadius * 2 + 1,
        }}
      />
    </div>
  );
};

export default styled(Indicator)`
  position: absolute;
  border-radius: 500px;
  transition-property: border background;
  transition-duration: 0.2s;
  border: 1px solid transparent;
  background-color: transparent;

  div {
    border-radius: 500px;
  }

  &:hover,
  &[data-highlight="true"] {
    border: 1px solid black;
    background-color: rgba(255, 255, 255, 0.4);
  }
`;
