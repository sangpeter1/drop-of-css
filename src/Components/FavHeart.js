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

  useEffect(() => {
    if (auth) {
      dispatch(setTemplates(auth.id));
    }
  }, [auth]);

  const isFavorite = templates.some((fav) => component.htmlText === fav.htmlText);
  const toUnfavorite = templates.find((fav) => component.htmlText === fav.htmlText);

  const onHandleHeartClick = async () => {
    if (!auth.id) {
      await setHeartClicked(false);
    } else if (auth.id) {
      component.userId = auth.id;
      dispatch(createTemplate(component));
      await setHeartClicked(true);
    }
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
