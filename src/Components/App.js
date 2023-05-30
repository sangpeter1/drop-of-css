import React, { useEffect, useRef, useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Logout from "./Logout";
import Test from "./Test";
import ColorGenForm from "./ColorGenForm";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
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
      dispatch(fetchColorPalette({ hex: "FFFFFF", mode: "dark", count: 5 }));
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
      {!!auth.id && (
        <div> 
          <Nav />
          <Home />
          <div>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/cpgform" element={<ColorGenForm />} />
              <Route path="/test" element={<Test />} />
              <Route path="/login" element={<Login />}/>
            </Routes>
          </div>
        </div>
      )}
      { auth.id ? <Logout /> : <Login /> }
      { /* ^ I just put this in to work on oauth and 
        to get the nav bar working, we can definitely change this
        back later -MT*/}
    </div>
  );
};

export default App;
