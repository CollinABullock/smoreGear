import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./NavBar.css"


function NavBar(props) {
  let navigate = useNavigate();
  return (
    <nav>
      {props.isLoggedIn ? (
        <>

          <Link className="links" to="/">Posts</Link>
          <Link className="links" to="/profile">My Profile</Link>
          <Link className="links" to="/create-post">Create Post</Link>
          <button id="logout-button"
            onClick={() => {
              props.setIsLoggedIn(false);
              localStorage.removeItem("token"); //Removes token from local storage when logout is clicked.
              navigate("/")
          }}>Logout
          </button>
        </>
      ) : (
        <>
       
          <Link className="links" to="/">
            Posts
          </Link>
          <Link className="links" to="/login">
            Login
          </Link>
          <Link className="links" to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;