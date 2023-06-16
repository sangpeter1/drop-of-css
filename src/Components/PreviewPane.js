import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents, createTemplate } from "../store";
import store from "../store";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import FavHeart from "./FavHeart";
import { saveAs } from "file-saver";

// import { FaDownload } from 'react-icons/fa';

// Importing components from PreviewComponents

import PreviewTitle from "./PreviewComponents/PreviewTitle";
import PreviewNav from "./PreviewComponents/PreviewNav";
import PreviewSideNav from "./PreviewComponents/PreviewSideNav";
import PreviewCard from "./PreviewComponents/PreviewCard";
import PreviewForm from "./PreviewComponents/PreviewForm";
import PreviewButton from "./PreviewComponents/PreviewButton";
import { jsx } from "@emotion/react";

//

// Code for downloading react components

const CodeDownloadButton = ({ code, html, filename }) => {
  const downloadCode = () => {
    const blobForJsx = new Blob([code], { type: "text/plain;charset=utf-8" });
    const blobForHtml = new Blob([html], { type: "text/plain;charset=utf-8" });
    saveAs(blobForJsx, `${filename}_jsx.txt`);
    saveAs(blobForHtml, `${filename}_innerHTML.txt`);
  };

  return (
    <button
      style={{
        position: "absolute",
        backgroundColor: "white",
        color: "black",
        padding: "10px 20px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        width: "100px",
        height: "90px",
      }}
      onClick={downloadCode}
    >{`Download code for ${filename}`}</button>
  );
};

//

const jsxGenerator = (component) => {
  if (!component.htmlText) {
    component.htmlText = "";
  }
  const { htmlText, htmlStyle } = component;
  return htmlText;
};

// Handling change of components field from redux store outside of the React component lasdkjf
const config = {};

const handleComponentChange = () => {
  const components = store.getState().components;
  components.forEach((component) => {
    config[component.type] = jsxGenerator(component);
  });
  config["jsxGenerator"] = jsxGenerator;
};

const unsubscribe = store.subscribe(handleComponentChange);
//unsubscribe();

// useEffect(() => {
//   dispatch(fetchComponents());
// }, []);
//unsubscribe()

const PreviewPane = ({ wholePageBackground, form, nav, title, sideNav, card, button }) => {
  const { auth, components, componentColors } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [colors, setColors] = useState("");
  const [savedComponents, setSavedComponents] = useState([]);
  const [hoveredOnComponent, setHoveredOnComponent] = useState(null);

  // Hover to download feature

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //
  /*mt*/
  const saveComponent = (componentType) => {
    const userId = auth.id;
    const componentData = {
      htmlText: jsxGenerator(componentType),
      userId: userId,
    };
    console.log("SAVE COMP FUNCTION", componentData);
    dispatch(createTemplate(componentData));
    setSavedComponents((prevSavedComponents) => [...prevSavedComponents, componentType]);
  };
  const goToUserComponents = () => {
    navigate("/profile/components");
  };
  /*
  const renderSaveButtons = () => {
    if (auth.id) {
      return (
        <div>
          {title && <button onClick={() => saveComponent(title)}>Save Title</button>}
          {nav && <button onClick={() => saveComponent(nav)}>Save Nav</button>}
          {sideNav && <button onClick={() => saveComponent(sideNav)}>Save SideNav</button>}
          {card && <button onClick={() => saveComponent(card)}>Save Card</button>}
          {form && <button onClick={() => saveComponent(form)}>Save Form</button>}
          {button && <button onClick={() => saveComponent(button)}>Save Button</button>}
        </div>
      );
    }
    return null;
  };
*/
  const renderSaveButtons = () => {
    if (auth.id) {
      return (
        <div>
          <div className="button-container" style={{ display: "block", textAlign: "center" }}>
            <h3 className="header">
              Save Components
              <div className="instructions">login to save your built components</div>
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "max-content",
              margin: "auto",
            }}
          >
            {title && !savedComponents.includes(title) && (
              <button onClick={() => saveComponent(title)}>Save Title</button>
            )}
            {nav && !savedComponents.includes(nav) && (
              <button onClick={() => saveComponent(nav)}>Save Nav</button>
            )}
            {sideNav && !savedComponents.includes(sideNav) && (
              <button onClick={() => saveComponent(sideNav)}>Save SideNav</button>
            )}
            {card && !savedComponents.includes(card) && (
              <button onClick={() => saveComponent(card)}>Save Card</button>
            )}
            {form && !savedComponents.includes(form) && (
              <button onClick={() => saveComponent(form)}>Save Form</button>
            )}
            {button && !savedComponents.includes(button) && (
              <button onClick={() => saveComponent(button)}>Save Button</button>
            )}
          </div>
          <button
            onClick={goToUserComponents}
            className="rainbowBtn"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "max-content",
              margin: "auto",
            }}
          >
            Go to My Components
          </button>
        </div>
      );
    }
    return null;
  };

  //clearing local storage and components?
  const clearComponents = (str) => {
    console.log("trying to clear components");
    if (str === "all") {
      console.log(str);
      console.log("in local storage", localStorage.getItem("savedNavbar"));
      localStorage.removeItem("savedNavbar");
      localStorage.removeItem("savedForm");
      localStorage.removeItem("savedTitle");
      localStorage.removeItem("savedNav");
      localStorage.removeItem("savedSideNav");
      localStorage.removeItem("savedCard");
      localStorage.removeItem("savedButton");
      console.log("is local storage actually empty?", localStorage.getItem("savedNavbar"));
      form = null;
      nav = null;
      title = null;
      sideNav = null;
      card = null;
      button = null;
    } else if (str === "nav") {
      localStorage.removeItem("savedNavBar");
      nav = null;
    } else if (str === "form") {
      localStorage.removeItem("savedForm");
      form = null;
    } else if (str === "title") {
      localStorage.removeItem("savedTitle");
      title = null;
    } else if (str === "sideNav") {
      localStorage.removeItem("savedSideNav");
      sideNav = null;
    } else if (str === "card") {
      localStorage.removeItem("savedCard");
      card = null;
    } else if (str === "button") {
      localStorage.removeItem("savedBbutton");
      button = null;
    }
    window.location.reload();
  };

  //building an on-hover for the download buttons, the heart, and a clear function:
  const handleComponentOnHover = (comp) => {
    console.log(comp);
    return (
      <span style={{ position: "absolute", bottom: 0, right: 0, border: "3px solid black" }}>
        hover box for things
        <FavHeart component={comp} />
      </span>
    );
  };

  //this is broken
  if (!wholePageBackground) {
    const savedWholePageBackground = JSON.parse(localStorage.getItem("savedWholePageBackground"));
    wholePageBackground = savedWholePageBackground;
    console.log("whole background", wholePageBackground);
  }

  // console.log(config);

  return (
    <div>
      <div className="button-container" style={{ display: "block", textAlign: "center" }}>
        <h3 className="header">
          Template Preview
          <div className="instructions">
            your preview template. you can save individual components or the template as a whole
          </div>
        </h3>
      </div>
      <button className="reset-button" onClick={() => clearComponents("all")}>
        Reset Template
      </button>
      <div
        className="preview-pane-container"
        style={{
          zIndex: -20,
          backgroundColor: wholePageBackground ? `#${wholePageBackground}` : "#F0F0F0",
        }}
      >
        {title ? (
          <div
            id="previewTitle"
            style={{ background: "rgba(0,0,0,0)", outline: "none", position: "relative" }}
            onMouseEnter={() => setHoveredOnComponent(title)}
            onMouseLeave={() => setHoveredOnComponent(null)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(title),
              }}
            />
            <span>{hoveredOnComponent === title ? handleComponentOnHover(title) : ""}</span>
            {/* <FavHeart component={title} /> */}
          </div>
        ) : (
          <div
            id="previewTitle"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "calc(12px + 0.5vw)",
            }}
          >
            Your Website Title
          </div>
        )}
        {nav ? (
          <div
            id="previewNav"
            style={{ background: "rgba(0,0,0,0)", outline: "none", position: "relative" }}
            onMouseEnter={() => setHoveredOnComponent(nav)}
            onMouseLeave={() => setHoveredOnComponent(false)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(nav),
              }}
            />
            <span>{hoveredOnComponent === nav ? handleComponentOnHover(nav) : ""}</span>
            <FavHeart component={previewNav} />

            {/* <Navbar /> */}
          </div>
        ) : (
          <div
            id="previewNav"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "calc(12px + 0.5vw)",
            }}
          >
            Navigation
          </div>
        )}
        {sideNav ? (
          <div id="previewSideNav">
            <div
              style={{ background: "rgba(0,0,0,0)", outline: "none" }}
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(sideNav),
              }}
            />
            <FavHeart component={sideNav} />
          </div>
        ) : (
          <div
            id="previewSideNav"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "calc(12px + 0.5vw)",
            }}
          >
            Side Navigation
          </div>
        )}
        <main className="preview-pane-Main-Content">
          <div id="previewCardContainer">
            {card ? (
              <div
                id="previewCard"
                style={{ background: "rgba(0,0,0,0)", outline: "none" }}
                dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}
              />
            ) : (
              <div
                id="previewCard"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "calc(12px + 0.5vw)",
                }}
              >
                Info or Product Card
              </div>
            )}{" "}
            {card ? (
              <div
                id="previewCard"
                style={{ background: "rgba(0,0,0,0)", outline: "none" }}
                dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}
              />
            ) : (
              <div
                id="previewCard"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "calc(12px + 0.5vw)",
                }}
              >
                Info or Product Card
              </div>
            )}
            {card ? (
              <div
                id="previewCard"
                style={{ background: "rgba(0,0,0,0)", outline: "none" }}
                dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}
              />
            ) : (
              <div
                id="previewCard"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "calc(12px + 0.5vw)",
                }}
              >
                Info or Product Card
              </div>
            )}
            {card ? <FavHeart component={card} /> : ""}
          </div>
          {form ? (
            <div id="previewForm">
              <div
                style={{ background: "rgba(0,0,0,0)", outline: "none" }}
                dangerouslySetInnerHTML={{ __html: jsxGenerator(form) }}
              />
              <FavHeart component={form} />
            </div>
          ) : (
            <div
              id="previewForm"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "calc(12px + 0.5vw)",
              }}
            >
              Login, Contact, General Information Form
            </div>
          )}
          <div
            id="previewButtonContainer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ border: "4px solid red" }}
            // i put a border here because it keeps breaking my code and i'm not sure what the hover is doing? and i don't want my page to keep going blank lol --jdb
          >
            {button ? (
              <div id="previewButton">
                <div
                  style={{ background: "rgba(0,0,0,0)", outline: "none" }}
                  dangerouslySetInnerHTML={{ __html: jsxGenerator(button) }}
                />
                <FavHeart component={button} />
              </div>
            ) : (
              <div
                id="previewButton"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "calc(12px + 0.5vw)",
                }}
              >
                Submit Buttons
              </div>
            )}

            {button && isHovered && (
              <CodeDownloadButton
                code={`button ? (
              <div id="previewButton">
                <div dangerouslySetInnerHTML={{ __html: jsxGenerator(button) }} />
                <FavHeart component={button} />
              </div>
            ) : (
              <div id="previewButton">Button</div>
            )`}
                html={button.htmlText}
                filename="button"
              />
            )}
          </div>
        </main>
      </div>
      {renderSaveButtons()}
    </div>
  );
};

export default PreviewPane;

export const PreviewPaneConfig = config;
