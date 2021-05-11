import React, { useCallback } from "react";
import { useHookstate } from "@hookstate/core";
import styled from "styled-components";
import classNames from "classnames";
import { Button, Icon } from "@ahaui/react";

import guidedColorizationStore, {
  removePointById,
  highlightPointById,
  unhighlightPoint,
  removeAllPoints,
} from "../../store";

const Points = ({ className }) => {
  const points = useHookstate(guidedColorizationStore.points).get();
  const highlightedPointId = useHookstate(guidedColorizationStore.highlightPointId).get();

  return (
    <div
      className={classNames(
        className,
        "u-border u-roundedMedium  u-flex u-flexColumn u-alignItemsCenter u-justifyContentBetween"
      )}
    >
      <div
        className={classNames(
          "points-wrapper",
          "u-widthFull u-flexGrow1 u-flexShrink1",
          "u-paddingExtraSmall u-overflowAuto u-webkitScrollbar"
        )}
      >
        <div className={classNames("points u-flex u-flexRow u-flexWrap")}>
          {points.map((point) => (
            <div
              className="point u-flex u-alignItemsCenter u-roundedMedium"
              key={point.id}
              data-highlighted={highlightedPointId === point.id}
              onMouseEnter={() => highlightPointById(point.id)}
              onMouseLeave={() => unhighlightPoint()}
            >
              <span>
                ({point.coords.y},&nbsp;{point.coords.x})
              </span>
              <span className="color u-roundedMedium" style={{ backgroundColor: point.color }} />
              <Icon
                size="small"
                name="closeCircleOutline"
                className="u-cursorPointer hover:u-textNegative"
                onClick={() => removePointById(point.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={classNames(
          "u-widthFull u-flex u-justifyContentCenter",
          "u-flexGrow0 u-flexShrink0",
          "u-paddingSmall",
          "u-borderTop u-borderWhite"
        )}
      >
        <Button
          style={{
            width: 200,
          }}
          onClick={removeAllPoints}
          className="custom-button u-text300 u-backgroundTransparent"
        >
          Remove all points
        </Button>
      </div>
    </div>
  );
};

export default styled(Points)`
  flex: 0 0 320px;
  height: 382px;
  user-select: none;

  .points-wrapper {
    flex-basis: 100%;
  }

  .points {
    column-gap: 8px;
    row-gap: 8px;
  }

  .point {
    padding-left: 10px;
    padding-right: 10px;
    column-gap: 4px;

    height: 32px;

    border: 1px solid #ecf0f1;
    text-align: center;

    transition: background-color 0.1s linear, color 0.1s linear;

    color: #ecf0f1;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: #bdc3c7;
    }

    &[data-highlighted="true"] {
      background-color: rgba(255, 255, 255, 0.2);
      color: #bdc3c7;
    }

    > span {
      display: inline-block;
    }
  }

  .color {
    width: 16px;
    height: 16px;
  }
`;
