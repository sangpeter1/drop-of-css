import axios from "axios";

const templates = (state = [], action) => {
  if (action.type === "SET_TEMPLATES") {
    return action.templates;
  }
  if (action.type === "CREATE_TEMPLATE") {
    return [...state, action.template];
  }
  if (action.type === "DELETE_TEMPLATE") {
    return state.filter((template) => template.id !== action.templateId);
  }
  if (action.type === "UPDATE_TEMPLATE_NAME") {
    return state.map((template) =>
      template.id === action.templateId ? { ...template, name: action.name } : template
    );
  }
  return state;
};

export const setTemplates = (userId) => {
  return async (dispatch) => {
    // console.log("moe's id in setTemplates", userId);
    const response = await axios.get(`/api/templates/${userId}`);
    dispatch({ type: "SET_TEMPLATES", templates: response.data });
  };
};

export const createTemplate = (template) => {
  return async (dispatch) => {
    const { htmlText, userId, type } = template;
    const updatedTemplate = { userId, htmlText, type };
    // console.log("creating template in store", updatedTemplate);

    try {
      const response = await axios.post("/api/templates", updatedTemplate);
      // console.log(response);
      dispatch({ type: "CREATE_TEMPLATE", template: response.data });
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };
};

export const deleteTemplate = (templateId) => {
  return async (dispatch) => {
    await axios.delete(`/api/templates/${templateId}`);
    dispatch({ type: "DELETE_TEMPLATE", templateId });
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
