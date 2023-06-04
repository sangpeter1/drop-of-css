import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ onColorChange }) => {
  const [color, setColor] = useState("#ffffff");

  const handleChange = (newColor) => {
    setColor(newColor.hex);
    onColorChange(newColor.hex.replace("#", ""));
  };

  return (
    <div style={{ marginBottom: "1rem", flex: 1 }}>
      <SketchPicker color={color} onChange={handleChange} />
      {/* <p>Selected color: {color}</p> */}
    </div>
  );
};

export default ColorPicker;
