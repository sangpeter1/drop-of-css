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
  const getRandomOption = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };
  const randomMode = getRandomOption(cpgModes);

  const cpgCounts = [3, 4, 5];

  const runCPG = async (ev) => {
    ev.preventDefault();
    try {
      const search = { hex, mode, count };
      const response = await dispatch(fetchColorPalette(search));
      await setColorPalette(response);
      handleGenColors(response);
    } catch (error) {
      console.error(error);
    }
  };

  // works with color picker
  const handleColorChange = (newHex) => {
    setHex(newHex);
  };

  const toggleColorLock = async (index, color) => {
    await setLockedColors((prevLockedColors) => {
      if (prevLockedColors.includes(index)) {
        return prevLockedColors.filter((lockedIndex) => lockedIndex !== index);
      } else {
        return [...prevLockedColors, index, color];
      }
    });
    await console.log("locked colors function", index, color);
  };

  const regenerateColors = async (color) => {
    console.log("shuffle the colors");
    if (lockedColors.includes(color)) {
      console.log("No can do, boss. This one's locked.");
      return;
    }

    try {
      console.log(color.hex.clean);
      const response = await dispatch(
        updateColorPalette({
          color,
          hex: color.hex.clean,
          mode: randomMode,
          count: 5,
        })
      );

      console.log("front end shuff response", response);

      const updatedColorPalette = colorPalette.map((_color) =>
        _color.hex.clean === color.hex.clean ? response : _color
      );

      setColorPalette(updatedColorPalette);
      handleGenColors(updatedColorPalette);
      console.log("new color palette", updatedColorPalette);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("use effect", colorPalette);
    // Perform actions when colorPalette changes
    if (colorPalette.length > 0) {
      console.log(colorPalette);
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
        {/* {console.log(colorPalette)} */}
        {colorPalette.length > 0 ? (
          <div id="cpg-container">
            {colorPalette.map((color, index) => {
              const uniqueKey = `color-${index}`;
              const isLocked = lockedColors.includes(index) ? (
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
                      color: color.hsl.l < 65 ? "#FCFCFC" : "#000000",
                      flexGrow: 1,
                    }}
                  >
                    {color.name.value} {color.hex.value}
                  </div>

                  <div style={{ marginLeft: "auto", marginRight: "1rem" }}>
                    <ShuffleIcon
                      style={{
                        color: color.hsl.l < 65 ? "white" : "black",
                        marginRight: "1rem",
                      }}
                      onClick={() => regenerateColors(color)}
                    />
                    <span onClick={() => toggleColorLock(index, color)}>{isLocked}</span>
                  </div>
                </div>
              );
            })}
          </div>
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
