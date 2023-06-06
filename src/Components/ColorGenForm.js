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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

//reorder functions
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  // styles we need to apply on draggables
  ...draggableStyle,
  userSelect: "none",
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

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
  //might need to be colorPalette? idk
  const [items, setItems] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  /*
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
  const handleGenColors = (colorPalette) => {
    // console.log("open in preview...", colorPalette);
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
      //localStorage.setItem("colorPalette", JSON.stringify(updatedColorPalette));
    } catch (error) {
      console.log(error);
    }
  };

  // works with color picker
  const handleColorChange = (newHex) => {
    setHex(newHex);
  };

  const toggleColorLock = async (index, color) => {
    // console.log("color locked", color.hex.value);
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
    try {
      const unlocked = colorPalette.filter((_color) => !locked.includes(_color));
      const rgbVals = unlocked
        .filter((_color) => _color.hsl.s > 20)
        .map((_color) => _color.rgb.r + _color.rgb.g + _color.rgb.b)
        .sort((a, b) => b - a);
      const brightest = unlocked.find(
        (_color) => _color.rgb.r + _color.rgb.g + _color.rgb.b === rgbVals[0]
      );

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
      // localStorage.setItem("colorPalette", JSON.stringify(updatedColorPalette));
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

  // useEffect(() => {
  //   if (colorPalette.length > 0) {
  //     console.log("use effect cp length >0", colorPalette);
  //   } else {
  //     console.log("empty", colorPalette);
  //   }
  // }, [colorPalette]);

  //reorder functions
  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = reorder(colorPalette, result.source.index, result.destination.index);

    await setColorPalette(updatedItems);
    await handleGenColors(updatedItems);

    // console.log(
    //   "color palette AFTER DRAGGING",
    //   colorPalette.map((color) => color.name.value)
    // );
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
                <button className="rainbowBtn" type="submit" onClick={(ev) => runCPG(ev)}>
                  Submit
                </button>
              </form>
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
                onClick={() => shuffleUnlockedColors()}
              >
                <ShuffleIcon />
                <span
                  style={{
                    fontSize: "calc(8px + .5vw)",
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
                    fontSize: "calc(8px + .5vw)",
                  }}
                >
                  clear all colors
                </span>
              </div>
            </div>
            <div id="cpg-container">
              {/* reorder stuff beginning */}
              {/* {console.log(
                "color palette BEFORE DRAGGING",
                colorPalette.map((color) => color.name.value)
              )} */}

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {colorPalette.map((color, index) => {
                        const uniqueKey = `color-${index}`;
                        const isLocked = lockedColors.includes(color) ? (
                          <LockIcon sx={{ color: color.hsl.l < 65 ? "white" : "black" }} />
                        ) : (
                          <LockOpenIcon sx={{ color: color.hsl.l < 65 ? "white" : "black" }} />
                        );
                        return (
                          <Draggable key={uniqueKey} draggableId={uniqueKey} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                // style={getItemStyle(
                                //   snapshot.isDragging,
                                //   provided.draggableProps.style
                                // )}
                              >
                                {/* content */}
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
                                      fontSize: "calc(8px + .5vw)",
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
                                    <span onClick={() => toggleColorLock(index, color)}>
                                      {isLocked}
                                    </span>
                                  </div>
                                </div>
                                {/* content end */}
                              </div>
                            )}
                          </Draggable>
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
          <div id="cpg-container" style={{ height: "2rem", fontStyle: "italic" }}>
            select a color, please!
          </div>
        )}
      </div>
    </>
  );
};

export default ColorGenForm;
