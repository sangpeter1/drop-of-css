import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const Components = ({ openInPreview }) => {
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  const handleOpenInPreview = (component) => {
    openInPreview(component);
  };

 const componentTypes = [...new Set(components.map((component) => component.type))];


  return (
    <div className="componentlist">
      <h3 className="header">
        Select Components
      </h3>
      {componentTypes.map((type) => (
        <div key={type}>
          <h5>{type}</h5>
          <ul>
            {components
              .filter((component) => component.type === type)
              .map((component) => (
                <li
                  key={component.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenInPreview(component)}
                >
                  {component.name}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );




/*
  return (
    <div className="componentlist">
      <h3 style={{ textAlign: "center", margin: 4 }} className="rainbow-header">Select Components</h3>
      <ul>
        {components
          ? components.map((component) => {
              return (
                <li
                  key={component.id}
                  style={{ ":hover": { cursor: "pointer" } }}
                  onClick={() => handleOpenInPreview(component)}
                >
                  {component.type}: {component.name}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
  */
  
  
  
};

export default Components;
