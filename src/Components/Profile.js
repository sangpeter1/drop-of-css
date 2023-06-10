import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope } from 'react-icons/fa';
import TemplateList from './TemplateList';
import UserUpdate from './UserUpdate';
import { Link, Outlet } from "react-router-dom";


const Profile = () => {
  const { auth } = useSelector((state) => state);

  if (!auth.id) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-main">
      <h3 className="header">
        Welcome {auth.username.charAt(0).toUpperCase() + auth.username.slice(1)}!
      </h3>
      <div className="profile-links">
        <div>
          <Link to="/profile/account">My Account</Link>
        </div>
        <div>
          <Link to="/profile/components">My Components</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const ProfileAccount = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="profile">
      <div>
        <h4 className="header">
          {auth.username.charAt(0).toUpperCase() + auth.username.slice(1)}'s Info
        </h4>
        <p>
          <FaUser className="custom-icon" /> {' '} { auth.username }
        </p>
        {auth.email && (
          <p>
            <FaEnvelope className="custom-icon" /> {' '} { auth.email }
          </p>
        )}
      </div>
      <div>
        <h4 className="header">Update Info</h4>
        <UserUpdate />
      </div>
    </div>
  );
};

const ProfileComponents = () => {
  return (
    <div>
      <TemplateList />
    </div>
  );
};

export { Profile, ProfileAccount, ProfileComponents };
