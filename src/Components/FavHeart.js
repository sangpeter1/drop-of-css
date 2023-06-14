import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa"; 
import { setTemplates } from "../store";
import { saveComponent } from "./PreviewPane";

const FavHeart = ({component}) => {
  const { templates, auth } = useSelector(state => state);
  const [isHeartClicked, setHeartClicked] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setTemplates())
  }, []);

  if( templates && templates.find(template => template.id === component.id)) {
    setHeartClicked(!isHeartClicked);
  }

  const handleHeartClick = (ev) => {
    ev.preventDefault();
    setHeartClicked(!isHeartClicked);
    //saveComponent(component);
  }

  return (
    <span className="top-right-span">
          <FaHeart 
            className= {`heart-icon ${isHeartClicked? 'heart-clicked': ''}`}
            onClick={handleHeartClick}
          />
    </span>
  )
}

export default FavHeart;