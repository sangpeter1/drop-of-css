import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hex, setHex] = useState("");
  const [format, setFormat] = useState(""); //this will be deleted -- we'll pick a format and hard code
  const [mode, setMode] = useState("");
  const [count, setCount] = useState("");

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

  const runCPG = (ev) => {
    // ev.preventDefault();
    console.log(ev);
    console.log(hex, mode, count);
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        <form onSubmit={runCPG()}>
          <input
            value={hex}
            onChange={(ev) => setHex(ev.target.value)}
            placeholder="Insert Hex Code"
          />
          <select value={mode} onChange={(ev) => setMode(ev.target.value)}>
            {cpgModes.map((mode) => {
              return (
                <option value={mode} key={mode.id}>
                  {mode}
                </option>
              );
            })}
          </select>
          <select value={count} onChange={(ev) => setCount(ev.target.value)}>
            {cpgCounts.map((count) => {
              return (
                <option value={count} key={count.id}>
                  {count}
                </option>
              );
            })}
          </select>
          <button>Submit</button>
        </form>
      </div>

      <div>
        Welcome {auth.username} I'm going to leave this here, even though we
        probably won't use it in our final project.!!
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
