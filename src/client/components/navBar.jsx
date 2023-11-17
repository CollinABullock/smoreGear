import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

function NavBar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  console.log(isLoggedIn);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  let navigate = useNavigate();
  return (
    <>
    <div className="slogan">
      <h1>Buy and sell everything you need for the great outdoors!</h1>
      </div>
      <nav>
      {isLoggedIn ? (
        <>
         <div className="navbar" >
          <Link className="links" to="/users/profile">My Profile</Link>
          <Link className="links" to="/products/create-post">Create Post</Link>
          <Link className="links" to="/products">See what's for sale</Link>
          <button id="logout-button"
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("token"); //Removes token from local storage when logout is clicked.
              navigate("/")
          }}>Logout
          </button>
          </div>
        </>
      ) : (
        <>
          {/* // These links are showed when the user is logged out. */}
          <Link className="links" to="/products">
           See what's for sale
          </Link>
          <Link className="links" to="/">
            Login
          </Link>
          <Link className="links" to="/users/register">
            Register
          </Link>
          <Link className="links" to="/products/create-post">
            Sell something!
          </Link>
         
        </>
      )}
    </nav>

    </>
  );
}

export default NavBar;
