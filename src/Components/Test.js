import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComponents } from "../store";

const Test = () => {
    
  const { components } = useSelector((state) => state);
  const dispatch = useDispatch();
  //const [components, setComponents] = useState("");
  
 /* useEffect(() => {
     dispatch(fetchComponents());
     async function fetchData() {
       const response = await dispatch(fetchComponents());
       console.log("use effect response", response);
       setComponents(response);
     }
     fetchData();
  }, []); */
  
  /*useEffect(()=> {
    dispatch(fetchComponents());
  }, []);*/
 
 
  /*return (
      <div>
        <ul>
          {
            components.map( component => {
              return (
                <li key={ component.id }>
                  {component.type}{component.htmlText}
                </li>
              );  
            })
          }
        </ul>
      </div>
    );*/
};

export default Test;