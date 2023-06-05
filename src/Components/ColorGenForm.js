import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchColorPalette, updateColorPalette } from "../store";
import ColorPicker from "./ColorPicker";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { color } from "@mui/system";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
  const [expanded, setExpanded] = useState(true);
  const [lockedColors, setLockedColors] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const storedColorPalette = localStorage.getItem("colorPalette");
    if (storedColorPalette) {
      try {
        const parsedColorPalette = JSON.parse(storedColorPalette);
        setColorPalette(parsedColorPalette);
        handleGenColors(parsedColorPalette);
      } catch (error) {
        console.error("Error parsing stored color palette:", error);
      }
    } else {
      setColorPalette(null);
    }
  }, []);

  const handleGenColors = (colorPalette) => {
    console.log("open in preview...", colorPalette);
    openColorsInPreview(colorPalette);
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
  const getRandomOption = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };
  const randomMode = getRandomOption(cpgModes);
  const cpgCounts = [3, 4, 5];

  const runCPG = async (ev) => {
    ev.preventDefault();
    const locked = lockedColors.filter((_color) => typeof _color === "object");
    try {
      const search = {
        hex,
        mode,
      };
      const updatedCount = locked.length > 0 ? 5 - locked.length : count;
      search.count = updatedCount;
      const response = await dispatch(fetchColorPalette(search));
      const updatedColorPalette = [...locked, ...response];
      await setColorPalette(updatedColorPalette);
      await handleGenColors(updatedColorPalette);
      localStorage.setItem("colorPalette", JSON.stringify(updatedColorPalette));
    } catch (error) {
      console.log(error);
    }
  };

  // works with color picker
  const handleColorChange = (newHex) => {
    setHex(newHex);
  };

  const toggleColorLock = async (index, color) => {
    console.log("color locked", color.hex.value);
    await setLockedColors((prevLockedColors) => {
      if (prevLockedColors.includes(index)) {
        return prevLockedColors.filter((lockedIndex) => lockedIndex !== index);
      } else {
        return [...prevLockedColors, index, color];
      }
    });
  };

  const shuffleUnlockedColors = async () => {
    const locked = lockedColors.filter((_color) => typeof _color === "object");
    console.log("locked colors in shuffle func", locked);
    try {
      const unlocked = colorPalette.filter((_color) => !locked.includes(_color));
      const rgbVals = unlocked
        .filter((_color) => _color.hsl.s > 20)
        .map((_color) => _color.rgb.r + _color.rgb.g + _color.rgb.b)
        .sort((a, b) => b - a);
      const brightest = unlocked.find(
        (_color) => _color.rgb.r + _color.rgb.g + _color.rgb.b === rgbVals[0]
      );
      console.log("unlocked", unlocked, "unlocked length", unlocked.length, "brightest", brightest);
      const response = await dispatch(
        updateColorPalette({
          unlocked,
          hex: brightest.hex.clean,
          mode: randomMode,
          count: unlocked.length,
        })
      );
      const updatedColorPalette = [...locked, ...response];
      setColorPalette(updatedColorPalette);
      handleGenColors(updatedColorPalette);
      console.log("newcp -- shuffle", updatedColorPalette, "colors that are still locked", locked);
      localStorage.setItem("colorPalette", JSON.stringify(updatedColorPalette));
    } catch (err) {
      console.log(err);
    }
  };

  //function is broken.
  // const regenColor = async (color) => {
  //   console.log("change one color");
  //   if (lockedColors.includes(color)) {
  //     console.log("This color's locked.");
  //     return;
  //   }
  //   try {
  //     const response = await dispatch(
  //       updateColorPalette({
  //         color,
  //         hex: color.hex.clean,
  //         mode: randomMode,
  //         count: 5,
  //       })
  //     );
  //     const updatedColorPalette = colorPalette.map((_color) =>
  //       _color.hex.clean === color.hex.clean ? response : _color
  //     );
  //     setColorPalette(updatedColorPalette);
  //     handleGenColors(updatedColorPalette);
  //     localStorage.setItem("colorPalette", JSON.stringify(updatedColorPalette));
  //     console.log("newcp -- single color change", updatedColorPalette);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (colorPalette.length > 0) {
      console.log("use effect cp length >0", colorPalette);
    } else {
      console.log("empty", colorPalette);
    }
  }, [colorPalette]);

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
                <button className="rainbowBtn" type="submit" onClick={(ev) => runCPG(ev)}>
                  Submit
                </button>
              </form>
            </div>
          </Collapse>
        </div>
        {/* END COLLAPSE HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}

        {console.log("color palette in return statement", colorPalette)}
        {colorPalette.length > 0 ? (
          <>
            <div
              style={{
                flex: "1 1 100%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                fontSize: "1rem",
              }}
            >
              <div
                className="pointer-on-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => shuffleUnlockedColors()}
              >
                <ShuffleIcon />
                <span
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  shuffle colors
                </span>
              </div>
              <div
                className="pointer-on-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => setColorPalette([])}
              >
                <DeleteOutlineIcon />
                <span
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  clear all colors
                </span>
              </div>
            </div>
            <div id="cpg-container">
              {colorPalette.map((color, index) => {
                const uniqueKey = `color-${index}`;
                const isLocked = lockedColors.includes(color) ? (
                  <LockIcon sx={{ color: color.hsl.l < 65 ? "white" : "black" }} />
                ) : (
                  <LockOpenIcon sx={{ color: color.hsl.l < 65 ? "white" : "black" }} />
                );

                return (
                  <div
                    className="cpg-color"
                    id={uniqueKey}
                    key={uniqueKey}
                    style={{
                      display: "flex",
                      backgroundColor: color.hex.value,
                      alignItems: "center",
                      textAlign: "left",
                      height: `calc(24vh / ${colorPalette.length})`,
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "1rem",
                        color: color.hsl.l < 50 ? "#FCFCFC" : "#000000",
                        flexGrow: 1,
                      }}
                    >
                      {color.name.value} {color.hex.value}
                    </div>

                    <div
                      className="pointer-on-hover"
                      style={{ marginLeft: "auto", marginRight: "1rem" }}
                    >
                      {/* <ShuffleIcon
                        style={{
                          color: color.hsl.l < 65 ? "white" : "black",
                          marginRight: "1rem",
                        }}
                        //regen is broken
                        // onClick={() => regenColor(color)}
                      /> */}
                      <span onClick={() => toggleColorLock(index, color)}>{isLocked}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div id="cpg-container" style={{ height: "2rem", fontStyle: "italic" }}>
            select a color, please!
          </div>
        )}
      </div>
    </>
  );
};

export default ColorGenForm;
