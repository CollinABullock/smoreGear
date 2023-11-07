import React from "react";
import NavBar from "./navBar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


const BASE_URL = 'http://localhost:3000';


function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // submit function passed in OnSubmit in form below.
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(name, email, password)
        try {
            const result = await registerUser(); // Passing our async function in from below.
            console.log(result.data)

            localStorage.setItem("token", result.data.token) // Storing only key-value pair for token.
            props.setIsLoggedIn(true)  // Telling program login is true.

            navigate('/products')
        } catch (error) {
            console.log(error)
        }

    }

    async function registerUser() {
        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        name: name,
                        email: email,
                        password: password,
                    }
                })
            });  // Outside of fetch starting here.
            const result = await response.json()
            return result;
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <>
      <NavBar />
        <div id="register-container"> 
            <h1 id="registerheader">REGISTER</h1><br />
            <form id="registerform" onSubmit={handleSubmit}>
                <label className="labels">Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setName(e.target.value);
                        }}
                    />
                </label><br />

                <label className="labels">Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setEmail(e.target.value);
                        }}
                    />
                </label>

                <label className="labels">Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setPassword(e.target.value);
                        }}
                    />
                </label>
                <button id="registerbutton"type="submit">Submit</button>

            </form>
        </div>
        </>
    )
}




export default Register;