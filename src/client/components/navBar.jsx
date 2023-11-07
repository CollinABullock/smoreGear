import { Link, useNavigate } from "react-router-dom";
import React from "react";




function NavBar(props) {
  let navigate = useNavigate();
  return (
    <nav>
      {props.isLoggedIn ? (
        <>

          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/users">Users</Link>
          <Link className="links" to="/products">For Sale!</Link>
          <Link className="links" to="/profile">My Profile</Link>
          <Link className="links" to="/create-post">Sell Something!</Link>
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
      )}
    </nav>
  );
}

export default NavBar;