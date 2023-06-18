import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaEnvelope } from "react-icons/fa";
import TemplateList from "./TemplateList";
import UserUpdate from "./UserUpdate";
import { setTemplates } from "../store";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  
  useEffect(() => {
    setTemplates(auth.id); // Update the local state when templates change
  }, []);

  if (!auth.id) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
  <div>
    <div className="profile-main">
      <h3 className="proheader">
        My Components
      </h3>
      <TemplateList />
    </div>
    <div className="profile">
      <div>
        <h4 className="proheader">
          Welcome {auth.username.charAt(0).toUpperCase() + auth.username.slice(1)}!
        </h4>
        <p>
          <FaUser className="custom-icon" /> {auth.username}
        </p>
        {auth.email && (
          <p>
            <FaEnvelope className="custom-icon" /> {auth.email}
          </p>
        )}
      </div>
      <div>
        <h4 className="proheader">Update Info</h4>
        <UserUpdate />
      </div>
    </div>
  </div>
  );
};

export default Profile;