import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";


const addresses = sessionStorage.getItem("shippingAddress");
console.log(addresses);

const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const savedAddress = JSON.parse(sessionStorage.getItem("shippingAddress"));
  console.log(addresses);

  var [products, setProducts] = useState([]);
  var arr = []; 
  if (localStorage.getItem("shoppingCart") != null) {
    arr = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  async function fetchSingleProduct(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  const clearShoppingCart = () => {
    localStorage.removeItem("shoppingCart");
    setProducts([]); // Clear products from the state as well
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
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">${product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{savedAddress.name}</Typography>
          <Typography gutterBottom>{savedAddress.address1}</Typography>
          <Typography gutterBottom>{savedAddress.address2}</Typography>
          <Typography gutterBottom>{savedAddress.city}, {savedAddress.state}</Typography>
          <Typography gutterBottom>{savedAddress.zip}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}