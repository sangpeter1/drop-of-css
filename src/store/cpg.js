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

const cpg = (state = [], action) => {
  if (action.type === "SET_COLORPALETTE") {
    // console.log(action.cpg, "action cpg");
    return action.cpg;
  }
  if (action.type === "SET_LOCALLYSAVED_COLORPALETTE") {
    // console.log(action.colors, "action colors");
    return action.colors;
  }
  if (action.type === "REORDER_COLORPALETTE") {
    return [...action.colors];
  }
  if (action.type === "UPDATE_COLORPALETTE") {
    const deletedColorIds = action.remove.map((color) => color.hex.clean);
    state = state.filter((color) => !deletedColorIds.includes(color.hex.clean));
    if (!action.colors.length) {
      return trimColorPalette([...state, action.colors]);
    } else if ([...state, ...action.colors].length > 4) {
      return trimColorPalette([...state, ...action.colors]);
    } else {
      return [...state, ...action.colors];
    }
  }
  if (action.type === "UPDATE_COLOR") {
    // console.log("individual color state before update", state);
    // console.log("state splice", state.splice(action.index, 1, action.color));
    state.splice(action.index, 1, action.color);
    // console.log("update color state splice and filter", state);
    return [...state];
  }

  if (action.type === "DELETE_COLORS") {
    // console.log("delete_colors state");
    const deletedColorIds = action.colors.map((color) => color.hex.clean);
    return state.filter((color) => !deletedColorIds.includes(color.hex.clean));
  }
  return state;
};

export const fetchColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode } = search;
    // console.log("fetch in store", hex, mode);
    const response = await axios.post("/api/cpg", { hex, mode });
    // console.log("in the store response", response.data);
    dispatch({ type: "SET_COLORPALETTE", cpg: response.data });
  };
};

export const locallyStoredColorPalette = (savedColors) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOCALLYSAVED_COLORPALETTE", colors: savedColors });
  };
};

export const reorderColorPalette = (reorderedItems) => {
  return async (dispatch) => {
    dispatch({ type: "REORDER_COLORPALETTE", colors: reorderedItems });
  };
};

export const updateColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode, count } = search;
    const colorsToRemove = search.unlocked;
    const response = await axios.put("/api/cpg", { hex, mode, count });
    if (!response.data.colors) {
      dispatch({ type: "UPDATE_COLORPALETTE", remove: colorsToRemove, colors: response.data });
    }
    dispatch({ type: "UPDATE_COLORPALETTE", remove: colorsToRemove, colors: response.data.colors });
  };
};

export const updateColor = (search) => {
  return async (dispatch) => {
    const { color, colorIndex, hex, mode, count } = search;
    const colorToRemove = color;
    // console.log("updateColor in store color to remove", colorToRemove);
    const response = await axios.put("/api/cpg", { hex, mode, count });
    // console.log("response updateColor in store", response.data);
    dispatch({
      type: "UPDATE_COLOR",
      index: colorIndex,
      remove: colorToRemove,
      color: response.data,
    });
  };
};

export const deleteColor = (color) => {
  return async (dispatch) => {
    // console.log("deleteColor in store", color);
    dispatch({ type: "DELETE_COLOR", color });
  };
};

export const deleteColorPalette = (colors) => {
  return async (dispatch) => {
    // console.log("deleteColor in store", colors);
    dispatch({ type: "DELETE_COLORS", colors });
  };
};

export default cpg;
