import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTemplateName } from "../store";


const TemplateList = () => {
  
  const dispatch = useDispatch();
  const { auth, templates } = useSelector((state) => state);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editedTemplateName, setEditedTemplateName] = useState("");
  const [updatedTemplates, setUpdatedTemplates] = useState([]);
  
  useEffect(() => {
    setUpdatedTemplates(templates);
  }, [templates]);
  
  const cleanUpHTML = (htmlString) => {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    return template.innerHTML;
  }; //renders preview of styled component
  
  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  }; //renders list

  const handleTemplateNameChange = (event) => {
    setEditedTemplateName(event.target.value);
  }; //create name for component
  
  /*
  const _updateTemplateName = (templateId) => {
    dispatch(updateTemplateName(templateId, editedTemplateName));
    setEditedTemplateName("");
  }; // updates name*/
  
    const updateTemplateNameHandler = () => {
    if (!selectedComponent) return;

    dispatch(updateTemplateName(selectedComponent.id, editedTemplateName));
    
    // Update the template name in the selected component object
    setSelectedComponent((prevComponent) => ({
      ...prevComponent,
      name: editedTemplateName,
    }));
  };

   const renderTemplateName = (template) => {
    if (template.name) {
      return template.name;
    } else {
      const dateCreated = new Date(template.createdAt).toLocaleDateString();
      return `Untitled (${dateCreated})`;
    }
  }; // sets untitled and date as default if no name
  
  
  return (
    <div className="template-list-container">
      <div className="content">
          {selectedComponent && (
            <div>
              <h5>Name:</h5>
                <div>{renderTemplateName(selectedComponent)}</div>
                <br />
                <input
                  type="text"
                  value={editedTemplateName}
                  onChange={handleTemplateNameChange}
                />
                <button onClick={updateTemplateNameHandler}>
                  Update Name
                </button>
              <h5>Component:</h5>
                <div
                   dangerouslySetInnerHTML={{
                   __html: cleanUpHTML(selectedComponent.htmlText),
                   }}
                />
              <h5>HTML:</h5>
                <div>{selectedComponent.htmlText}</div>
            </div>
          )}
      </div>
      <div className="templatesidebar">
        <h4 className="header">My Templates</h4>
        <ul>
          {templates
            .filter((template) => template.userId === auth.id)
            .map((template) => (
              <li
                key={template.id}
                onClick={() => handleComponentClick(template)}
              >
                {renderTemplateName(template)} 
              </li>
            ))}
        </ul>
      </div>

      </div>
  );
};

export default TemplateList;


