import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./navBar";


function Profile() {
        const userName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("userEmail");


  return (
    <>
    <NavBar />
    <h1>Who are you?</h1>
    <h2>{userName}</h2>
    <h2>{userEmail}</h2>
    </>
  );
}

export default Profile;