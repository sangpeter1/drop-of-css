import axios from "axios";

const cpg = (state = {}, action) => {
  if (action.type === "SET_COLORPALETTE") {
    return action.cpg;
  }
  return state;
};

export const fetchColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode, count } = search;
    console.log("in the store", hex, mode, count);
    const response = await axios.post("/api/cpg", { hex, mode, count });
    console.log("in the store", response.data);
    dispatch({ type: "SET_COLORPALETTE", palette: response.data });
    return response.data;
  };
};

export default cpg;
