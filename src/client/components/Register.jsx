import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        S'More Gear (T Bergin, J Browning, F Burton, C Bullock, A Nunez)
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const defaultTheme = createTheme();

  export default function register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
  
    const handleSubmit = async (e) => {
     e.preventDefault();
  
     try {
         const result = await registerUser(name, email, password);
         localStorage.setItem("token", result.token);
         localStorage.setItem("userName", result.user.name);
         localStorage.setItem("userID", result.user.id)
         localStorage.setItem("userEmail", result.user.email)
         window.alert("Welcome to S'More Gear!");
         navigate('/products');
     } catch (error) {
         console.log(error);
     }
  }
  
     async function registerUser(name, email, password) {
       try {
           const response = await fetch("http://localhost:3000/api/users/register", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({
                   name: name,
                   email: email,
                   password: password
               })
           });
           
           if (response.status === 200) {
               // The POST request was successful (status code 200 Created)
               const result = await response.json();
               return result;
           } 
           else {
               // Handle errors or other status codes here
               throw new Error("Failed to create a post");
           }
       } catch (error) {
           console.error("Error creating a post:", error);
           throw error;
       }
   }
  
   
   const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };  
    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      value={name}
                      onChange={handleNameChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  onChange={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="http://localhost:3000/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      );
    };
  

