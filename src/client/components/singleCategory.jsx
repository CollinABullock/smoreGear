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
import { useNavigate, useParams } from 'react-router-dom';
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



async function FetchCategory(category) {
  console.log(category);
  try {
      const response = await fetch (`http://localhost:3000/api/products/category/${category}`);
      const result = await response.json();
      console.log(result);
      return result
  } catch (error) {
      console.log(error);
  }
}

export default function AllProductsByCategory() {
  const [products, setProducts] = useState([]);
  console.log("at first", products);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");

  const {category} = useParams();
  console.log(category);

useEffect (() => {
  async function productsByCategory() {
      const response = await FetchCategory(category);
      console.log("second response", response);
      setProducts(response);
  }
  productsByCategory();
}, []);

const displayedProducts = searchParams ? products.filter((products) =>
products.name.toLowerCase().includes(searchParams)
) : products;

console.log("displayed products", displayedProducts);
console.log("all products", products);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavBar />

      <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography variant="h1" component="h1" sx={{paddingTop: "20px", textAlign: 'center', fontSize: "3rem"}}>
                      All products in the {category} category
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
       
          <Grid container spacing={4}>
            {!error && displayedProducts.map((products) => (
              <Grid item key={products} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={products.image_path ? products.image_path : 'https://ik.imagekit.io/smoregear/woman%20hiking.jpg?updatedAt=1700852561792'}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {products.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={`/products/${products.id}`}>More Details</Button>
                   
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