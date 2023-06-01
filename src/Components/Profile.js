import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope } from 'react-icons/fa';
import UserUpdate from './UserUpdate';


const Profile = () => {
  
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <h3 className="header">
        {auth.username.charAt(0).toUpperCase() + auth.username.slice(1)}'s Profile
      </h3>
      <div className="profile">
        <div>
          <h4 className="header" > 
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
          <br/>
          <h4 className="header" >Update Info</h4>
          <UserUpdate />
        </div>
        <div>
          <h4 className="header" >My Templates</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;