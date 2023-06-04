import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchColorPalette } from "../store";
import ColorPicker from "./ColorPicker";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  margin: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ColorGenForm = ({ openColorsInPreview }) => {
  const dispatch = useDispatch();
  const [format, setFormat] = useState("");
  const [hex, setHex] = useState("");
  const [mode, setMode] = useState("");
  const [count, setCount] = useState("");
  const [colorPalette, setColorPalette] = useState([]);
  const [generatedColors, setGeneratedColors] = useState([]);
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleGenColors = (generatedColors) => {
    console.log("handle colors", generatedColors);
    openColorsInPreview(generatedColors);
  };

  const cpgModes = [
    "monochrome",
    "monochrome-dark",
    "monochrome-light",
    "analogic",
    "complement",
    "analogic-complement",
    "triad",
    "quad",
  ];

  const cpgCounts = [3, 4, 5];

  const runCPG = async (ev) => {
    ev.preventDefault();
    try {
      const search = { hex, mode, count };
      const response = await dispatch(fetchColorPalette(search));
      await setColorPalette(response.colors);
      handleGenColors(response.colors);
    } catch (error) {
      console.error(error);
    }
  };

  // works with color picker
  const handleColorChange = (newHex) => {
    setHex(newHex);
  };

  return (
    <>
      <h3 className="header">Create Palette</h3>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        style={{
          display: "flex",
        }}
      >
        <ExpandMoreIcon />
      </ExpandMore>
      <div className="ColorGen">
        <div
          className="expandButtonContainer"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: " 0 auto",
          }}
        >
          <Collapse
            in={expanded}
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
            }}
            timeout="auto"
            unmountOnExit
          >
            <div
              style={{
                flex: 1,
              }}
            >
              <ColorPicker onColorChange={handleColorChange} />
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              <form onSubmit={runCPG}>
                <input
                  value={hex}
                  onChange={(ev) => setHex(ev.target.value)}
                  placeholder="Insert Hex Code"
                />
                <select
                  value={mode}
                  onChange={(ev) => setMode(ev.target.value)}
                  placeholder="Select Mode"
                >
                  {cpgModes.map((mode) => {
                    return (
                      <option value={mode} key={mode}>
                        {mode}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={count}
                  onChange={(ev) => setCount(ev.target.value)}
                  placeholder="Select Count"
                >
                  {cpgCounts.map((count) => {
                    return (
                      <option value={count} key={count}>
                        {count}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="rainbowBtn"
                  type="submit"
                  onClick={(ev) => runCPG(ev)}
                >
                  Submit
                </button>
              </form>
            </div>
          </Collapse>
        </div>
        {/* END COLLAPSE HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
        {/* {console.log(colorPalette)} */}
        {colorPalette.length > 0 ? (
          <div id="cpg-container">
            {console.log("but is there a cp????", colorPalette)}
            {colorPalette.map((color, index) => {
              const uniqueKey = `color-${index}`;
              return (
                <div
                  id="cpg-color"
                  key={uniqueKey}
                  style={{
                    backgroundColor: color.hex.value,
                    alignItems: "center",
                    textAlign: "left",
                  }}
                >
                  {color.hsl.l < 50 ? (
                    <div style={{ color: "#FCFCFC", alignItems: "center" }}>
                      {color.name.value}
                      {color.hex.value}
                    </div>
                  ) : (
                    <div style={{ color: "#000000" }}>
                      {color.name.value}
                      {color.hex.value}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            id="cpg-container"
            style={{ height: "2rem", fontStyle: "italic" }}
          >
            select a color, please!
          </div>
        )}
      </div>
    </>
  );
};

export default ColorGenForm;
