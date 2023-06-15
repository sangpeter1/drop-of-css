import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTemplateName, deleteTemplate, setTemplates } from "../store";
import { useNavigate } from "react-router-dom";

const TemplateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, templates } = useSelector((state) => state);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editedTemplateName, setEditedTemplateName] = useState("");
  const [updatedTemplates, setUpdatedTemplates] = useState([]);

  useEffect(() => {
    setTemplates();
  }, [templates]);

  console.log(templates);

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

  const handleDeleteTemplate = (templateId) => {
    dispatch(deleteTemplate(templateId));
    return navigate('/profile/components')
  }

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

  const handleEditName = () => {
    if (selectedComponent) {
      setEditedTemplateName(selectedComponent.name || "");
    }
  };

  const handleSaveName = () => {
    updateTemplateNameHandler();
    setSelectedComponent(null);
  };
  /*
  return (
    <div className="template-list-container">
      <div className="templatesidebar">
        <h4 className="header">My Components</h4>
        <ul className="profile-comp-list">
          {templates
            .filter((template) => template.userId === auth.id)
            .map((template) => (
              <li
                key={template.id}
                onClick={() => handleComponentClick(template)}
                className={selectedComponent === template ? 'selected' : ''}
              >
                {renderTemplateName(template)} 
              </li>
            ))}
        </ul>
      </div>
      <div>
        {selectedComponent && (
            <div>
              <h4 className="header">{renderTemplateName(selectedComponent)}</h4>
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
        <div>
          {selectedComponent && (
            <div >
              <h4 className="header">Details</h4>
              <h5>Name:</h5>
              <div>{renderTemplateName(selectedComponent)}</div>
              <br />
              <h5>Edit Name:</h5>
              <input
                type="text"
                value={editedTemplateName}
                onChange={handleTemplateNameChange}
                className="comp-name-input"
              />
              <br />
              <button 
                onClick={updateTemplateNameHandler}
                className="rainbowBtn"
                >
                  Update
              </button>
            </div> 
          )}
        </div>
      </div>
  );*/
  return (
    <div className="template-list-container">
      <div className="templatesidebar">
        <h4 className="header">My Components</h4>
        <ul className="profile-comp-list">
          {templates
            .filter((template) => template.userId === auth.id)
            .map((template) => (
              <li
                key={template.id}
                onClick={() => handleComponentClick(template)}
                className={selectedComponent === template ? "selected" : ""}
              >
                {selectedComponent === template ? (
                  <div>
                    <input
                      type="text"
                      value={editedTemplateName}
                      onChange={handleTemplateNameChange}
                      className="comp-name-input"
                    />
                    <button onClick={handleSaveName} className="edit-icon" title="Save">
                      Save
                    </button>
                    <button onClick={() => handleDeleteTemplate(template.id)} className="delete-icon" title="Delete">
                      Delete
                    </button>

                  </div>
                ) : (
                  <div className="template-name">
                    {renderTemplateName(template)}
                    <button onClick={handleEditName} className="edit-icon" title="Edit">
                      ✏️
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
      <div>
        {selectedComponent && (
          <div>
            <h4 className="header">{renderTemplateName(selectedComponent)}</h4>
            <h5>Component:</h5>
            <div
              className="profilecomppreview"
              dangerouslySetInnerHTML={{
                __html: cleanUpHTML(selectedComponent.htmlText),
              }}
            />
            <h5>HTML:</h5>
            <pre>
            <div className="profilehtmlpreview">{selectedComponent.htmlText}</div>
            <button onClick={copyHtmlTextToClipboard} className="rainbowBtn">
              Copy HTML
            </button>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateList;
