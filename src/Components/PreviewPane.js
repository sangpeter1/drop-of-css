import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents, setColorsOnComponents } from "../store";
import DOMPurify from "dompurify";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import parse from "html-react-parser";

// const sanitizer = (html) => {
//   return DOMPurify.sanitize(html, {
//     ADD_TAGS: ["style"],
//     ADD_ATTR: ["style"],
//   });
// };
// const render = renderToStaticMarkup;

const PreviewPane = ({
  form,
  nav,
  title,
  sideNav,
  card,
  button,
  accordion,
  generatedColors,
}) => {
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  const [bgColor, setBgColor] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");

  if (form) {
    console.log("form", form);
  }

  useEffect(() => {
    try {
      generatedColors.map((color) => {
        setBgColor("");
        setPrimaryColor("");
        setSecondaryColor("");
        setTertiaryColor("");
        if (color.hsv.s < 25 && color.hsv.v > 75) {
          setBgColor(color.hex.value);
        }
        if (color.hsv.s > 91) {
          setPrimaryColor(color.hex.value);
        }
        if (color.hsv.s > 40) {
          setSecondaryColor(color.hex.value);
        }
        if (color.hsv.s > 0) {
          setTertiaryColor(color.hex.value);
        }
        if (!bgColor) {
          setBgColor("#FAFAFA");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [generatedColors]);

  const jsxGenerator = (component) => {
    const { htmlText, htmlStyle } = component;
    console.log(parse(htmlText));
    return parse(htmlText);
  };

  const renderedSubStyle = (style) => {
    const words = style.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i] === "primaryColor;") {
        words[i] = `${primaryColor};`;
      }
      if (words[i] === "secondaryColor;") {
        words[i] = `${secondaryColor};`;
      }
      if (words[i] === "tertiaryColor;") {
        words[i] = `${tertiaryColor};`;
      }
    }
    return words.join(" ");
  };

  return (
    <div
      className="preview-pane-container"
      style={{ backgroundColor: bgColor }}
    >
      {title ? (
        <div id="previewTitle">
          <div
            style={updatedStyle}
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
      {sideNav ? (
        "you've got a sidenav. cool"
      ) : (
        <nav id="previewSideNav">Side Nav</nav>
      )}

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
        {form ? jsxGenerator(form) : <div id="previewForm">form</div>}
        {button ? (
          "you've got a button. cool"
        ) : (
          <div id="previewButton">Button</div>
        )}
      </main>
    </div>
  );
};

export default PreviewPane;
