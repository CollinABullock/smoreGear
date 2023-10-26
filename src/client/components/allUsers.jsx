import { useState, useEffect } from "react";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
    <h1>Users</h1>


    <div className="cell-container">
    {users.map((user) => {
      return (
        <>
        <div className="cell">
        <h2>{user.name}</h2>
        </div>
        </>
      )
    })}</div>
    </>
  )
}