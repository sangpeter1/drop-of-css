import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCreate from "./UserCreate";


const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate(`/`);
  };

  return (
    <div className="login" style={{width: "33%", height: "33%",justifyContent: "center", alignItems: "center"}}>
      <h3 className="header">Login</h3>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <button className="rainbowBtn">Login</button>
        <div className="rainbowBtn">
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`}
          style= {{ fontSize: "13.33333px", fontFamily: "Arial, sans-serif", color: "white", textDecoration: "none"}}
        >
          Login with Github
        </a>
      </div>
      </form>
      
      <UserCreate />
    </div>
  );
};

export default Login;
