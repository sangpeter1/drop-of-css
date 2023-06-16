import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store";
import { useNavigate, Link } from "react-router-dom";
import { attemptLogin } from "../store";

const UserCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = async (ev) => {
    ev.preventDefault();
    const credentials = {
      username,
      password,
      email,
    };

    try {
      await dispatch(register(credentials));
      dispatch(attemptLogin(credentials));
      navigate("/");
    } catch (err) {
      setErrorMessage("username or email already exists");
      console.log(err);
    }
  };

  return (
    <div className="login">
      <h3 className="proheader">Create Account</h3>
      <form onSubmit={registerUser}>
        <label>Username</label>

        <input value={username} onChange={(ev) => setUsername(ev.target.value)} name="username" />
        <label>Password</label>

        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          name="password"
        />
        <label>Email</label>

        <input value={email} onChange={(ev) => setEmail(ev.target.value)} name="email" />

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

        <button className="rainbowBtn">Create Account</button>
      </form>
      <button className="rainbowBtn">
        <Link
          to={"/login"}
          style={{
            maxWidth: "10px",
            fontSize: "13.33333px",
            fontFamily: "Arial, sans-serif",
            color: "white",
            textDecoration: "none",
          }}
        >
          Back
        </Link>
      </button>
    </div>
  );
};

export default UserCreate;
