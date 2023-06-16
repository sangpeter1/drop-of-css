import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTemplateName, deleteTemplate, setTemplates } from "../store";
import { useNavigate, Link } from "react-router-dom";

const TemplateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, templates } = useSelector((state) => state);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editedTemplateName, setEditedTemplateName] = useState("");
  const [updatedTemplates, setUpdatedTemplates] = useState([]);

  useEffect(() => {
    if(auth) {
      setTemplates(auth.id);
    }
  }, [templates]);

  const cleanUpHTML = (htmlString) => {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    return template.innerHTML;
  }; //renders preview of styled component

  const handleComponentClick = (template) => {
    setSelectedComponent(template)
    setEditedTemplateName(template.name);
  }; //renders list

  const handleTemplateNameChange = (event) => {
    setEditedTemplateName(event.target.value);
  }; //create name for component

  const handleDeleteTemplate = (templateId) => {
    dispatch(deleteTemplate(templateId));
    return navigate('/profile');
  };

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
    // Display the "Copied to clipboard" message
    const clipboardMessage = document.getElementById("clipboard-message");
    clipboardMessage.innerHTML = "Copied to clipboard!";
  }; 

  const renderTemplateName = (template) => {
    if (template.name) {
      return template.name;
    } else {
      const dateCreated = new Date(template.createdAt).toLocaleDateString();
      return `Untitled(${dateCreated})`;
    }
  }; // sets untitled and date as default if no name

  const handleEditName = () => {
    if (selectedComponent) {
      setEditedTemplateName(selectedComponent.name || "");
    }
  };

  const handleSaveName = () => {
    updateTemplateNameHandler();
  };
  
  const renderNoComponentsMessage = () => {
    return (
      <div className="no-components-message">
        <p>You have no components!</p>
        <Link to="/" className="stylelink">Style a Component</Link>
      </div>
    );
  }
 
  return (
    <div className="template-list-container">
      <div className="templatesidebar">
        <h4 className="proheader">My Components</h4>
        <table className="profile-comp-table">
          <tbody>
           {templates
              .filter((template) => template.userId === auth.id)
              .map((template) => (
                <tr
                  key={template.id}
                  onClick={() => handleComponentClick(template)}
                  className={selectedComponent === template ? "selected" : ""}
                >
                  {selectedComponent === template ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editedTemplateName}
                          onChange={handleTemplateNameChange}
                          className="comp-name-input"
                        />
                      </td>
                      <td>
                        <button onClick={handleSaveName} className="edit-icon" title="Save">
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="template-name">{renderTemplateName(template)}</td>
                      <td>
                        <button onClick={handleEditName} className="edit-icon" title="Edit">
                          ✏️
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteTemplate(template.id)} className="delete-icon" title="Delete">
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
          {templates.filter((template) => template.userId === auth.id).length === 0 &&
          renderNoComponentsMessage()}
      </div>
      <div>
        { selectedComponent && templates.map(template => template.id === selectedComponent.id? (
          <div key={template.id}>
            <h4 className="proheader"> { template.name } </h4>
            <div className="boxesflex">
              <div>
                <h5>Component:</h5>
                <div
                  className="profilecomppreview"
                  dangerouslySetInnerHTML={{
                    __html: cleanUpHTML(selectedComponent.htmlText),
                  }}
                />
              </div>
              <div>
                <h5>HTML:</h5>
                <div className="profilehtmlpreview"><pre>{selectedComponent.htmlText}</pre></div>
                  <button onClick={copyHtmlTextToClipboard} className="rainbowBtn">
                    Copy HTML
                  </button>
                  <div id="clipboard-message" className="copytoclip"></div>
              </div>
            </div>
          </div>
        ): ''
        )}
      </div>
    </div>
  );
};

export default TemplateList;
