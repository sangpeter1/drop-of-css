import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

const Components = () => {
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();

  //i think this is how you can pass the data to the preview pane page. i'll have to check old code.
  const [nav, setNavBar] = useState("");
  const [title, setTitle] = useState("");
  const [form, setForm] = useState("");
  const [list, setList] = useState("");
  const [card, setCard] = useState("");
  const [buttons, setButtons] = useState("");
  const [accordion, setAccordion] = useState("");

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  return (
    <div>
      <ul>
        {components
          ? components.map((component) => {
              return <li key={component.id}>{component.type}</li>;
            })
          : ""}
      </ul>
    </div>
  );
};

export default Components;
