import React, { useEffect, useRef, useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Test from "./Test";
import Profile from "./Profile";
import ColorGenForm from "./ColorGenForm";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { loginWithToken, fetchComponents, fetchColorPalette } from "../store";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const prevAuth = useRef(auth);

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log(`${auth.username} is logged in`);
      dispatch(fetchComponents());
      // dispatch(fetchColorPalette({ hex: "FFFFFF", mode: "dark", count: 5 }));
    }
    if (prevAuth.current.id && !auth.id) {
      console.log("logged out");
    }
  }, [auth]);

  useEffect(() => {
    prevAuth.current = auth;
  });

  return (
    <div>
      <Nav />
      {auth.id ? (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cpgform" element={<ColorGenForm />} />
            <Route path="/test" element={<Test />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};
export default App;
