import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const PreviewPane = ({ form, nav, generatedColors }) => {
  const { components } = useSelector((state) => state);
  console.log("in the preview pane page!!!", form, nav, generatedColors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);
  

  return (
    <div>
      <h1>Hey, here's the preview window!</h1>
      <ul>
        {components
          ? components.map((component) => {
              return (
                <li key={component.id}>
                  {component.type}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(component.htmlText),
                    }}
                  />
                </li>
              );
            })
          : ""}
      </ul>
      <div>
        <h5>Color Palette</h5>
        <ul>
        {generatedColors
          ? generatedColors.map((color, index) => {
            return (
              <li key={index}>
                { color.hex.value } - { color.rgb.value } - { color.name.value }
              </li>
            );
          })
        : ""}
        </ul>
      </div>
    </div>
  );
};

export default PreviewPane;
