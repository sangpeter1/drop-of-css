import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      // console.log(credentials);
      await dispatch(attemptLogin(credentials));
      console.log("successful");
      navigate("/");
    } catch (err) {
      setErrorMessage("username or password is incorrect");
      console.log("login error", err);
    }
  };

  return (
    <div className="login">
      <h3 className="proheader">Login</h3>
      <form onSubmit={login}>
        <label>Username</label>
        <input
          value={credentials.username}
          name="username"
          onChange={onChange}
          autoComplete="username"
        />
        <label>Password</label>
        <input
          name="password"
          value={credentials.password}
          onChange={onChange}
          autoComplete="password"
          style={{ marginBottom: "8px" }}
        />
        <div
          style={{
            margin: "0 auto",
            color: "darkred",
            fontSize: "calc(4px + 0.5vw)",
            fontStyle: "italic",
            minHeight: "2vh",
          }}
        >
          {errorMessage ? errorMessage : <div style={{ minHeight: "(4px + 0.5vw)" }}></div>}
        </div>
        <button type="submit" style={{ display: "none" }}></button>
        <div className="rainbowBtn" type={"submit"} onClick={login}>
          Login
        </div>
        <div className="rainbowBtn">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`}
            style={{
              fontSize: "13.33333px",
              fontFamily: "Arial, sans-serif",
              color: "white",
              textDecoration: "none",
            }}
          >
            Login with Github
          </a>
        </div>{" "}
        <div className="rainbowBtn">
          <Link
            to={"/register"}
            style={{
              maxWidth: "10px",
              fontSize: "13.33333px",
              fontFamily: "Arial, sans-serif",
              color: "white",
              textDecoration: "none",
            }}
          >
            Create New User
          </Link>
        </div>
      </form>

      {/* <UserCreate /> */}
    </div>
  );
};

export default Login;
