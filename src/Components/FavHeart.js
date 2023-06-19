import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { createTemplate, setTemplates, deleteTemplate } from "../store";

const FavHeart = ({ component }) => {
  const { templates, auth } = useSelector((state) => state);
  const [heartClicked, setHeartClicked] = useState(false);
  const dispatch = useDispatch();

  // things that need to happen:
  // 1. a click needs to turn the object red, and it also needs to submit the current code to favorites.
  // 2. an unclick needs to clear the code from the template list, but doesn't clear local storage.

  // if (templates && templates.find((template) => template.id === component.id)) {
  //   setHeartClicked(!isHeartClicked);
  // }

  useEffect(() => {
    if (auth) {
      dispatch(setTemplates(auth.id));
    }
  }, [auth]);

  const isFavorite = templates.some((fav) => component.htmlText === fav.htmlText);
  const toUnfavorite = templates.find((fav) => component.htmlText === fav.htmlText);

  // console.log(component ? component : "no component");
  // console.log(templates ? templates : "no templates");
  // console.log(isFavorite ? isFavorite : "favorites");
  // console.log(auth ? auth : "no auth");

  const onHandleHeartClick = async () => {
    if (auth) {
      component.userId = auth.id;
      // console.log("favorited");
      dispatch(createTemplate(component));
      await setHeartClicked(true);
      // console.log("dispatched");
      // console.log("isfavorite?", isFavorite);
    }
    // if (!auth) {
    //   <HeartBrokenIcon />;
    //   ("not logged in");
    // }
  };
  const offHandleHeartClick = async () => {
    dispatch(deleteTemplate(toUnfavorite.id));
    await setHeartClicked(false);
  };

  return (
    <span>
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "#f44336" }} onClick={offHandleHeartClick} />
      ) : (
        <FavoriteBorderIcon onClick={onHandleHeartClick} />
      )}
    </span>
  );
};

export default FavHeart;
