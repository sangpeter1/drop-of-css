import axios from "axios";

const components = (state = [], action) => {
  if (action.type === "SET_COMPONENTS") {
    return action.components;
  }
  if (action.type === "SET_COLORS") {
    return action.components;
  }
  return state;
};

export const fetchComponents = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/components");
    // console.log("comp store", response.data);
    dispatch({ type: "SET_COMPONENTS", components: response.data });
  };
};

export const setColorsOnComponents = (search) => {
  return async (dispatch) => {
    const { colors, component } = search;
    const { bgColor, primaryColor, secondaryColor, tertiaryColor } = colors;
    const response = await axios.post("/api/components/", {
      component,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      bgColor,
    });
    // dispatch({ type: "SET_COLORS", components: response.data });
    return response.data;
  };
};

export default components;
