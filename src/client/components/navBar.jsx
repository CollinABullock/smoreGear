import { Link, useNavigate } from "react-router-dom";
import React from "react";

function NavBar(props) {
  let navigate = useNavigate();
  return (
    <>
    <div className="logoDiv">
    <img src="src/client/assets/images/smoregearlogo.jpg" className="logoPic"/>
    </div>
    <h1>Buy and sell everything you need for the great outdoors!</h1>
    <nav>
      {props.isLoggedIn ? (
        <div className="navbar">
          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/users">Users</Link>
          <Link className="links" to="/products">For Sale!</Link>
          <Link className="links" to="/profile">My Profile</Link>
          <Link className="links" to="/products/create-post">Sell Something!</Link>
          <button id="logout-button"
            onClick={() => {
              props.setIsLoggedIn(false);
              localStorage.removeItem("token"); //Removes token from local storage when logout is clicked.
              navigate("/")
          }}>Logout
          </button>
        </div>
      ) : (

        <>
        <div className="navbar">
          <Link className="links" to="/">
            Home
            </Link>
        
       
          <Link className="links" to="/products">
            See What's For Sale!  
          </Link>
          <Link className="links" to="/login">
            Login  
          </Link>
          <Link className="links" to="/register">
            Register  
          </Link>

          <Link className="links" to="/shoppingcart">
            ShoppingCart
          </Link>
        </>
        </div>
      )}
    </>
  );
}

export default NavBar;