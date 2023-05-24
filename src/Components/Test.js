import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

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
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(component.htmlText),
                    }}
                  />
                  {/* we should consider using something like https://www.npmjs.com/package/dompurify if we're going to have to use the tag "dangerouslySetInnerHTML" 
                  the code is something like this
                  import DOMPurify from 'dompurify';
                  const sanitizer = DOMPurify.sanitize;
                 <div dangerouslySetInnerHTML={{ __html: sanitizer(component.htmlText) }} />*/}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};

export default Test;
