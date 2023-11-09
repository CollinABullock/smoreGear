import React, { useState } from "react";
// import "./Register.css";
import { useNavigate } from "react-router-dom";


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
        const response = await fetch('http://localhost:3000/register', {
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
    );
  };
  
  export default Register;
// function Register(props) {
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const result = await registerUser();
//             localStorage.setItem("token", result.data.token);
//             props.setIsLoggedIn(true);
//             navigate("/");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     async function registerUser() {
//         try {
//             const response = await fetch('http://localhost:3000/api/users/register', {
//                 method: "POST",
//                 headers: {
//                   'Authorization': Bearer,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     user: {
//                         name: name,
//                         password: password,
//                         email: email, // Include email in the request body
//                     },
//                 }),
//             });
//             const result = await response.json();
//             return result;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div id="register-container">
//             <h1 id="registerheader">REGISTER</h1>
//             <form id="registerform" onSubmit={handleSubmit}>
//                 <label className="labels">
//                    Name:
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </label>

//                 <label className="labels">
//                     Email:
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </label>

//                 <label className="labels">
//                     Password:
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </label>
//                 <button id="registerbutton" type="submit">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Register;













// import React, { useState } from 'react';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const [token, setToken] = useState(null);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/register', {
//         method: 'POST',
//         headers: {
         
//           'Authorization': `Bearer${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       console.log('Response from server:', response);
//       const data = await response.json();

//       if (response.ok) {
//         console.log('Registration successful!');
//         console.log('Token:', data.token);
//         // Handle successful registration, e.g., redirect to another page or show a success message
//       } else {
//         console.error('Registration failed:', data.message);
//         // Handle registration error, e.g., display an error message to the user
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       // Handle network error or other errors during registration
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleInputChange}
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleInputChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleInputChange}
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;











// import React from "react";
// import { useForm } from "react-hook-form"; // Import react-hook-form
// // import "./Register.css";

// const Register = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize react-hook-form

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch('http://localhost:3000/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//            'Authorization': `Bearer${token}`,
//         },
//         body: JSON.stringify(data)
//       });

//       const responseData = await response.json();

//       if (response.ok) {
//         const { message, token } = responseData;
//         console.log(message); // Handle successful registration message
//         console.log(token); // Handle token, e.g., store it in localStorage
//       } else {
//         console.error(responseData.message); // Handle registration error message
//       }
//     } catch (error) {
//       console.error('An error occurred during registration.', error); // Handle network error
//     }
//   };

//   return (
//     <div className="register-form">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             {...register("name", { required: true })}
//           />
//           {errors.name && <span className="error-message">Name is required</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             {...register("email", { required: true })}
//           />
//           {errors.email && <span className="error-message">Email is required</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             {...register("password", { required: true })}
//           />
//           {errors.password && <span className="error-message">Password is required</span>}
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;





// import React from "react";
// // import NavBar from "./navBar";

// import { useState } from "react";
// // import { useNavigate } from "react-router-dom";


// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const { name, email, password } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // 'Authorization': Bearer,
          
//         },
//         body: JSON.stringify({ name, email, password })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const { message, token } = data;
//         console.log(message); // Handle successful registration message
//         console.log(token); // Handle token, e.g., store it in localStorage
//       } else {
//         setErrorMessage(data.message);
//         console.error(errorMessage); // Handle registration error message
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred during registration.');
//       console.error(errorMessage); // Handle network error
//     }
//   };

//   return (
//     <div className="register-form">
//       <h2>Register</h2>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
  
//     const handleRegister = async (e) => {
//       e.preventDefault();
  
//       try {
//         const response = await fetch('"http://localhost:3000/register', {
//           method: 'POST',
//           headers: {
//             'Authorization': Bearer,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name: name,
//             email: email,
//             password: password,
//           }),
//         });
  
//         if (response.ok) {
//           // Handle successful registration, e.g., redirect to login page or show a success message
//           console.log('User registered successfully');
//         } else {
//           const errorData = await response.json();
//           setErrorMessage(errorData.message || 'Registration failed. Please try again later.');
//         }
//       } catch (error) {
//         // Handle network error or other exceptions
//         setErrorMessage('Registration failed. Please try again later.');
//       }
//     };
  
//     return (
//         <>
//         <NavBar />
        
//       <div className="register-form">
//         <h2>Register</h2>
//         <form onSubmit={handleRegister}>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Register</button>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//         </form>
//       </div>
//       </>
//     );
//   };
  
  
  
//   export default Register;