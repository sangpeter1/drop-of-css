import React, { useEffect, useState } from "react";
import PreviewPane from "./PreviewPane";
import Components from "./Components";
import ColorGenForm from "./ColorGenForm";


const Home = () => {

  const [form, setForm] = useState(null);
  const [nav, setNavBar] = useState(null);
  const [title, setTitle] = useState(null);
  const [generatedColors, setGeneratedColors] = useState(null);

  const handleOpenInPreview = (component) => {
    console.log("in app page", component);
    if (component.type === "navbar") {
      setNavBar(component);
    }
    if (component.type === "form") {
      setForm(component);
    }
    if (component.type === "title") {
      setTitle(component);
    }
  };

  return (
    <div>
      <div id="page-container-div">
        <div id="page-container-right-divs">
          <div id="cpg-div">
            <ColorGenForm openColorsInPreview={setGeneratedColors} />
          </div>
          <div id="component-div">
            <Components openInPreview={handleOpenInPreview} />
          </div>
        </div>
        <div id="preview-pane-div">
          <PreviewPane
            form={form}
            nav={nav}
            title={title}
            generatedColors={generatedColors}
          />
        </div>
      </div>  
    </div>   
  );
};

export default Home;
