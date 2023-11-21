import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

async function fetchSingleProduct(id) {
  console.log(id);
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function handleDelete(id, navigate) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    navigate("/products"); // Navigate after successful deletion
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default function SingleProduct() {
  const [product, setProduct] = useState([]);

  const {id} = useParams();
  console.log(id);

  const navigate = useNavigate();

  const handleProductDelete = async (id) => {
    try {
      await handleDelete(id, navigate); // Pass navigate function to handleDelete
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

 useEffect(() => {
  async function getSingleProduct() {
    const response = await fetchSingleProduct(id);
    console.log("response", response);
    setProduct(response);
  }
  getSingleProduct()
 }, [])


 console.log("towards the end", product);

 function addToCart(productId) {
  let arr = [];

  // Retrieve existing cart items from localStorage
  if (localStorage.getItem("shoppingCart")) {
    arr = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  // Push new product ID to the cart array
  arr.push(productId);

  // Store the updated cart array back in localStorage
  localStorage.setItem("shoppingCart", JSON.stringify(arr));

  navigate("/products/shoppingcart");
}


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${product.image_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: "center"
            }}
          >
            <Typography component="h1" variant="h1">
              {product.name}
            </Typography>
            <Typography component="h1" variant="h4">
              Category: {product.category}<br />
              Price: ${product.price}
            </Typography>
            <Typography component="h2" variant="p">
              {product.description}
            </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => addToCart(product.id)} 
                sx={{ mt: 3, mb: 2 }}
              >
               Add to cart
              </Button>
              <Grid container>
                <Grid item xs>
                <a href={`/users/${product.userid}`}>
                <Typography component="h2" variant="p">
                    Who's selling this?
                  </Typography></a>
                </Grid>
                <Grid item>
                  <a href="/products">
                <Typography component="h2" variant="p">
                    Back to products
                  </Typography></a>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
        
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}