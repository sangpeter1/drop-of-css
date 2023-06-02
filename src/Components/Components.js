import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchComponents, setColorsOnComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const Components = ({ openInPreview, generatedColors }) => {
  const { components } = useSelector((state) => state);
  const [bgColor, setBgColor] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  useEffect(() => {
    try {
      setBgColor("");
      setPrimaryColor("");
      setSecondaryColor("");
      setTertiaryColor("");

      generatedColors.forEach((color) => {
        if (color.hsv.s < 25 && color.hsv.v > 75) {
          setBgColor(color.hex.value);
        } else if (color.hsv.s > 91) {
          setPrimaryColor(color.hex.value);
        } else if (color.hsv.s > 40 && color.hsv.s < 90) {
          setSecondaryColor(color.hex.value);
        } else if (color.hsv.s >= 0 && color.hsv.s <= 40) {
          setTertiaryColor(color.hex.value);
        }
      });

      if (!secondaryColor) {
        setSecondaryColor("#3C6311");
      }
      if (!tertiaryColor) {
        setTertiaryColor("#71BC1E");
      }
      if (!bgColor) {
        setBgColor("#9013fe");
      }
    } catch (err) {
      console.log(err);
    }
  }, [generatedColors]);

  const handleOpenInPreview = (component) => {
    try {
      if (component) {
        console.log(
          component,
          bgColor,
          primaryColor,
          secondaryColor,
          tertiaryColor
        );
        const colorsOnComponents = dispatch(
          setColorsOnComponents({
            component,
            bgColor,
            primaryColor,
            secondaryColor,
            tertiaryColor,
          })
        )
          .then((colorsOnComponents) => {
            openInPreview(colorsOnComponents);
          })
          .then((colorsOnComponents) => {
            console.log(
              "open in preview function",
              openInPreview(colorsOnComponents)
            );
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const componentTypes = [
    ...new Set(components.map((component) => component.type)),
  ];

  return (
    <div className="componentlist">
      <h3 className="header">Select Components</h3>
      {componentTypes.map((type) => (
        <div key={type}>
          <h5>{type}</h5>
          <ul>
            {components
              .filter((component) => component.type === type)
              .map((component) => (
                <li
                  key={component.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenInPreview(component)}
                >
                  {component.name}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Components;
