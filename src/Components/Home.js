import React, { useEffect, useState } from "react";
import PreviewPane from "./PreviewPane";
import Components from "./Components";
import ColorGenForm from "./ColorGenForm";

const Home = () => {
  const [form, setForm] = useState(null);
  const [nav, setNavBar] = useState(null);
  const [title, setTitle] = useState(null);
  const [sideNav, setSideNav] = useState(null);
  const [card, setCard] = useState(null);
  const [button, setButton] = useState(null);
  const [generatedColors, setGeneratedColors] = useState(null);

  const handleOpenInPreview = (component) => {
    console.log("handle open in preview on home page", component);
    if (component.type === "navbar") {
      setNavBar(component);
    }
    if (component.type === "form") {
      setForm(component);
    }
    if (component.type === "title") {
      setTitle(component);
    }
    if (component.type === "sideNav") {
      setSideNav(component);
    }
    if (component.type === "card") {
      setCard(component);
    }
    if (component.type === "button") {
      setButton(component);
    }
  };

  return (
    <div>
      <div id="page-container-div">
        <div id="page-container-left-divs">
          <div id="cpg-div">
            <ColorGenForm openColorsInPreview={setGeneratedColors} />
          </div>
          <div id="component-div">
            <Components openInPreview={handleOpenInPreview} generatedColors={generatedColors} />
          </div>
        </div>
        <div id="preview-pane-div">
          <PreviewPane
            form={form}
            nav={nav}
            title={title}
            sideNav={sideNav}
            card={card}
            button={button}
            generatedColors={generatedColors}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

// module.exports = {
//   form,
//   nav,
//   title,
//   sideNav,
//   card,
//   button,
//   generatedColors
// }

