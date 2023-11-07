import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./navBar";


function Profile() {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    async function userProfile() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/users/me`, {
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
    <>
    <NavBar />
    <div className="message-container">
      <div className="profileTag">
        <h1>Profile</h1>
      </div>
      <div id="messageBox">
        <p></p>
        <h2>Messages</h2>
        {messages.length ? (
          messages.map((e) => {
            return (
              <div key={e._id} className="profileMessages">
                {e.content}
              </div>
            );
          })
        ) : (
          <div>No Messages Found</div>
        )}
      </div>
    </div>
    </>
  );
}

export default Profile;