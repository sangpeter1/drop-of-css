import axios from "axios";

export const components = (state = [], action) => {
  if (action.type === "SET_COMPONENTS") {
    return action.components;
  }
  return state;
};

export const componentColors = (state = [], action) => {
  if (action.type === "SET_COLORS") {
    return action.colors;
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
    const { cpg, component } = search;
    // console.log("setColorsOnComponents", cpg);
    // let { bgColor, primaryColor, secondaryColor, tertiaryColor } = cpg;

    const primaryColor = cpg[0].hex.value;
    const secondaryColor = cpg[1].hex.value;
    const tertiaryColor = cpg[2].hex.value;
    const bgColor = cpg[3].hex.value;
    console.log("in store", bgColor, primaryColor, secondaryColor, tertiaryColor);
    const response = await axios.post("/api/components/", {
      component,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      bgColor,
    });
    // console.log("After axios call in store", response.data);
    dispatch({ type: "SET_COLORS", colors: response.data });
    return response.data;
  };
};

export default { components, componentColors };
