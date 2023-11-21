import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./navBar";
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CssBaseline } from "@mui/material";





function Profile() {
        const userName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("userEmail");
    


        



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
                  <Input
                    readOnly
                    disableUnderline
                    value={userName}
                    sx={{
                      fontSize: '1rem',
                      paddingTop: '0px',
                      paddingRight:'5px',
                      border: '3px solid #ced4da',
                      borderRadius: '8px',
                      textAlign: 'center',
                      marginTop: '10px',
                      paddingLeft:'45px'

                    }}
                  />
                </Grid>
              </Grid>
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="subtitle1" align="right" style={{fontSize:'1.2rem', marginTop:'24px', fontFamily:'impact'}}>
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Input
                    readOnly
                    disableUnderline
                    value={userEmail}
                    sx={{
                      fontSize: '1rem',
                      paddingTop: '0px',
                      paddingRight:'25px',
                      border: '3px solid #ced4da',
                      borderRadius: '8px',
                      textAlign: 'center',
                      marginTop: '20px',
                      paddingLeft:'25px'

                    }}
                  />
                </Grid>
              </Grid>
            
            
        </Box>
      </Container>

    </div>
  );
  }

export default Profile;