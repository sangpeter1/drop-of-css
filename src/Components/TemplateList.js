import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const TemplateList = () => {
  
  const { auth, templates } = useSelector((state) => state);
  
  const cleanUpHTML = (htmlString) => {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    return template.innerHTML;
  };
  
  return (
    <div>
      <h4 className="header" >My Templates</h4>
      <ul>
        {templates
          .filter((template) => template.userId === auth.id)
          .map((template) => (
            <li key={template.id}>
              <div>
                <h5>Styled Component:</h5>
                <div dangerouslySetInnerHTML={{ __html: cleanUpHTML(template.htmlText) }} />
              </div>
              <div>
                <h5>HTML:</h5>
                <div>{template.htmlText}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TemplateList;


