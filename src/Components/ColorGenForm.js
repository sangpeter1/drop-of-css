import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchColorPalette } from "../store";
import ColorPicker from "./ColorPicker";

const ColorGenForm = ({ openColorsInPreview }) => {
  const dispatch = useDispatch();
  const [format, setFormat] = useState("");
  const [hex, setHex] = useState("");
  const [mode, setMode] = useState("");
  const [count, setCount] = useState("");
  const [colorPalette, setColorPalette] = useState([]);
  const [generatedColors, setGeneratedColors] = useState([]);

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
      <div className="ColorGen">
        <div>
          <ColorPicker onColorChange={handleColorChange} />
        </div>
        <div>
          <div>
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
              <button className="rainbowBtn" type="submit" onClick={(ev) => runCPG(ev)}>
                Submit
              </button>
            </form>
          </div>
        </div>
        <div id="cpg-container">
          {/* {console.log(colorPalette)} */}
          {colorPalette
            ? colorPalette.map((color, index) => {
                const uniqueKey = `color-${index}`;
                return (
                  <div
                    id="cpg-color"
                    key={uniqueKey}
                    style={{
                      boxSizing: "border-box",
                      backgroundColor: color.hex.value,
                      alignItems: "center",
                      width: `calc(500px/${colorPalette.length})`,
                      textAlign: "center",
                    }}
                  >
                    {color.hsv.v < 70 ? (
                      <div style={{ color: "#FCFCFC", alignItems: "center" }}>
                        {color.name.value}
                        <br />
                        {color.hex.value}
                      </div>
                    ) : (
                      <div style={{ color: "#000000" }}>
                        {color.name.value}
                        <br />
                        {color.hex.value}
                      </div>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default ColorGenForm;
