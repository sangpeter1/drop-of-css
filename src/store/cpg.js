import axios from "axios";

function getRandomNumber() {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 5);
  return randomNumber;
}
const randomNum = getRandomNumber();

const cpg = (state = [], action) => {
  if (action.type === "SET_COLORPALETTE") {
    console.log(action.cpg, "action cpg");
    return action.cpg;
  }
  if (action.type === "UPDATE_COLORPALETTE") {
    console.log("state before update", state, action.color[randomNum]);
    return [action.color[0], ...state];
  }
  if (action.type === "DELETE_COLOR") {
    console.log("action.color", action.colorOrColors);
    console.log(state);
    return state.filter((_color) => {
      return _color.hex !== action.colorOrColors.hex;
    });
  }
  return state;
};

export const fetchColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode, count } = search;
    const response = await axios.post("/api/cpg", { hex, mode, count });
    dispatch({ type: "SET_COLORPALETTE", cpg: response.data.colors });
    return response.data.colors;
  };
};

export const updateColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode, count } = search;
    const colorOrColors = search.color ? search.color : search.unlocked;
    console.log("color to delete in update func", colorOrColors);
    const response = await axios.put("/api/cpg", { hex, mode, count });
    console.log("colors to replace in update func", response.data.colors);
    dispatch({ type: "DELETE_COLOR", colorOrColors });
    dispatch({ type: "UPDATE_COLORPALETTE", color: response.data.colors });
    return response.data.colors;
  };
};

export default cpg;
