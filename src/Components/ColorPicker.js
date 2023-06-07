import React, { useState } from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import { useMediaQuery } from "@mui/material";

const ColorPicker = ({ onColorChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const handleChange = async (newColor) => {
    setColor(newColor.hex);
    onColorChange(newColor.hex.replace("#", ""));
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const styles = reactCSS({
    default: {
      color: {
        boxSizing: "border-box",
        width: "100%",
        // width: "calc(10px + 10vw)",
        height: "14px",
        borderRadius: "2px",
        background: `${color ? color : "#ffffff"}`,
      },
      swatch: {
        boxSizing: "border-box",
        width: "100%",
        // maxWidth: "20vw",
        // minWidth: "15vw",
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const isLargeScreen = useMediaQuery("(min-width: 750px)");

  return (
    <>
      {isLargeScreen ? (
        <div style={{ marginBottom: "1rem", flex: 1 }}>
          <SketchPicker color={color} onChange={handleChange} />
          {/* <p>Selected color: {color}</p> */}
        </div>
      ) : (
        <div>
          <div style={styles.swatch} onClick={handleClick}>
            <div style={styles.color} />
          </div>
          {displayColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={handleClose} />
              <SketchPicker color={color} onChange={handleChange} />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

//   return (
//     <div style={{ marginBottom: "1rem", flex: 1 }}>
//       <SketchPicker color={color} onChange={handleChange} />
//       {/* <p>Selected color: {color}</p> */}
//     </div>
//   );
// };

export default ColorPicker;
