import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchComponents, setColorsOnComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const Components = ({ openInPreview }) => {
  const { components, cpg } = useSelector((state) => state);
  const [activeType, setActiveType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleOpenInPreview = async (component) => {
    try {
      if (!cpg.length > 0) {
        setErrorMessage("please pick a color palette first!");
        setTimeout(() => {
          setErrorMessage("");
        }, 1500);
      }
      if (component) {
        const colorsOnComponents = await dispatch(
          setColorsOnComponents({
            component,
            cpg,
          })
        );
        openInPreview(colorsOnComponents);

        //local storage
        if (component.type === "navbar") {
          localStorage.setItem("savedNavbar", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "form") {
          localStorage.setItem("savedForm", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "title") {
          localStorage.setItem("savedTitle", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "sideNav") {
          localStorage.setItem("savedSideNav", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "card") {
          localStorage.setItem("savedCard", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "button") {
          localStorage.setItem("savedButton", JSON.stringify(colorsOnComponents));
        }
        localStorage.setItem("colors", JSON.stringify(cpg));
      }
      // console.log(
      //   "LOCAL STORAGE SAVED DATA",
      //   localStorage.getItem("savedNavbar"),
      //   localStorage.getItem("savedForm"),
      //   localStorage.getItem("savedTitle"),
      //   localStorage.getItem("savedSideNav"),
      //   localStorage.getItem("savedCard"),
      //   localStorage.getItem("savedButton")
      // );
    } catch (err) {
      console.log(err);
    }
  };

  const componentTypes = [...new Set(components.map((component) => component.type))];
  // console.log("component types", componentTypes);
  // if (cpg.length > 0) {
  //   console.log("cpg?", cpg);
  //   console.log("cpg zero?", cpg[0]);
  //   console.log(`rgba(${cpg[3].rgb.r}, ${cpg[3].rgb.g}, ${cpg[3].rgb.b}, 0.3)`);
  // }

  // console.log(componentTypes);

  return (
    <>
      <h3 className="header" style={{ display: "block", textAlign: "center" }}>
        Select Components
        <div className="instructions">next, add components to your template!</div>
      </h3>
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
      <div
        style={{
          margin: "0 auto",
          color: "darkred",
          fontSize: "calc(5px + 0.5vw)",
          fontStyle: "italic",
          minHeight: "2vh",
          textAlign: "center",
        }}
      >
        {errorMessage ? errorMessage : <div style={{ minHeight: "(4px + 0.5vw)" }}></div>}
      </div>
    </>
  );
};

export default Components;
