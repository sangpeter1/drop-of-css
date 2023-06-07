import axios from "axios";

function getRandomNumber(count) {
  if (count === 0) {
    return 0;
  }
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 5);
  return randomNumber;
}
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

//store needs set palette, update color, update colorpalette, delete color, reorder colorpalette (which could be set?)
const cpg = (state = [], action) => {
  if (action.type === "SET_COLORPALETTE") {
    console.log(action.cpg, "action cpg");
    return action.cpg;
  }
  if (action.type === "UPDATE_COLORPALETTE") {
    console.log("store cp update state", state, action.remove, action.colors);
    const deletedColorIds = action.remove.map((color) => color.hex.clean);
    state = state.filter((color) => !deletedColorIds.includes(color.hex.clean));
    if ([...state, ...action.colors].length > 4) {
      trimColorPalette([...state, ...action.colors]);
    }
    return [...state, ...action.colors];
  }
  if (action.type === "UPDATE_COLOR") {
    console.log("individual color state before update", state, action.color);
    return [action.color, ...state];
  }

  if (action.type === "DELETE_COLORS") {
    console.log("delete_colors state");
    const deletedColorIds = action.colors.map((color) => color.hex.clean);
    return state.filter((color) => !deletedColorIds.includes(color.hex.clean));
  }
  return state;
};

export const fetchColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode, count } = search;
    console.log("fetch in store", hex, mode, count);
    const response = await axios.post("/api/cpg", { hex, mode, count });
    dispatch({ type: "SET_COLORPALETTE", cpg: response.data.colors });
    // return response.data.colors;
  };
};

//need a couple of things here to make this cleaner. we need updateColor, updateColorPalette, deleteColor, deleteColorPalette, reorderColors
//react components are too messy with things that should be in the store
//stop using return and just update the state

export const updateColorPalette = (search) => {
  //this should add new colors to the remaining available slots of colors
  return async (dispatch) => {
    const { hex, mode, count } = search;
    const colorsToRemove = search.unlocked;
    console.log("updateColorPalette in store", colorsToRemove);
    const response = await axios.put("/api/cpg", { hex, mode, count });
    console.log("colors to replace in update func", response.data.colors);
    dispatch({ type: "UPDATE_COLORPALETTE", remove: colorsToRemove, colors: response.data.colors });
  };
};

export const updateColor = (search) => {
  return async (dispatch) => {
    const { hex, mode, count } = search;
    console.log("updateColor in store");
    const response = await axios.put("/api/cpg", { hex, mode, count });
    console.log("new color in updateColor in store", response.data);
    dispatch({ type: "UPDATE_COLOR", color: response.data });
  };
};

export const deleteColor = (color) => {
  return async (dispatch) => {
    console.log("deleteColor in store", color);
    dispatch({ type: "DELETE_COLOR", color });
  };
};

export const deleteColorPalette = (colors) => {
  return async (dispatch) => {
    console.log("deleteColor in store", colors);
    dispatch({ type: "DELETE_COLORS", colors });
  };
};

export default cpg;
