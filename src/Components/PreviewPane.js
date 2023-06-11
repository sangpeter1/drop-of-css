import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents, createTemplate } from "../store";

// Importing components from PreviewComponents



import PreviewTitle from "./PreviewComponents/PreviewTitle";
import PreviewNav from "./PreviewComponents/PreviewNav";
import PreviewSideNav from "./PreviewComponents/PreviewSideNav";
import PreviewCard from "./PreviewComponents/PreviewCard";
import PreviewForm from "./PreviewComponents/PreviewForm";
import PreviewButton from "./PreviewComponents/PreviewButton";
//

const PreviewPane = ({
  wholePageBackground,
  form,
  nav,
  title,
  sideNav,
  card,
  button /*accordion, generatedColors*/,
}) => {
  const { auth, components, componentColors } = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchComponents());
  // }, []);

  const [colors, setColors] = useState("");

  const jsxGenerator = (component) => {
    const { htmlText, htmlStyle } = component;
    console.log(htmlText);
    return htmlText;
  };

  /*mt*/
  const saveComponent = (componentType) => {
    const userId = auth.id;
    const componentData = {
      htmlText: jsxGenerator(componentType),
      userId: userId,
    };
    console.log("SAVE COMP FUNCTION", componentData);
    dispatch(createTemplate(componentData));
  };

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

  if (wholePageBackground) {
    console.log("whole background", wholePageBackground);
  }

  return (
    <div>
      <h3 className="header">Template Preview</h3>
      <div
        className="preview-pane-container"
        style={{
          zIndex: -20,
          backgroundColor: wholePageBackground ? `${wholePageBackground.hex.value}` : "#F0F0F0",
        }}
      >

        {title ? (
          <div id="previewTitle" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(title),
              }}
            />
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
            {/* <Navbar /> */}
          </div>
        ) : (
          <nav id="previewNav">Preview Nav</nav>
        )}
        {sideNav ? (
          <div
            id="previewSideNav"
            style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
            dangerouslySetInnerHTML={{
              __html: jsxGenerator(sideNav),
            }}
          />
        ) : (
          <div id="previewSideNav">Side Nav</div>
        )}
        <main className="preview-pane-Main-Content">
          <div id="previewCardContainer">
            {card ? (
              <div id="previewCard" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
              dangerouslySetInnerHTML={{__html: jsxGenerator(card),}}/>
            ) : (
              <div id="previewCard">Card</div>
            )}{" "}
            {card ? (

              <div id="previewCard" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
              dangerouslySetInnerHTML={{__html: jsxGenerator(card),}}/>
            ) : (
              <div id="previewCard">Card</div>
            )}
            {card ? (

              <div id="previewCard" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
              dangerouslySetInnerHTML={{__html: jsxGenerator(card),}}/>
            ) : (
              <div id="previewCard">Card</div>
            )}
          </div>
          {form ? (

          <div id="previewForm" style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
          dangerouslySetInnerHTML={{__html: jsxGenerator(form),}}/>
          ) : (
            <div id="previewForm">form</div>
          )}
          <div id="previewButtonContainer">
            {button ? (
            <div id="previewButton">
              <div dangerouslySetInnerHTML={{__html: jsxGenerator(button),}}/>
              </div>
            ) : (
              <div id="previewButton">Button</div>
            )}
          </div>
        </main>
        {renderSaveButtons()}
      </div>
    </div>
  );
};

export default PreviewPane;

/*
export const PreviewPaneConfig = {
  wholePageBackground,
  form,
  nav,
  title,
  sideNav,
  card,
  button,
  jsxGenerator
}
*/
