import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./navBar";
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import { CssBaseline } from "@mui/material";




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



function Profile() {
  const currentUserName = localStorage.getItem("userName");
  const currentUserEmail = localStorage.getItem("userEmail");

  const [userName, setUserName] = useState(currentUserName);
  const [userEmail, setUserEmail] = useState(currentUserEmail);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    console.log("Saving Changes");
    try {
      const response = await fetch("http://localhost:3000/users/profile", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({
          userName: userName,
          userEmail: userEmail,
        }),
      });

      if (response.ok) {
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", userEmail);
        setEditMode(false);
        console.log("Profile data edited successfully");
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error during PATCH request:', error);
    }
  };


        



  return (
    <div>
   
   <NavBar />
  <CssBaseline/>
    <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          
           <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="subtitle1" align="right" style={{fontSize:'1.2rem', marginTop:'12px', fontFamily:'impact'}}>
                  Username:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {editMode ? (
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{
                    fontSize: "1rem",
                    paddingTop: "0px",
                    paddingRight: "5px",
                    border: "3px solid #ced4da",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginTop: "10px",
                    paddingLeft: "45px",
                  }}
                />
              ) : (
                <Typography variant="subtitle1" align="center" style={{ fontSize: "1rem", paddingTop: "10px", fontFamily: "impact",}}>
                  {userName}
                </Typography>
              )}
            </Grid>
          </Grid>

              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="subtitle1" align="right" style={{fontSize:'1.2rem', marginTop:'24px', fontFamily:'impact'}}>
                  Email:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {editMode ? (
                <Input
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  sx={{
                    fontSize: "1rem",
                    paddingTop: "0px",
                    paddingRight: "25px",
                    border: "3px solid #ced4da",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginTop: "20px",
                    paddingLeft: "25px",
                  }}
                />
              ) : (
                <Typography variant="subtitle1" align="center" style={{ fontSize: "1rem", paddingTop: "20px", fontFamily: "impact"}}>
                  {userEmail}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            onClick={editMode ? handleSaveClick : handleEditClick}
            sx={{ marginTop: "20px" }}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </Box>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </div>
  );
}

export default Profile;