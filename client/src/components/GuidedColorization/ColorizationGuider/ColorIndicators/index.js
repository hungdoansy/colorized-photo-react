import { useHookstate } from "@hookstate/core";
import React from "react";

import Indicator from "./Indicator";
import guidedColorizationStore from "../../store";

const ColorIndicators = () => {
  const points = useHookstate(guidedColorizationStore.points).get();
  const highlightedPointId = useHookstate(guidedColorizationStore.highlightPointId).get();

  return (
    <React.Fragment>
      {points.map((point) => (
        <Indicator
          key={point.id}
          id={point.id}
          x={point.coords.x}
          y={point.coords.y}
          backgroundColor={point.color}
          isHighlighted={highlightedPointId === point.id}
        />
      ))}
    </React.Fragment>
  );
};

export default ColorIndicators;
