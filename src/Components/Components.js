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

  return (
    <div>
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
};

export default Components;
