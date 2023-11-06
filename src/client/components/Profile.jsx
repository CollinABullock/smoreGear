import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";
import Delete from "./Delete";


const BASE_URL = `http://localhost:3000`;

function Profile() {

  const user = {
    name: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et libero justo.',
    profilePicture: 'https://example.com/profile-picture.jpg',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://www.linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  }
  useEffect(() => {
    async function userProfile() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Outside of fetch starting here.
        const result = await response.json();
        console.log(result.data.messages);
        setMessages(result.data.messages);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
    userProfile();
  }, []);

  return (
    <div className="profile-container">
      <img src={user.profilePicture} alt="Profile" className="profile-picture" />
      <h1>{user.name}</h1>
      <p className="bio">{user.bio}</p>
      <div className="social-links">
        <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Profile;