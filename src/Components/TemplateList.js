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
  
  const updateTemplateNameHandler = () => {
    if (!selectedComponent) return;
    dispatch(updateTemplateName(selectedComponent.id, editedTemplateName));
    setSelectedComponent((prevComponent) => ({
      ...prevComponent,
      name: editedTemplateName,
    }));
    setEditedTemplateName("");
  };

  const copyHtmlTextToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = selectedComponent.htmlText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }; // copy html to clipboard
  
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
                <button 
                onClick={updateTemplateNameHandler}
                className="rainbowBtn"
                >
                  Update Name
                </button>
              <h5>Component:</h5>
                <div
                   className="profilecomppreview"
                   dangerouslySetInnerHTML={{
                   __html: cleanUpHTML(selectedComponent.htmlText),
                   }}
                />
              <h5>HTML:</h5>
                <div className="profilehtmlpreview">
                  {selectedComponent.htmlText}
                </div>
                <button onClick={copyHtmlTextToClipboard} className="rainbowBtn">
                  Copy HTML
                </button>
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

