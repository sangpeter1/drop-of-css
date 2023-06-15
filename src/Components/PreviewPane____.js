import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents, createTemplate } from "../store";
import store from "../store";
import html2pdf from 'html2pdf.js';
import { useNavigate } from "react-router-dom";
import FavHeart from "./FavHeart";

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

const CodeDownloadButton = ({ code, filename }) => {
  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  };

  return <button onClick={downloadCode}>Download Code</button>;
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

  //this is broken
  if (!wholePageBackground) {
    const savedWholePageBackground = JSON.parse(localStorage.getItem("savedWholePageBackground"));
    wholePageBackground = savedWholePageBackground;
    console.log("whole background", wholePageBackground);
  }

  console.log(config)

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
      <div
        className="preview-pane-container"
        style={{
          zIndex: -20,
          backgroundColor: wholePageBackground ? `#${wholePageBackground}` : "#F0F0F0",
        }}
      >
        {title ? (
          <div id="previewTitle" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(title),
              }}
            />
            <FavHeart component={title} />
          </div>
        ) : (
          <header id="previewTitle">Your Website Title</header>
        )}
        {nav ? (
          <div id="previewNav">
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(nav),
              }}
            />
            <FavHeart component={previewNav} />

            {/* <Navbar /> */}
          </div>
        ) : (
          <nav id="previewNav">Preview Nav</nav>
        )}
        {sideNav ? (
          <div id="previewSideNav">
            <div
              style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(sideNav),
              }}
            />
            <FavHeart component={sideNav} />
          </div>
        ) : (
          <div id="previewSideNav">Side Nav</div>
        )}
        <main className="preview-pane-Main-Content">
          <div id="previewCardContainer">
            {card ? (
              <div
                id="previewCard"
                style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
                dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}
              />
            ) : (
              <div id="previewCard">Card</div>
            )}{" "}
            {card ? (
              <div
                id="previewCard"
                style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
                dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}
              />
            ) : (
              <div id="previewCard">Card</div>
            )}
            {card ? (
              <div
                id="previewCard"
                style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
                dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}
              />
            ) : (
              <div id="previewCard">Card</div>
            )}
            {card ? <FavHeart component={card} /> : ""}
          </div>
          {form ? (
            <div id="previewForm">
              <div
                style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
                dangerouslySetInnerHTML={{ __html: jsxGenerator(form) }}
              />
              <FavHeart component={form} />
            </div>
          ) : (
            <div id="previewForm">form</div>
          )}
          <div id="previewButtonContainer">
            {button ? (
              <div id="previewButton">
                <div dangerouslySetInnerHTML={{ __html: jsxGenerator(button) }} />
                <FavHeart component={button} />
              </div>
            ) : (
              <div id="previewButton">Button</div>
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
