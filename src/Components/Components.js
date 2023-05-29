import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const Components = ({ openInPreview }) => {
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();

  // all of this code might be helpful somewhere else in the preview page, but I want to get color working first!
  // const emptyDiv = (
  //   <>
  //     <div
  //       style={{
  //         backgroundColor: "grey",
  //         border: "1px solid lightgray",
  //         borderRadius: ".5rem",
  //       }}
  //     />
  //   </>
  // );
  // const [nav, setNavBar] = useState(emptyDiv);
  // const [title, setTitle] = useState(emptyDiv);
  // const [form, setForm] = useState(emptyDiv);
  // const [list, setList] = useState(emptyDiv);
  // const [card, setCard] = useState(emptyDiv);
  // const [buttons, setButtons] = useState(emptyDiv);
  // const [accordion, setAccordion] = useState(emptyDiv);

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  const handleOpenInPreview = (component) => {
    openInPreview(component);
  };

  return (
    <div>
      <ul>
        {components
          ? components.map((component) => {
              return (
                <li
                  key={component.id}
                  onClick={() => handleOpenInPreview(component)}
                >
                  {component.type}: {component.name}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};

export default Components;
