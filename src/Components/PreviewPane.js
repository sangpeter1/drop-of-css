import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";
import DOMPurify from "dompurify";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

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
  // console.log("in the preview pane page!!!", form, nav, generatedColors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  //this is just a test!!!
  const [bgColor, setBgColor] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");

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

  /*
  thing to think about with colors: 
    we'll probably have to have a consistent style, like lightest colors as background colors, boldest colors as accent pops, darkest colors as borders, lines, texts, etc? idk that's just my first thought when it comes to styling but i'm VERY open to messing around. 
   */

  // console.log(title, bgColor, primaryColor, secondaryColor);

  const sanitizer = (html) => {
    return DOMPurify.sanitize(html, {
      ADD_TAGS: ["style"],
      ADD_ATTR: ["style"],
    });
  };
  const render = renderToStaticMarkup;

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

  // if (title) {
  //   console.log(JSON.stringify(title.htmlStyle));
  // }

  return (
  <div>
    <h3 className="header">Template Preview</h3>
    <div
      className="preview-pane-container"
      style={{ backgroundColor: bgColor }}
    >
      {title ? (
        <>
          {(() => {
            const { htmlText, htmlStyle } = title;
            htmlStyle.backgroundColor = bgColor;
            htmlStyle.color = primaryColor;

            console.log(htmlStyle);
            return (
              <header
                dangerouslySetInnerHTML={{
                  __html: htmlText,
                }}
                style={htmlStyle}
              />
            );
          })()}
        </>
      ) : (
        <header id="previewTitle">Your Website Title</header>
      )}
      {nav ? (
        <>
          {(() => {
            const { htmlText, htmlStyle } = nav;
            const { subStyleOne } = htmlStyle;
            const updatedStyle = {
              ...htmlStyle,
              backgroundColor: bgColor,
              color: primaryColor,
              borderBottom: `5px solid ${tertiaryColor}`,
            };

            console.log("updated style", updatedStyle);

            const updatedHtmlText = htmlText.replace(
              "subStyleOne",
              `${renderedSubStyle(subStyleOne)}`
            );

            return (
              <div id="previewNav">
                <div
                  style={updatedStyle}
                  dangerouslySetInnerHTML={{
                    __html: updatedHtmlText,
                  }}
                />
              </div>
            );
          })()}
        </>
      ) : (
        <nav id="previewNav">Preview Nav</nav>
      )}
      {sideNav ? (
        <>
          {(() => {
            const { htmlText, htmlStyle } = sideNav;
            htmlStyle.backgroundColor = bgColor;
            htmlStyle.color = primaryColor;
            // htmlStyle.textDecoration = `underline ${secondaryColor}`;
            return (
              <nav
                dangerouslySetInnerHTML={{
                  __html: htmlText,
                }}
                style={htmlStyle}
              />
            );
          })()}
        </>
      ) : (
        <nav id="previewSideNav">Side Nav</nav>
      )}

      <main className="preview-pane-Main-Content">
        {card ? (
          <>
            {(() => {
              const { htmlText, htmlStyle } = card;
              htmlStyle.backgroundColor = bgColor;
              htmlStyle.color = primaryColor;
              // htmlStyle.textDecoration = `underline ${secondaryColor}`;
              return (
                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlText,
                  }}
                  style={htmlStyle}
                />
              );
            })()}
          </>
        ) : (
          <div id="previewCard">Card</div>
        )}
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
          <>
            {(() => {
              const { htmlText, htmlStyle } = form;
              htmlStyle.backgroundColor = bgColor;
              htmlStyle.color = primaryColor;
              // htmlStyle.textDecoration = `underline ${secondaryColor}`;
              return (
                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlText,
                  }}
                  style={htmlStyle}
                />
              );
            })()}
          </>
        ) : (
          <div id="previewForm">form</div>
        )}
        {button ? (
          <>
            {(() => {
              const { htmlText, htmlStyle } = button;
              htmlStyle.backgroundColor = bgColor;
              htmlStyle.color = primaryColor;
              // htmlStyle.textDecoration = `underline ${secondaryColor}`;
              return (
                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlText,
                  }}
                  style={htmlStyle}
                />
              );
            })()}
          </>
        ) : (
          <div id="previewButton">Button</div>
        )}
      </main>

      {/* <ul>
        {components
          ? components.map((component) => {
              return (
                <li key={component.id}>
                  {component.type}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(component.htmlText),
                    }}
                  />
                </li>
              );
            })
          : ""}
      </ul> */}
    </div>
  </div>
  );
};

export default PreviewPane;
