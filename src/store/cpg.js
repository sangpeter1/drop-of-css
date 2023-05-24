import axios from "axios";

const cpg = (state = null, action) => {
  if (action.type === "SET_COLORPALETTE") {
    return action.cpg;
  }
  return state;
};

export const fetchColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode, count } = search;
    const response = await axios.post("/api/cpg", { hex, mode, count });
    console.log("cpg store", response.data);
    dispatch({ type: "SET_COLORPALETTE", cpg: response.data });
    return response.data;
  };
};

export default cpg;
