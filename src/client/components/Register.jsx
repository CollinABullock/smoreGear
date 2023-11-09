import React, { useState } from "react";
// import "./Register.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";


const Register = () => {
    
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3000/api/users/register', {
          method: 'POST',
          headers: {
            
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          console.log('Registration successful!', data);
          // Handle successful registration, e.g., redirect to login page
        } else {
          console.error('Registration failed:', data.message);
          // Handle registration error, e.g., display error message to the user
        }
      } catch (error) {
        console.error('Error during registration:', error.message);
      }
      
    };
  
    return (
      <>
      <NavBar />
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      </>
    );
  };
  
  export default Register;
