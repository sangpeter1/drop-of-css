import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const FavHeart = ({component}) => {
  const [isHeartClicked, setHeartClicked] = useState(false);

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