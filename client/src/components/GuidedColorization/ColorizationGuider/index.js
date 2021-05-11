import React from "react";

import ColorPicker from "./ColorPicker";
import Points from "./Points";
import Board from "./Board";

const ColorizationGuider = () => {
  return (
    <div className="u-flex u-justifyContentAround u-alignItemsCenter">
      <ColorPicker />
      <Board />
      <Points />
    </div>
  );
};

export default ColorizationGuider;
