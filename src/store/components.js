import axios from "axios";

const components = (state = {}, action) => {
  if (action.type === "SET_COMPONENTS") {
    return action.components;
  }
  return state;
};

export const fetchComponents = () => {
  return async (dispatch) => {
    // console.log("in the component store");
    const response = await axios.get("/api/components");
    console.log("in the store", response.data);
    dispatch({ type: "SET_COMPONENTS", components: response.data });
  };
};

export default components;
