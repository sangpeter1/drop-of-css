import React, { useEffect, useRef } from "react";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Test from "./Test";
import PreviewPane from "./PreviewPane";
import Components from "./Components";
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
      <Nav />
      <div id="page-container-div">
        <div id="component-div">
          <Components />
        </div>
        <div id="page-container-right-divs">
          <div id="cpg-div">
            <ColorGenForm />
          </div>
          <div id="preview-pane-div">
            <PreviewPane />
          </div>
        </div>
      </div>

      {!!auth.id && (
        <div>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/cpgform" element={<ColorGenForm />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
