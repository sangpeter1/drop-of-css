import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents, createTemplate } from "../store";

// Importing components from PreviewComponents
// This is a copy of the PreviewPane that is being used for the custom npm package. Currently under works!

import PreviewTitle from "./PreviewComponents/PreviewTitle";
import PreviewNav from "./PreviewComponents/PreviewNav";
import PreviewSideNav from "./PreviewComponents/PreviewSideNav";
import PreviewCard from "./PreviewComponents/PreviewCard";
import PreviewForm from "./PreviewComponents/PreviewForm";
import PreviewButton from "./PreviewComponents/PreviewButton";
//

const jsxGenerator = (component) => {
  if (!component.htmlText) {
    component.htmlText = "";
  }
  const { htmlText, htmlStyle } = component;
  console.log(htmlText);
  return htmlText;
};

// Handling change of components field from redux store outside of the React component

const config = {};

const handleComponentChange = () => {
  const config = {};
  const components = store.getState().components;
  components.forEach((component) => {
    config[components.type] = jsxGenerator(component);
  });
};

const unsubscribe = store.subscribe(handleComponentChange);
//unsubscribe();

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
    // console.log(htmlText);
    return htmlText;
  };

  /*mt*/
  const saveComponent = (componentType) => {
    const userId = auth.id;
    const componentData = {
      htmlText: jsxGenerator(componentType),
      userId: userId,
    };
    // console.log('SAVE COMP FUNCTION', componentData);
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
      <div className="button-container" style={{ display: "block", textAlign: "center" }}>
        <h3 className="header">Template Preview</h3>
        <div className="instructions">
          your preview template. you can save individual components or the template as a whole
        </div>
      </div>
      <div
        className="preview-pane-container"
        style={{
          zIndex: -20,
          backgroundColor: wholePageBackground ? `${wholePageBackground.hex.value}` : "#F0F0F0",
        }}
      >
        <PreviewTitle title={title} jsxGenerator={jsxGenerator} />
        <PreviewNav nav={nav} jsxGenerator={jsxGenerator} />
        <PreviewSideNav sideNav={sideNav} jsxGenerator={jsxGenerator} />
        <main className="preview-pane-Main-Content">
          <div id="previewCardContainer">
            {card ? (
              <PreviewCard card={card} jsxGenerator={jsxGenerator} />
            ) : (
              <div id="previewCard">Card</div>
            )}{" "}
            {card ? (
              <PreviewCard card={card} jsxGenerator={jsxGenerator} />
            ) : (
              <div id="previewCard">Card</div>
            )}
            {card ? (
              <PreviewCard card={card} jsxGenerator={jsxGenerator} />
            ) : (
              <div id="previewCard">Card</div>
            )}
          </div>
          {form ? (
            <PreviewForm form={form} jsxGenerator={jsxGenerator} />
          ) : (
            <div id="previewForm">form</div>
          )}
          <div id="previewButtonContainer">
            {button ? (
              <PreviewButton button={button} jsxGenerator={jsxGenerator} />
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
export const PreviewPaneConfig = config;
