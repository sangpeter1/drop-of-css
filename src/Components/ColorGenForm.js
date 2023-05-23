import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchColorPalette } from "../store";

const ColorGenForm = () => {
    
  const dispatch = useDispatch();
  //const { cpg } = useSelector((state) => state);
  
  const [format, setFormat] = useState(""); 
  const [hex, setHex] = useState("");
  const [mode, setMode] = useState("");
  const [count, setCount] = useState("");
  const [colorPalette, setColorPalette] = useState([]);


 /* useEffect(() => {
    console.log(colorPalette);
  }, [colorPalette]);*/

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

  const cpgCounts = [3, 4, 5, 6];

 /* const runCPG = async (ev) => {
    ev.preventDefault();
    console.log(hex, mode, count);
    try {
      const response = await dispatch(fetchColorPalette({ hex, mode, count }));
      await setColorPalette(response.colors);
      console.log(colorPalette);
    } catch (error) {
      console.error(error);
    }
  };*/
  /*
const runCPG = async (ev) => {
  ev.preventDefault();
  console.log(hex, mode, count);
  try {
    const response = await dispatch(fetchColorPalette({ hex: hex, mode: mode, count: count }));
    await setColorPalette(response.colors);
    console.log(colorPalette);
  } catch (error) {
    console.error(error);
  }
};*/

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

  return (
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
                    backgroundColor: color.hex.value,
                    width: `calc(400px)/${colorPalette.length}`,
                  }}
                >
                  {color.hex.value}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};


export default ColorGenForm;