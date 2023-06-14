import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";
import { createUseStyles, generateStyles } from "react-jss";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const sanitizer = DOMPurify.sanitize;

const Test = () => {
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  const navbar = components.find((component) => component.type === "navbar");

  return navbar ? <NavbarWithStyles navbar={navbar} /> : null;
};

const NavbarWithStyles = ({ navbar }) => {
  const useStyles = createUseStyles(navbar.htmlStyle.styles);
  console.log("navbar styles", navbar.htmlStyle.styles);
  const classes = useStyles();
  console.log("classes", classes);

  const jsxGenerator = (component, classes) => {
    const { htmlText } = component;

    const sanitizedHtml = DOMPurify.sanitize(htmlText);

    const parsedHtml = parse(sanitizedHtml, {
      replace: (domNode) => {
        if (domNode.name === "ul") {
          return React.createElement(
            "div",
            {
              className: classes.ul,
              style: { color: navbar.htmlStyle.colors.secondaryColor },
              href: domNode.attribs.href,
            },
            domNode.children
          );
        }
        if (domNode.name === "div" && domNode.attribs.class === "dropdown") {
          return React.createElement(
            "div",
            {
              className: classes.dropdown,
              style: { color: navbar.htmlStyle.colors.secondaryColor },
              href: domNode.attribs.href,
            },
            domNode.children
          );
        }
        if (domNode.name === "div" && domNode.attribs.class === "dropdown-content") {
          return React.createElement(
            "div",
            {
              className: classes.dropdownContent,
              style: { color: navbar.htmlStyle.colors.secondaryColor },
              href: domNode.attribs.href,
            },
            domNode.children
          );
        }
        if (domNode.name === "a" && domNode.attribs.class === "dropdown-content-links") {
          return React.createElement(
            "div",
            {
              className: classes.dropdownContentLinks,
              style: { color: navbar.htmlStyle.colors.secondaryColor },
              href: domNode.attribs.href,
            },
            domNode.children
          );
        }

        // Add more conditions for other tags and styles as needed
        return undefined; // Return undefined to keep parsing other nodes as default
      },
    });

    return parsedHtml;
  };

  return navbar ? (
    <div>
      <ul>
        <div
          className={classes.navbar}
          dangerouslySetInnerHTML={{
            __html: jsxGenerator(navbar, classes),
          }}
        />
      </ul>
    </div>
  ) : null;
};

export default Test;

//code from Marie
// htmlStyle: {
//   backgroundColor: primaryColor,
//   padding: "1rem",
// },
// inputLabel: {
//   color: tertiaryColor,
// },
// inputField: {
//   borderRadius: "0.5rem",
//   border: `2px solid ${secondaryColor}`,
//   padding: "0.5rem",
//   outline: "none",
// },
// checkboxLabel: {
//   color: secondaryColor,
// },
// radioLabel: {
//   color: secondaryColor,
// },
// submitButton: {
//   border: "none",
//   backgroundColor: tertiaryColor,
//   color: primaryColor,
//   padding: "0.5rem 1rem",
//   borderRadius: "0.25rem",
//   cursor: "pointer",
// },
// {
//   type: "form",
//   name: "plain form two",
//   htmlText: `
//     <div>
//       <form style="background-color: bgColor; padding: 1rem;">
//         <div style="margin-bottom: 1rem;">
//           <label for="inputField" style="color: primaryColor; font-weight: bold;">Type someth
