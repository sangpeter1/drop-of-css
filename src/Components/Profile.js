import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Profile = () => {
  
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <div>
        Welcome, {auth.username} !!
      </div>
    </div>
  );
};

export default Profile;