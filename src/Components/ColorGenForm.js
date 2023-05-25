import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchColorPalette } from "../store";
import ColorPicker from "./ColorPicker";

const ColorGenForm = () => {
  const dispatch = useDispatch();
  const [format, setFormat] = useState("");
  const [hex, setHex] = useState("");
  const [mode, setMode] = useState("");
  const [count, setCount] = useState("");
  const [colorPalette, setColorPalette] = useState([]);

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
    console.log(hex, mode, count);
    try {
      const search = { hex, mode, count }; // Create the search object with properties
      const response = await dispatch(fetchColorPalette(search));
      await setColorPalette(response.colors);
      console.log(colorPalette);
    } catch (error) {
      console.error(error);
    }
  };

  // works with color picker
  const handleColorChange = (newHex) => {
    setHex(newHex);
  };

  return (
    <div className="ColorGen">
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
            <button onClick={(ev) => runCPG(ev)}>Submit</button>
          </form>
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
                      <div style={{ color: "#FCFCFC" }}>
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
      <div>
        <ColorPicker onColorChange={handleColorChange} />
      </div>
    </div>
  );
};

export default ColorGenForm;
