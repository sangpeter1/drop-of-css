import React, { useEffect, useRef, useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Test from "./Test";
import { Profile, ProfileAccount, ProfileComponents } from "./Profile";
import ColorGenForm from "./ColorGenForm";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { loginWithToken, fetchComponents, fetchColorPalette } from "../store";
import UserCreate from "./UserCreate";

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
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {!auth.id && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/cpgform" element={<ColorGenForm />} />
              <Route path="/test" element={<Test />} />
              <Route path="/register" element={<UserCreate />} />
            </>
          )}
          {auth.id && (
            <>
              <Route path="/cpgform" element={<ColorGenForm />} />
              <Route path="/test" element={<Test />} />
              <Route path="/profile" element={<Profile />}>
                <Route index element={<ProfileAccount />} />
                <Route path="account" element={<ProfileAccount />} />
                <Route path="components" element={<ProfileComponents />} />
              </Route>
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
