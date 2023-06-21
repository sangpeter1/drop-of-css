import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents, createTemplate } from "../store";
import store from "../store";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import FavHeart from "./FavHeart";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";

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

// const CodeDownloadButton = ({
//   code,
//   html,
//   filename,
//   isSideNavHovered,
//   isNavHovered,
//   isTitleHovered,
// }) => {
//   const downloadCode = () => {
//     const blobForJsx = new Blob([code], { type: "text/plain;charset=utf-8" });
//     const blobForHtml = new Blob([html], { type: "text/plain;charset=utf-8" });
//     saveAs(blobForJsx, `${filename}_jsx.txt`);
//     saveAs(blobForHtml, `${filename}_innerHTML.txt`);
//   };

//   return (
//     <button
//       className={`download-hover-button ${
//         isSideNavHovered ? "download-hover-button-sidenav" : ""
//       } ${isNavHovered ? "download-hover-button-nav" : ""} ${
//         isTitleHovered ? "download-hover-button-title" : ""
//       }`}
//       style={{
//         position: "absolute",
//         fontWeight: "bold",
//         backgroundColor: "white",
//         color: "black",
//         padding: "10px 20px",
//         border: "solid 0.75px black",
//         borderRadius: "10px",
//         cursor: "pointer",
//         width: "100px",
//         height: "90px",
//       }}
//       onClick={downloadCode}
//     >{`Download code for ${filename}`}</button>
//   );
// };

//

const jsxGenerator = (component) => {
  if (!component.htmlText) {
    component.htmlText = "";
  }
  const { htmlText } = component;
  return htmlText;
};

// Handling change of components field from redux store outside of the React component
const config = {};

const handleComponentChange = () => {
  const components = store.getState().components;
  components.forEach((component) => {
    config[component.type] = jsxGenerator(component);
  });
  config["jsxGenerator"] = jsxGenerator;
};

// const unsubscribe = store.subscribe(handleComponentChange);
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

  // Hover to download code feature

  // const [isButtonHovered, setIsButtonHovered] = useState(false);
  // const [isFormHovered, setIsFormHovered] = useState(false);
  // const [isCardHovered, setIsCardHovered] = useState(false);
  // const [isSideNavHovered, setisSideNavHovered] = useState(false);
  // const [isNavHovered, setisNavHovered] = useState(false);
  // const [isTitleHovered, setisTitleHovered] = useState(false);

  // const handleMouseEnter = (setFunction) => {
  //   console.log("setFunction true");
  //   setFunction(true);
  // };

  // const handleMouseLeave = (setFunction) => {
  //   console.log("setFunction false");

  //   setFunction(false);
  // };

  //
  /*mt*/
  const saveComponent = (componentType) => {
    const userId = auth.id;
    const componentData = {
      htmlText: jsxGenerator(componentType),
      userId: userId,
      type: componentType.type,
    };
    // console.log("SAVE COMP FUNCTION", componentData);
    dispatch(createTemplate(componentData));
    setSavedComponents((prevSavedComponents) => [...prevSavedComponents, componentType]);
  };
  const goToUserComponents = () => {
    navigate("/profile");
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
              My Favorites
              <div className="instructions">login to save your built components</div>
            </h3>
          </div>
          { /*<div
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
          </div> */}
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
    if (str === "all") {
      // console.log("in local storage", localStorage.getItem("savedNavbar"));
      localStorage.removeItem("savedNavbar");
      localStorage.removeItem("savedWholePageBackground");
      localStorage.removeItem("savedForm");
      localStorage.removeItem("savedTitle");
      localStorage.removeItem("savedNav");
      localStorage.removeItem("savedSideNav");
      localStorage.removeItem("savedCard");
      localStorage.removeItem("savedButton");
      // console.log("is local storage actually empty?", localStorage.getItem("savedNavbar"));
      form = null;
      wholePageBackground = null;
      nav = null;
      title = null;
      sideNav = null;
      card = null;
      button = null;
    } else if (str === "navbar") {
      localStorage.removeItem("savedNavbar");
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
      localStorage.removeItem("savedButton");
      button = null;
    }
    window.location.reload();
  };

  const handleComponentOnHover = (comp, html, code, filename) => {
    // console.log("hovering on...", comp.name);
    const downloadCode = () => {
      // console.log("download code clicked");
      const blobForJsx = new Blob([code], { type: "text/plain;charset=utf-8" });
      const blobForHtml = new Blob([html], { type: "text/plain;charset=utf-8" });
      saveAs(blobForJsx, `${filename}_jsx.txt`);
      saveAs(blobForHtml, `${filename}_innerHTML.txt`);
    };

    const favorite = () => {
      // console.log(comp, "has been favorited");
    };

    const clear = () => {
      clearComponents(comp.type);
    };
    return (
      <span id="hoverbox">
        {/* hover box for things */}
        <DownloadIcon onClick={downloadCode}>{`Download code for ${filename}`}</DownloadIcon>
        <FavHeart component={comp} />
        <ClearIcon onClick={clear} />
      </span>
    );
  };

  //this is broken
  if (!wholePageBackground) {
    const savedWholePageBackground = JSON.parse(localStorage.getItem("savedWholePageBackground"));
    wholePageBackground = savedWholePageBackground;
    // console.log("whole background", wholePageBackground);
  }

  // console.log(config);

  return (
    <div>
      <h3 className="header" style={{ display: "block", textAlign: "center" }}>
        Template Preview
        <div className="instructions">
          your preview template. you can save individual components or the template as a whole
        </div>
      </h3>
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
            style={{ background: "transparent", outline: "none", position: "relative" }}
            onMouseEnter={() => setHoveredOnComponent(title)}
            onMouseLeave={() => setHoveredOnComponent(null)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(title),
              }}
            />
            <span>
              {hoveredOnComponent === title
                ? handleComponentOnHover(
                    title,
                    title.htmlText,
                    `<div id="previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(title) }}>
                    </div>
                  </div>`,
                    "title"
                  )
                : ""}
            </span>
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
            style={{
              background: "rgba(0,0,0,0)",
              backgroundImage: "none",
              animation: "none",
              outline: "none",
              position: "relative",
            }}
            onMouseEnter={() => setHoveredOnComponent(nav)}
            onMouseLeave={() => setHoveredOnComponent(null)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(nav),
              }}
            />
            <span>
              {hoveredOnComponent === nav
                ? handleComponentOnHover(
                    nav,
                    nav.htmlText,
                    `<div id="previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(nav) }}>
                    </div>
                  </div>`,
                    "nav"
                  )
                : ""}
            </span>
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
        {/* sidenav needs some positioning work on the hover box */}
        {sideNav ? (
          <div
            id="previewSideNav"
            style={{
              background: "rgba(0,0,0,0)",
              backgroundImage: "none",
              animation: "none",
              outline: "none",
              display: "flex",
              alignItems: "flex-start",
              minHeight: "70vh",
            }}
            onMouseEnter={() => setHoveredOnComponent(sideNav)}
            onMouseLeave={() => setHoveredOnComponent(null)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(sideNav),
              }}
            />
            <span>
              {hoveredOnComponent === sideNav
                ? handleComponentOnHover(
                    sideNav,
                    sideNav.htmlText,
                    `<div id="previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(sideNav) }}>
                    </div>
                  </div>`,
                    "sideNav"
                  )
                : ""}
            </span>
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
            Side Nav
          </div>
        )}
        <main className="preview-pane-Main-Content">
          <div
            id="previewCardContainer"
            onMouseEnter={card ? () => setHoveredOnComponent(card) : () => {}}
            onMouseLeave={card ? () => setHoveredOnComponent(null) : () => {}}
          >
            {card ? (
              <div
                id="previewCard"
                style={{
                  background: "rgba(0,0,0,0)",
                  backgroundImage: "none",
                  animation: "none",
                  outline: "none",
                }}
              >
                <div>
                  <div dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }} />
                  <span>
                    {hoveredOnComponent === card
                      ? handleComponentOnHover(
                          card,
                          card.htmlText,
                          `<div id="previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}>
                    </div>
                  </div>`,
                          "card"
                        )
                      : ""}
                  </span>
                </div>
              </div>
            ) : (
              <div
                id="previewCard"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: "calc(12px + 0.5vw)",
                }}
              >
                Info or Product Card
              </div>
            )}
            {card ? (
              <div
                id="previewCard"
                style={{
                  background: "rgba(0,0,0,0)",
                  backgroundImage: "none",
                  animation: "none",
                  outline: "none",
                }}
              >
                <div>
                  <div dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }} />
                  <span>
                    {hoveredOnComponent === card
                      ? handleComponentOnHover(
                          card,
                          card.htmlText,
                          `<div id="previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}>
                    </div>
                  </div>`,
                          "card"
                        )
                      : ""}
                  </span>
                </div>
              </div>
            ) : (
              <div
                id="previewCard"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: "calc(12px + 0.5vw)",
                }}
              >
                Info or Product Card
              </div>
            )}
            {card ? (
              <div
                id="previewCard"
                style={{
                  background: "rgba(0,0,0,0)",
                  backgroundImage: "none",
                  animation: "none",
                  outline: "none",
                }}
              >
                <div>
                  <div dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }} />
                  <span>
                    {hoveredOnComponent === card
                      ? handleComponentOnHover(
                          card,
                          card.htmlText,
                          `<div id="previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}>
                    </div>
                  </div>`,
                          "card"
                        )
                      : ""}
                  </span>
                </div>
              </div>
            ) : (
              <div
                id="previewCard"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: "calc(12px + 0.5vw)",
                }}
              >
                Info or Product Card
              </div>
            )}
          </div>
          {form ? (
            <div
              id="previewForm"
              style={{
                background: "rgba(0,0,0,0)",
                backgroundImage: "none",
                animation: "none",
                outline: "none",
              }}
              onMouseEnter={() => setHoveredOnComponent(form)}
              onMouseLeave={() => setHoveredOnComponent(null)}
            >
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: jsxGenerator(form),
                  }}
                />
                <span>
                  {hoveredOnComponent === form
                    ? handleComponentOnHover(
                        form,
                        form.htmlText,
                        `<div id="previewTitle" 
                          style={{ 
                            background: "transparent", 
                            outline: "none", 
                            position: "relative" }}>
                      <div 
                      dangerouslySetInnerHTML={{ __html: jsxGenerator(form) }}>
                      </div>
                    </div>`,
                        "form"
                      )
                    : ""}
                </span>
              </div>
            </div>
          ) : (
            <div
              id="previewForm"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "calc(12px + 0.5vw)",
                padding: "1rem",
              }}
            >
              Login, Contact, General Information Form
            </div>
          )}
          <div id="previewButtonContainer">
            {button ? (
              <div
                id="previewButton"
                style={{
                  background: "rgba(0,0,0,0)",
                  backgroundImage: "none",
                  animation: "none",
                  outline: "none",
                }}
                onMouseEnter={() => setHoveredOnComponent(button)}
                onMouseLeave={() => setHoveredOnComponent(null)}
              >
                <div
                  style={{
                    background: "rgba(0,0,0,0)",
                    backgroundImage: "none",
                    animation: "none",
                    outline: "none",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jsxGenerator(button),
                    }}
                  />
                  <span>
                    {hoveredOnComponent === button
                      ? handleComponentOnHover(
                          button,
                          button.htmlText,
                          `<div id="previewTitle" 
                              style={{ 
                                background: "transparent", 
                                outline: "none", 
                                position: "relative" }}>
                          <div 
                          dangerouslySetInnerHTML={{ __html: jsxGenerator(button) }}>
                          </div>
                        </div>`,
                          "button"
                        )
                      : ""}
                  </span>
                </div>
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
          </div>
        </main>
      </div>
      {renderSaveButtons()}
    </div>
  );
};

export default PreviewPane;

export const PreviewPaneConfig = config;
