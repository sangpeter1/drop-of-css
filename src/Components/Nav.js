import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import colorWheelImage from "../images/colorwheel320.png";
import { logout } from "../store";
import Home from "./Home";

const Nav = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // navigate(<Link to={<Home />} />);
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav>
        <img src={colorWheelImage} />
        <div id="navSiteTitle">
          <h1>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              A Drop of CSS
            </Link>
          </h1>
          <h5 style={{ padding: 0, color: "white" }}>JSX Color Palette and Component Builder</h5>
        </div>

        <div id="navlinks" style={{ justifyContent: "flex-end", marginRight: "2rem" }}>
          <div>
            {auth.id && (
              <div>
                <Link to="/" style={{ color: "white", textDecoration: "none", margin: ".5rem" }}>
                  Home
                </Link>
                <Link
                  to="/profile"
                  style={{ color: "white", textDecoration: "none", margin: ".5rem" }}
                >
                  Profile
                </Link>
                <Link
                  style={{ color: "white", textDecoration: "none", margin: ".5rem" }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
          <div>
            {!auth.id && (
              <div>
                <Link to="/" style={{ color: "white", textDecoration: "none", margin: ".5rem" }}>
                  Home
                </Link>
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: ".5rem 2rem",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
