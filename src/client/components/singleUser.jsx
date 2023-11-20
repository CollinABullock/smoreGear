import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./navBar";

async function fetchSingleUser(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}


export default function SingleUser() {
  const [user, setUser] = useState([]);

  const {id} = useParams();
  console.log(id);

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/users");
  }

 useEffect(() => {
  async function getSingleUser() {
    const response = await fetchSingleUser(id);
    console.log("response", response);
    setUser(response);
  }
  getSingleUser()
 }, [])

 console.log("towards the end", user);

  return (
    <>
    <NavBar />
    <h1>{user.name}</h1>
    <h3>{user.email}</h3>
      
    </>
  )
}