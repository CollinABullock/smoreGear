import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import NavBar from "./navBar";


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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavBar />

      <main>
      <Typography variant="h1" component="h1" sx={{paddingTop: "20px", textAlign: 'center', fontSize: "3rem"}}>
                      {/* {Category} */}
                    </Typography>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
       
            <div className="searchBar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:"center"}}>
  <label>
    Search <br />
    <input
      type="text"
      placeholder="search"
      onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
    />
  </label>
</div>


          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {!error && displayedUsers.map((users) => (
              <Grid item key={users} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {users.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={`/users/${users.id}`}>More Details</Button>
                   
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
         S'More Gear
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Buy and sell everything you need for the great outdoors!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}