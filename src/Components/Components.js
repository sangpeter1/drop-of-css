import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchComponents, setColorsOnComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const Components = ({ openInPreview, generatedColors }) => {
  const { components } = useSelector((state) => state);
  const [colors, setColors] = useState([]);
  const [latestGeneratedColors, setLatestGeneratedColors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  //useEffect checks for changes in colors
  useEffect(() => {
    const updateColors = async () => {
      try {
        let updatedColors = { ...colors };
        updatedColors.primaryColor = generatedColors?.[0] || "";
        updatedColors.secondaryColor = generatedColors?.[1] || "";
        updatedColors.tertiaryColor = generatedColors?.[2] || "";
        updatedColors.bgColor = generatedColors?.[3] || "";
        setColors(updatedColors);
      } catch (err) {
        console.log(err);
      }
    };
    updateColors();
    console.log("after update colors", colors);
  }, [generatedColors, latestGeneratedColors]);

  // Use the latestGeneratedColors in a separate useEffect
  useEffect(() => {
    console.log("latest generated colors", latestGeneratedColors);
  }, [latestGeneratedColors]);

  // Update the latestGeneratedColors whenever generatedColors changes
  useEffect(() => {
    setLatestGeneratedColors(generatedColors);
  }, [generatedColors]);

  const handleOpenInPreview = async (component) => {
    try {
      if (component) {
        const colorsOnComponents = await dispatch(
          setColorsOnComponents({
            component,
            colors,
          })
        );
        openInPreview(colorsOnComponents);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const componentTypes = [...new Set(components.map((component) => component.type))];

  return (
    <div className="componentlist">
      <h3 className="header">Select Components</h3>
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
};

export default Components;
