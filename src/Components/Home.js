import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents, logout } from "../store";
import { fetchColorPalette } from "../store";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hex, setHex] = useState("");
  const [format, setFormat] = useState(""); //this will be deleted -- we'll pick a format and hard code
  const [mode, setMode] = useState("");
  const [count, setCount] = useState("");
  const [colorPalette, setColorPalette] = useState([]);
  const [components, setComponents] = useState("");

  useEffect(() => {
    dispatch(fetchComponents());
    // async function fetchData() {
    //   const response = await dispatch(fetchComponents());
    //   console.log("use effect response", response);
    //   setComponents(response);
    // }
    // fetchData();
  }, []);

  // if (!components) {
  //   return null;
  // }
  console.log(components, "components");

  useEffect(() => {
    console.log(colorPalette);
  }, [colorPalette]);

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

  const runCPG = async (ev) => {
    ev.preventDefault();
    console.log(hex, mode, count);
    try {
      const response = await dispatch(fetchColorPalette({ hex, mode, count }));
      await setColorPalette(response.colors);
      console.log(colorPalette);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
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
                <option value={mode} key={mode.id}>
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
                <option value={count} key={count.id}>
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
          ? colorPalette.map((color) => {
              return (
                <div
                  id="cpg-color"
                  key={color.id}
                  style={{
                    backgroundColor: color.hex.value,
                    width: `calc(400px)/${colorPalette.length}`,
                  }}
                >
                  {color.hex.value}
                </div>
              );
            })
          : ""}
      </div>
      {components ? components[0].htmlText : "nada"}
      <div>
        Welcome {auth.username} I'm going to leave this here, even though we
        probably won't use it in our final project.!!
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
