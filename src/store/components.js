import axios from "axios";

const components = (state = [], action) => {
  if (action.type === "SET_COMPONENTS") {
    return action.components;
  }
  return state;
};

export const fetchComponents = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/components");
    console.log("comp store", response.data);
    dispatch({ type: "SET_COMPONENTS", components: response.data });
  };
};

export default components;
