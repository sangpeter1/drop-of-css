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
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#2d545e",
          color: "cornsilk",
          borderBottom: "4px solid #12343b",
          borderBottomRightRadius: "1rem",
        }}
      >
        <img
          src={colorWheelImage}
          style={{
            height: "4rem",
            width: "4rem",
            margin: "1rem",
            borderRadius: "50%",
            boxShadow: "1px 1px 16px 1px #12343b",
            justifyContent: "flex-start",
          }}
        />
        <div
          style={{
            flexDirection: "column",
            alignItems: "center",
            textAlign: "left",
            margin: 0,
            padding: 0,
            justifyContent: "flex-start",
            flexGrow: 1,
          }}
        >
          <h1
            style={{
              margin: ".5rem",
              padding: 0,
              ":hover": { color: "white" },
            }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              A Drop of CSS
            </Link>
          </h1>
          <h5 style={{ margin: ".5rem", padding: 0, color: "white" }}>
            JSX Color Palette and Component Builder
          </h5>
        </div>
        <div style={{ justifyContent: "flex-end", marginRight: "2rem" }}>
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
