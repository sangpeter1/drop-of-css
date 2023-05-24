import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";

const Test = () => {
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  return (
    <div>
      <ul>
        {components
          ? components.map((component) => {
              return (
                <li key={component.id}>
                  {component.type}
                  {component.htmlText}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};

export default Test;
