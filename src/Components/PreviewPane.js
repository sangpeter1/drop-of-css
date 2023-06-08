import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";

const PreviewPane = ({
  form,
  nav,
  title,
  sideNav,
  card,
  button /*accordion, generatedColors*/,
}) => {
  const { components, componentColors } = useSelector((state) => state);
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
            {/* <div
              dangerouslySetInnerHTML={{
                __html: jsxGenerator(nav),
              }}
            /> */}
            <Navbar />
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
      </div>
    </div>
  );
};

export default PreviewPane;
