import React, { useState, useEffect } from "react";
import NavBar from "./navBar";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  console.log("at first",users);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  console.log(searchParams);

  async function FetchAllUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const result = await response.json();
      console.log(result);
      return result
    } catch (error) {
      console.log(error);
    }
  }

  useEffect (() => {
    async function getAllUsers() {
      const response = await FetchAllUsers();
      console.log("second response", response);
        try {
          setUsers(response.users);
        } catch (error) {
          console.log(error);
        }
    }
    getAllUsers();
  }, []);

  const displayedUsers = searchParams ? users.filter((user) =>
    user.name.toLowerCase().includes(searchParams)
  ) : users;

  console.log("displayed users", displayedUsers);
  console.log("all users", users);

  return (
    <>
    <NavBar />
    <div>
      <label>
        Search{" "}
        <input type="text"
        placeholder="search"
        onChange={(e) => setSearchParams (e.target.value.toLowerCase())}
        />
      </label>
    </div>

    {console.log("towards the end", users)}
    {!error && displayedUsers.map((user) => {
      return (
        <>
       <div>
       <a href={`/users/${user.id}`}>
    {user.name} </a>
  </div>
      </>
      )
    })}
    </>
  );
}