import axios from "axios";

const templates = (state = {}, action) => {
  if (action.type === "SET_TEMPLATE") {
    return action.template;
  }
  if (action.type === "CREATE_TEMPLATE") {
    return [...state, action.template];
  }
  if(action.type === 'DELETE_TEMPLATE'){
    return state.filter(template => template.id !== action.template.id);
  }
  return state;
};



export const createTemplate = (template) => {
  return async (dispatch) => {
    const response = await axios.post("/api/template", template);
    dispatch({ type: "CREATE_TEMPLATE", template: response.data });
  };
};

export const deleteTemplate = (template)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/template/${template.id}`);
    dispatch({ type: 'DELETE_TEMPLATE', template});
  };
};

export default templates;
