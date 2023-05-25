import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/test">Test</Link>
        <Link to="/cpgform">Color Generator</Link>
      </nav>
    </div>
  );
};

export default Nav;
