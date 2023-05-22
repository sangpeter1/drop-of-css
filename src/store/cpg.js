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
    const response = await axios.get("/api/cpg", {
      params: { hex: hex, mode: mode, count: count },
    });
    dispatch({ type: "SET_COLORPALETTE", palette: response.data });
  };
};

export default cpg;
