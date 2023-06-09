import axios from "axios";

const templates = (state = [], action) => {
  if (action.type === "SET_TEMPLATE") {
    return action.templates;
  }
  if (action.type === "CREATE_TEMPLATE") {
    return [...state, action.template];
  }
  if(action.type === 'DELETE_TEMPLATE'){
    return state.filter(template => template.id !== action.template.id);
  }
  if(action.type === 'UPDATE_TEMPLATE_NAME'){
     return state.map((template) =>
        template.id === action.templateId
          ? { ...template, name: action.name }
          : template
      );
  }
  return state;
};


export const createTemplate = (template) => {
  return async (dispatch) => {
    const { htmlText, userId } = template;
    const updatedTemplate = { userId, htmlText };
    try {
      const response = await axios.post("/api/templates", updatedTemplate);
      console.log(response);
      dispatch({ type: "CREATE_TEMPLATE", template: response.data });
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };
};

export const deleteTemplate = (template)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/templates/${template.id}`);
    dispatch({ type: 'DELETE_TEMPLATE', template});
  };
};

export const updateTemplateName = (templateId, name) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/templates/${templateId}`, { name });
      dispatch({ type: "UPDATE_TEMPLATE_NAME", templateId, name });
    } catch (error) {
      console.error("Error updating template name:", error);
    }
  };
};

export default templates;
