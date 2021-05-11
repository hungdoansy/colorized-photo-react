import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

import { selectColor } from "../store";

const ColorPicker = () => {
  const [localSelectedColor, setLocalSelectedColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  useEffect(() => {
    const { r, g, b, a } = localSelectedColor;
    selectColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  }, [localSelectedColor]);

  return (
    <SketchPicker
      color={localSelectedColor}
      onChange={(color) => {
        setLocalSelectedColor(color.rgb);
      }}
    />
  );
};

export default ColorPicker;
