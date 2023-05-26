import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

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
  console.log("in the preview pane page!!!", form, nav, generatedColors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  //this is just a test!!!
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    try {
      const bgColor = generatedColors[3].hex.value;
      setBgColor(bgColor);
    } catch (err) {
      console.log(err);
    }
  }, [generatedColors]);

  /*
  thing to think about with colors: 
    we'll probably have to have a consistent style, like lightest colors as background colors, boldest colors as accent pops, darkest colors as borders, lines, texts, etc? idk that's just my first thought when it comes to styling but i'm VERY open to messing around. 
   */

  console.log("bg color", bgColor);

  return (
    <div
      className="preview-pane-container"
      style={{ backgroundColor: bgColor }}
    >
      {title ? (
        <header
          id="previewTitle"
          dangerouslySetInnerHTML={{
            __html: sanitizer(title.htmlText),
          }}
        />
      ) : (
        <header id="previewTitle">Hey, here's the preview title!</header>
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
