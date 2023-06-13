import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchComponents, setColorsOnComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const Components = ({ openInPreview }) => {
  const { components, cpg } = useSelector((state) => state);
  const [activeType, setActiveType] = useState(null);

  const handleTypeClick = (type) => {
    setActiveType(type === activeType ? null : type);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  if (!components) {
    return null;
  }

  useEffect(() => {
    // console.log("Components useEffect", cpg);
  }, [cpg]);

  // console.log("Components OUTSIDE useEffect", cpg);

  const handleOpenInPreview = async (component) => {
    try {
      if (component) {
        const colorsOnComponents = await dispatch(
          setColorsOnComponents({
            component,
            cpg,
          })
        );
        openInPreview(colorsOnComponents);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const componentTypes = [...new Set(components.map((component) => component.type))];
  // console.log("component types", componentTypes);
  if (cpg.length > 0) {
    console.log("cpg?", cpg);
    console.log("cpg zero?", cpg[0]);
    console.log(`rgba(${cpg[3].rgb.r}, ${cpg[3].rgb.g}, ${cpg[3].rgb.b}, 0.3)`);
  }

  console.log(componentTypes)

  return (
    <>
      <div className="button-container" style={{ display: "block", textAlign: "center" }}>
        <h3 className="header">Select Components</h3>
        <div className="instructions">next, add components to your template!</div>
      </div>
      <div className="componentlist">
        <div className="componentContainer">
          <div className="componentTypes">
            {componentTypes.map((type) => (
              <div key={type} onClick={() => handleTypeClick(type)}>
                <h5>{type} &#x1F826;</h5>
              </div>
            ))}
          </div>
        </div>
        <div className="componentContainer">
          <div
            className="componentNamesContainer"
            style={{
              backgroundColor:
                cpg.length > 0
                  ? `rgba(${cpg[3].rgb.r}, ${cpg[3].rgb.g}, ${cpg[3].rgb.b}, 0.2)`
                  : "",
            }}
          >
            {componentTypes.map((type) => (
              <div
                className={`componentNames ${type === activeType ? "active" : ""}`}
                key={type}
                style={{ marginTop: 6 }}
              >
                <ul>
                  {components
                    .filter((component) => component.type === type)
                    .map((component) => (
                      <li key={component.id} onClick={() => handleOpenInPreview(component)}>
                        {component.name}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Components;
