import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchComponents, setColorsOnComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const Components = ({ openInPreview, generatedColors }) => {
  const { components } = useSelector((state) => state);
  const [colors, setColors] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);
  //useEffect checks for changes in colors
  useEffect(() => {
    const updateColors = async () => {
      try {
        setColors((prevColors) => ({
          ...prevColors,
          bgColor: bgColor || prevColors.bgColor || "",
          primaryColor: primaryColor || prevColors.primaryColor || "",
          secondaryColor: secondaryColor || prevColors.secondaryColor || "",
          tertiaryColor: tertiaryColor || prevColors.tertiaryColor || "",
        }));

        await Promise.all(
          generatedColors.map((color) => {
            return new Promise((resolve) => {
              setColors((prevColors) => {
                const updatedColors = { ...prevColors };
                console.log("before ifs", updatedColors);
                if (color.hsv.s > 70) {
                  console.log("primary", color);
                  updatedColors.primaryColor = color.hex.value;
                } else if (color.hsv.s > 40) {
                  console.log("secondary", color);

                  updatedColors.secondaryColor = color.hex.value;
                } else if (color.hsv.s > 10) {
                  console.log("tertiary", color);

                  updatedColors.tertiaryColor = color.hex.value;
                } else if (color.hsv.s <= 25 && color.hsv.v >= 75) {
                  console.log("bg", color);

                  updatedColors.bgColor = color.hex.value;
                }
                console.log("after ifs", updatedColors);

                return updatedColors;
              });

              resolve();
            });
          })
        );

        // console.log("after promise", colors);
      } catch (err) {
        console.log(err);
      }
    };

    // console.log("failed promise", colors);

    updateColors();
  }, [generatedColors]);
  //useEffect gives each color a default if the colors come up empty
  useEffect(() => {
    // console.log("updated colors", colors);
    if (!colors.bgColor) {
      setColors((prevColors) => ({
        ...prevColors,
        bgColor: "#F0F0F0",
      }));
    }
    if (!colors.primaryColor) {
      setColors((prevColors) => ({
        ...prevColors,
        primaryColor: "#000000",
      }));
    }
    if (!colors.secondaryColor) {
      setColors((prevColors) => ({
        ...prevColors,
        secondaryColor: "#3C6311",
      }));
    }
    if (!colors.tertiaryColor) {
      setColors((prevColors) => ({
        ...prevColors,
        tertiaryColor: "#71BC1E",
      }));
    }
  }, [colors]);

  const handleOpenInPreview = (component) => {
    try {
      if (component) {
        // console.log(component, colors);
        const colorsOnComponents = dispatch(
          setColorsOnComponents({
            component,
            colors,
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
