import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch, getState } from "react-redux";
import {
  deleteColor,
  deleteColorPalette,
  fetchColorPalette,
  updateColorPalette,
  updateColor,
  reorderColorPalette,
} from "../store";
import ColorPicker from "./ColorPicker";

import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";

import WallpaperIcon from "@mui/icons-material/Wallpaper";

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

const getRandomHexCode = () => {
  const characters = "0123456789ABCDEF";
  let hexCode = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hexCode += characters[randomIndex];
  }

  return hexCode;
};

//reorder functions
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightgray" : "",
  // borderRadius: isDraggingOver ? ".5rem" : "",
});

const ColorGenForm = ({ openColorsInPreview, wholePageBackground, setWholePageBackground }) => {
  const { cpg } = useSelector((state) => state);
  const [format, setFormat] = useState("");
  const [hex, setHex] = useState("");
  const [mode, setMode] = useState("");
  const [count, setCount] = useState("");
  const [colorPalette, setColorPalette] = useState([]);
  // const [generatedColors, setGeneratedColors] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [lockedColors, setLockedColors] = useState([]);
  const [items, setItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(cpg, "in useEffect, every time cpg changes");
    setColorPalette(cpg);
  }, [cpg]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  /*
  local storage functions. would be nice to get this going
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
*/
  const handleGenColors = (cpg) => {
    openColorsInPreview(cpg);
  };

  const cpgModes = [
    "monochrome",
    "primary accent",
    "complementary accent",
    "monochrome-light",
    "analogic",
    "complement",
    "analogic-complement",
    "triad",
    "quad",
    "pastel",
  ];

  const getRandomOption = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };
  const randomMode = getRandomOption(cpgModes);
  const cpgCounts = [2, 3, 4];

  const runCPG = async (ev) => {
    ev.preventDefault();
    console.log("runcpg ev", hex);

    if (!hex) {
      console.log("no hex");
      setErrorMessage("red");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);

      return;
    }

    if (hex && cpg.length === 0) {
      try {
        const search = {
          hex,
          mode,
          count,
        };
        // const response =
        console.log("runCPG func", search);
        dispatch(fetchColorPalette(search));
      } catch (error) {
        console.log(error);
      }
      setExpanded(false);
    }

    if (hex && cpg.length > 0 && lockedColors.length === 0) {
      try {
        const search = {
          hex,
          mode,
          count,
        };
        // const response =
        console.log("runCPG func", search);
        dispatch(fetchColorPalette(search));
      } catch (error) {
        console.log(error);
      }
      setExpanded(false);
    }

    if (hex && cpg.length > 0 && lockedColors.length > 0) {
      try {
        const search = {
          hex,
          mode,
        };
        search.count =
          lockedColors.filter((_color) => typeof _color === "object").length > 0
            ? 4 - lockedColors.filter((_color) => typeof _color === "object").length
            : count;
        search.unlocked = colorPalette.filter((_color) => !lockedColors.includes(_color));
        dispatch(updateColorPalette(search));
      } catch (error) {
        console.log(error);
      }
      setExpanded(false);
    }
  };
  // await handleGenColors(trimmedPalette);
  //localStorage.setItem("colorPalette", JSON.stringify(updatedColorPalette));

  // works with color picker
  const handleColorChange = (newHex) => {
    setHex(newHex);
  };

  //for bugs -- keeps the color palette length at 4, but keeps the indicies of locked colors.
  const trimColorPalette = (updatedColorPalette) => {
    const output = [];
    let objCount = 0;
    for (let item of updatedColorPalette) {
      if (typeof item == "number") {
        output.push(item);
      }
      if (typeof item == "object") {
        if (objCount !== 4) {
          output.push(item);
          objCount++;
        } else {
          break;
        }
      }
    }
    return output;
  };

  //new lock func
  const toggleColorLock = (index, color) => {
    // console.log("locked", color.name.value);
    setLockedColors((prevLockedColors) => {
      const colorIndex = prevLockedColors.indexOf(color);
      if (colorIndex >= 0) {
        // Color is already locked, so remove it from lockedColors
        return prevLockedColors.filter((_color) => _color !== color);
      } else {
        // Color is not locked, so add it to lockedColors
        return [...prevLockedColors, color];
      }
    });
  };

  const shuffleUnlockedColors = async () => {
    try {
      if (lockedColors.length === 0) {
        let hex = getRandomHexCode();
        const search = {
          hex,
          mode,
          count,
        };
        // const response =
        console.log("runCPG func", search);
        dispatch(fetchColorPalette(search));
      } else {
        const unlocked = cpg.filter((_color) => !lockedColors.includes(_color));
        const length = unlocked.length;
        console.log("shuffle unlocked", lockedColors, length);
        // let rgbVals =
        //   unlocked
        //     .filter((_color) => _color.hsl.s >= 10)
        //     .filter((_color) => _color.rgb.r + _color.rgb.g + _color.rgb.b > 200)
        //     .filter((_color) => _color.rgb.r + _color.rgb.g + _color.rgb.b < 500)
        //     .sort((a, b) => b - a) || console.log("rgbVals", rgbVals);

        // if (rgbVals.length > 0) {
        //   const hex = rgbVals[Math.floor(Math.random()) * rgbVals.length].hex.clean;
        // } else {
        //   const hex = getRandomHexCode();
        // }

        // console.log("shuffle unlocked colors func unlocked colors", unlocked, hex);

        let search = {
          hex: getRandomHexCode(),
          mode: randomMode,
          count: length,
          unlocked: unlocked,
        };
        console.log("search", search);
        dispatch(updateColorPalette(search));
      }
      // localStorage.setItem("colorPalette", JSON.stringify(updatedColorPalette));
    } catch (err) {
      console.log(err);
    }
  };

  const regenColor = async (color) => {
    // console.log("change one color");

    if (lockedColors.includes(color)) {
      console.log("This color's locked.");

      return;
    }
    try {
      const colorHex = color.hex.clean;
      const colorIndex = cpg.indexOf(color);
      // console.log("color's index", color, colorIndex);

      dispatch(
        updateColor({
          color,
          colorIndex,
          hex: colorHex,
          mode: randomMode,
          count: 1,
        })
      );
      // localStorage.setItem("colorPalette", JSON.stringify(updatedColorPalette));
    } catch (error) {
      console.error(error);
    }
  };

  //reorder functions
  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(colorPalette, result.source.index, result.destination.index);
    // console.log("reordereditems", reorderedItems);
    dispatch(reorderColorPalette(reorderedItems));
    setColorPalette(reorderedItems);
  };

  const colorClass = ["primary color", "secondary color", "tertiary color", "background color"];

  return (
    <>
      {/* <div className="button-container" style={{ display: "block", textAlign: "center" }}> */}
      <h3 className="header" style={{ display: "block", textAlign: "center" }}>
        Create Palette
        <div className="instructions">first your color palette, then a component!</div>
      </h3>
      {/* </div> */}

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
              className="cpg-form-div"
              style={{
                // display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <form onSubmit={runCPG}>
                <input
                  value={hex}
                  onChange={(ev) => setHex(ev.target.value)}
                  placeholder="Insert Hex Code"
                  style={{
                    fontSize: "calc(8px + .5vw)",
                    outline: errorMessage ? `2px solid ${errorMessage}` : "",
                  }}
                />
                <select
                  value={mode}
                  onChange={(ev) => setMode(ev.target.value)}
                  placeholder="Select Mode"
                  style={{
                    fontSize: "calc(8px + .5vw)",
                  }}
                >
                  {cpgModes.map((mode) => {
                    return (
                      <option value={mode} key={mode}>
                        {mode}
                      </option>
                    );
                  })}
                </select>

                {/* <select
                  value={count}
                  onChange={(ev) => setCount(ev.target.value)}
                  placeholder="Select Count"
                  style={{
                    fontSize: "calc(8px + .5vw)",
                  }}
                >
                  {cpgCounts.map((count) => {
                    return (
                      <option value={count} key={count}>
                        {count}
                      </option>
                    );
                  })}
                </select> */}
                <button className="rainbowBtn" type="submit" onClick={(ev) => runCPG(ev)}>
                  Submit
                </button>
              </form>
              <button
                className="setBackgroundButton"
                onClick={(ev) => setWholePageBackground(`${hex}`)}
              >
                set page background
              </button>
            </div>
          </Collapse>
        </div>
        {colorPalette.length > 0 ? (
          <>
            <div
              style={{
                flex: "1 1 100%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                fontSize: "calc(8px + .5vw)",
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
              >
                <div className="button-container" style={{ display: "flex", alignItems: "center" }}>
                  <ShuffleIcon />
                  <span
                    style={{
                      fontSize: "calc(8px + .5vw)",
                    }}
                    onClick={() => shuffleUnlockedColors()}
                  >
                    shuffle
                  </span>
                  <div className="instructions">shuffle only unlocked colors</div>
                </div>
              </div>

              <div
                className="pointer-on-hover"
                style={{
                  display: "flex",
                  margin: "auto",
                  alignItems: "center",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <div className="button-container" style={{ display: "flex", alignItems: "center" }}>
                  <DeleteOutlineIcon />
                  <span
                    style={{
                      fontSize: "calc(8px + .5vw)",
                    }}
                    onClick={() => dispatch(deleteColorPalette(cpg))}
                  >
                    clear all
                  </span>
                  <div className="instructions">clear all colors, even locked ones</div>
                </div>
              </div>
            </div>
            <div id="cpg-container">
              {/* reorder stuff beginning */}

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" key={"1"}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {colorPalette.map((color, index) => {
                        const uniqueKey = `color-${index}`;
                        let isLocked = lockedColors.includes(color) ? (
                          <LockIcon
                            sx={{
                              fontSize: "calc(10px + .5vw)",
                              color: color.contrast.value,
                            }}
                          />
                        ) : (
                          <LockOpenIcon
                            sx={{
                              fontSize: "calc(10px + .5vw)",
                              color: color.contrast.value,
                            }}
                          />
                        );
                        return (
                          <>
                            <div
                              key={`colorClass-${index}`}
                              style={{
                                fontStyle: "italic",
                                fontStretch: "expanded",
                                fontSize: "calc(6px + .5vw)",
                                paddingLeft: "1rem",
                              }}
                            >
                              {colorClass[index]}:
                            </div>
                            <Draggable key={uniqueKey} draggableId={uniqueKey} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {/* content */}

                                  <div
                                    className="cpg-color"
                                    id={uniqueKey}
                                    key={uniqueKey}
                                    style={{
                                      backgroundColor: color.hex.value,
                                      height: `calc(20vh / ${colorPalette.length})`,
                                    }}
                                  >
                                    <div
                                      style={{
                                        paddingLeft: "1vw",
                                        color: color.contrast.value,
                                        flex: "2 1 100%",
                                        fontSize: "calc(8px + .5vw)",
                                      }}
                                    >
                                      {color.name.value} {color.hex.value}
                                    </div>

                                    <div className="pointer-on-hover">
                                      <div className="button-container">
                                        <ShuffleIcon
                                          style={{
                                            color: lockedColors.includes(color)
                                              ? "darkgray"
                                              : color.contrast.value,
                                            marginRight: ".3vw",
                                            marginLeft: ".3vw",
                                            fontSize: "calc(10px + .5vw)",
                                            cursor: lockedColors.includes(color)
                                              ? "auto"
                                              : "pointer",
                                          }}
                                          onClick={() => regenColor(color)}
                                        />
                                        <div className="instructions">shuffle color</div>
                                      </div>
                                      <span
                                        style={{ marginRight: ".3vw", marginLeft: ".3vw" }}
                                      ></span>
                                      <div className="button-container">
                                        <span
                                          style={{ marginRight: ".5vw", marginLeft: ".5vw" }}
                                          onClick={() => toggleColorLock(index, color)}
                                        >
                                          {isLocked}
                                        </span>
                                        <div className="instructions">lock color</div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* content end */}
                                </div>
                              )}
                            </Draggable>
                          </>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* reorder end */}
            </div>
          </>
        ) : (
          // <div
          //   id="cpg-container"
          //   style={{ height: "2rem", fontStyle: "italic", fontSize: "calc(8px + .5vw)" }}
          // >
          //   select a color, please!
          // </div>
          <></>
        )}
      </div>
    </>
  );
};

export default ColorGenForm;
