import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    //navigate(`/`);
  };

  return (
    <div className="login">
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
      </form>
      <div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`}
        >
          Login with Github
        </a>
      </div>
    </div>
  );
};

export default Login;
