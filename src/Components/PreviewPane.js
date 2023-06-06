import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";

const PreviewPane = ({ form, nav, title, sideNav, card, button, accordion, generatedColors }) => {
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  const [colors, setColors] = useState("");

  const jsxGenerator = (component) => {
    const { htmlText, htmlStyle } = component;
    console.log(htmlText);
    return htmlText;
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
          <div id="previewTitle">
            <div
              style={updatedStyle}
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(nav),
              }}
            />
          </div>
        ) : (
          <nav id="previewNav">Preview Nav</nav>
        )}
        {sideNav ? "you've got a sidenav. cool" : <nav id="previewSideNav">Side Nav</nav>}

        <main className="preview-pane-Main-Content">
          {card ? "you've got a card. cool" : <div id="previewCard">Card</div>}
          {card ? (
            <div
              id="previewCard"
              dangerouslySetInnerHTML={{
                __html: sanitizer(card.htmlText),
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
      </div>
    </div>
  );
};

export default PreviewPane;
