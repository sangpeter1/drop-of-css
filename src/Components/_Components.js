// [Peter] I'm moving the experimental navbar with dropped down menu here //
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";
import { createUseStyles, generateStyles } from "react-jss";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const sanitizer = DOMPurify.sanitize;

const { components } = useSelector((state) => state);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchComponents());
}, []);

export const Navbar = ({ generatedColors }) => {
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  const navbar = components.find((component) => component.type === "navbar");

  return navbar ? <NavbarWithStyles navbar={navbar} /> : null;
};

export const NavbarWithStyles = ({ navbar }) => {
  const useStyles = createUseStyles(navbar.htmlStyle.styles);
  // const { primaryColor, secondarycolor} = generatedColors;

  // const styles = JSON.stringify(navbar.htmlStyle.styles)
  // .replace(/{colors.primaryColor}/g, primaryColor)
  // .replace(/{colors.secondaryColor}/g, secondaryColor);

  const classes = useStyles();
  // console.log("classes", classes);

  const parseNode = (domNode, classes) => {
    if (domNode.type === "tag") {
      const children = domNode.children.map((childNode) => parseNode(childNode, classes));

      if (domNode.name === "ul") {
        // console.log("ul", domNode.name);
        return React.createElement(
          "div",
          {
            className: classes.ul,
            style: { color: navbar.htmlStyle.colors.secondaryColor },
            href: domNode.attribs.href,
          },
          children
        );
      }

      if (domNode.name === "ul" && domNode.attribs.class === "navbar") {
        // console.log("ul", domNode.attribs.class);
        return React.createElement(
          "div",
          {
            className: classes.ul,
            style: { color: "black" },
            href: domNode.attribs.href,
          },
          children
        );
      }

      if (domNode.name === "div" && domNode.attribs.class === "dropdown-content") {
        // console.log("dropdown-content", domNode.attribs.class);

        return React.createElement(
          "div",
          {
            className: classes.dropdownContent,
            style: { color: navbar.htmlStyle.colors.secondaryColor },
            href: domNode.attribs.href,
          },
          children
        );
      }

      // Add more conditions for other tags and styles as needed

      return React.createElement(domNode.name, { ...domNode.attribs }, children);
    }

    if (domNode.type === "text") {
      return domNode.data;
    }

    // Handle other types of nodes as needed

    return null;
  };

  const jsxGenerator = (component, classes) => {
    const { htmlText } = component;
    const sanitizedHtml = DOMPurify.sanitize(htmlText);
    // console.log(JSON.stringify(sanitizedHtml, null, "2"));
    const domTree = parse(sanitizedHtml);

    return parseNode(domTree, classes);
  };

  // console.log("parsedHtml", jsxGenerator(navbar, classes));

  return navbar ? (
    <div
      className={classes.navbar}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(navbar.htmlText),
      }}
    />
  ) : null;
};

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
