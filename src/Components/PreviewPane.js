import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents, createTemplate } from "../store";

const PreviewPane = ({ form, nav, title, sideNav, card, button, accordion, generatedColors }) => {
  const { components, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
    //dispatch(createTemplate({ htmlText: jsxGenerator(title) }));
  }, []);

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
    dispatch(createTemplate(componentData));
  };
 
  const renderSaveButtons = () => {
    if (auth.id) {
      return (
        <div>
          {title && (
            <button onClick={() => saveComponent(title)}>Save Title</button>
          )}
          {nav && (
            <button onClick={() => saveComponent(nav)}>Save Nav</button>
          )}
          {sideNav && (
            <button onClick={() => saveComponent(sideNav)}>Save SideNav</button>
          )}
          {card && (
            <button onClick={() => saveComponent(card)}>Save Card</button>
          )}
          {form && (
            <button onClick={() => saveComponent(form)}>Save Form</button>
          )}
          {button && (
            <button onClick={() => saveComponent(button)}>Save Button</button>
          )}
        </div>
      );
    }
    return null;
  };
  
  
  

  return (
    <div>
      <h3 className="header">Template Preview</h3>
      <div className="preview-pane-container" style={{ backgroundColor: colors.bgColor }}>
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
          {card ? (
            <div
              id="previewCard"
              style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(card),
              }}
            />
          ) : (
            <div id="previewCard">Card</div>
          )}{" "}
          {card ? (
            <div
              id="previewCard"
              style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(card),
              }}
            />
          ) : (
            <div id="previewCard">Card</div>
          )}
          {form ? (
            <div
              id="previewForm"
              style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(form),
              }}
            />
          ) : (
            <div id="previewForm">form</div>
          )}
          {button ? (
            <div id="previewButton">
              <div
                dangerouslySetInnerHTML={{
                  __html: jsxGenerator(button),
                }}
              />
            </div>
          ) : (
            <div id="previewButton">Button</div>
          )}
        </main>
        {renderSaveButtons()}
      </div>
    </div>
  );
};

export default PreviewPane;
