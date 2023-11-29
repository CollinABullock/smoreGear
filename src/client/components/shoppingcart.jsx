import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
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



export default function ShoppingCart() {
  var [products, setProducts] = useState([]);
  var arr = []; 
  if (localStorage.getItem("shoppingCart") != null) {
    arr = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  const clearShoppingCart = () => {
    localStorage.removeItem("shoppingCart");
    setProducts([]); // Clear products from the state as well
  };


  async function fetchSingleProduct(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const result = await response.json();
      const quantity = result.quantity || 1;
      console.log(result);
      return {...result, quantity };
    } catch (error) {
      console.log(error);
    }
  }

 const removeFromCart = (productId) => {
    const updatedCart = arr.filter(id => id !== productId);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
    setProducts(products.filter(item => item.id !== productId)); // Update the products state by filtering out the item to remove
  };

  const incrementQuantity = (productId) => { 
    const updatedCart = arr.map((item) => 
    item.id === productId ? {...item, quantity: item.quantity + 1 } : item);
   localStorage.setItem ("shoppingCart", JSON.stringify(updatedCart))
   setProducts (
    products.map((item) => item.id === productId ? {...item, quantity: item.quantity + 1} : item)
   );
  };

  const decrementQuantity = (productId) => { 
    const updatedCart = arr.map((item) => 
    item.id === productId ? {...item, quantity: item.quantity - 1 } : item);
   localStorage.setItem ("shoppingCart", JSON.stringify(updatedCart))
   setProducts (
    products.map((item) => item.id === productId ? {...item, quantity: item.quantity - 1} : item)
   );
  };

  useEffect(() => {
    async function getAllProducts() {
      const allPromises = arr.map(id => fetchSingleProduct(id));
      var results = await Promise.all(allPromises);
      results = [...new Map(results.map(item => [item.name, item])).values()]
      setProducts(results);
    }
    getAllProducts();
  }, []);

  // Calculate total price
  const totalPrice = products.reduce((acc, item) => acc + parseFloat(item.price), 0);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavBar />

      <main>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Stack spacing={4}>
            {products.map((item) => (
              <Card key={item.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image={item.image_path}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name} <br />
                    ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                
                </CardContent>
                <CardActions>
                <Button size="small" onClick={() => decrementQuantity(item.id)}>
                    -
                  </Button>
                  <Button size="small" onClick={() => incrementQuantity(item.id)}>
                    +
                  </Button>
                  <Button size="small" onClick={() => removeFromCart(item.id)}>
                    Remove from cart
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
          <Typography variant="h1" component="h1" sx={{ paddingTop: '20px', textAlign: 'center', fontSize: '3rem' }}>
            Cart Total: ${totalPrice} <br />
            <a href="/products/checkout">
          <button variant="contained">Proceed to checkout </button>
          </a> <br />
          <Button variant="contained" onClick={clearShoppingCart}>
          Clear Cart
        </Button>
        </Typography>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        {/* Footer content remains unchanged */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}