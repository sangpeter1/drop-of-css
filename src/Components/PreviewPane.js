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

  useEffect(() => {
    try {
      generatedColors.map((color) => {
        if (color.hsv.v > 80) {
          setBgColor(color.hex.value);
        }
        if (color.hsv.s > 70) {
          setPrimaryColor(color.hex.value);
        }
        if (color.hsv.s > 30) {
          setSecondaryColor(color.hex.value);
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

  if (title) {
    console.log(JSON.stringify(title.htmlStyle));
  }

  // const parsedStyles = JSON.parse(`{${title.htmlStyle}}`);

  return (
    <div
      className="preview-pane-container"
      style={{ backgroundColor: bgColor }}
    >
      {title ? (
        <>
          {(() => {
            //this was a pain in the ass. i hope there's an easier way --jdb
            const { htmlText, htmlStyle } = title;
            htmlStyle.backgroundColor = bgColor;
            htmlStyle.color = primaryColor;
            htmlStyle.textDecoration = `underline ${secondaryColor}`;
            console.log(
              "in title",
              bgColor,
              primaryColor,
              secondaryColor,
              htmlStyle
            );
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
        <h1
          style={{
            // backgroundColor: bgColor,
            boxSizing: "border-box",
            gridRow: 1,
            gridColumn: "1 / 3",
            fontSize: "32px",
            // color: primaryColor,
            fontWeight: "bold",
            textAlign: "right",
            margin: "20px 0",
            textTransform: "uppercase",
            letterSpacing: "2px",
            // textDecoration: "underline" + secondaryColor,
          }}
        >
          Your Website Title
        </h1>
      )}
      {nav ? (
        <nav
          id="previewNav"
          dangerouslySetInnerHTML={{
            __html: sanitizer(nav.htmlText),
          }}
        />
      ) : (
        <nav id="previewNav">Nav</nav>
      )}
      {sideNav ? (
        <nav
          id="previewSideNav"
          dangerouslySetInnerHTML={{
            __html: sanitizer(sideNav.htmlText),
          }}
        />
      ) : (
        <nav id="previewSideNav">Side Nav</nav>
      )}

      <main className="preview-pane-Main-Content">
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
            dangerouslySetInnerHTML={{
              __html: sanitizer(form.htmlText),
            }}
          />
        ) : (
          <div id="previewForm">form</div>
        )}
        {button ? (
          <div
            id="previewButton"
            dangerouslySetInnerHTML={{
              __html: sanitizer(button.htmlText),
            }}
          />
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
  );
};

export default PreviewPane;
