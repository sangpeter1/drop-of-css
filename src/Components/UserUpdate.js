import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store";
import { useNavigate } from "react-router-dom";


const UserUpdate = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const isOAuthUser = useSelector((state) => state.auth.isOAuthUser);
  
  const updateUser = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth({ username, password, email }));
    setUsername("");
    setPassword("");
    setEmail("");
    navigate("/profile");
  };
  
   if (isOAuthUser) {
    return <div>You are logged in via Github. Email and password updates are not allowed.</div>;
  }
 
  return (
    <div>
      <form onSubmit={ updateUser }>
        <input 
          value={ username } 
          onChange={ ev => setUsername(ev.target.value)} 
          placeholder="username"
          name="username"
        />
        <input 
          value={ password } 
          onChange={ ev => setPassword(ev.target.value)}          
          type="password"
          placeholder="password"
          name="password" 
        />
        <input 
          value={ email } 
          onChange={ ev => setEmail(ev.target.value)}          
          placeholder="email"
          name="email" 
        />
        <button className="rainbowBtn">
          Update Account
        </button>
      </form>
    </div>
  );
};


export default UserUpdate;