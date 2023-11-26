import React, { useState, useEffect } from 'react';
import NavBar from './navBar';

function ShoppingCart() {
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

  const removeFromCart = (productId) => {
    const updatedCart = arr.filter(id => id !== productId);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
    setProducts(products.filter(item => item.id !== productId));
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
    <>
      <NavBar />
      <br />
      <div>
        {products.map(item => (
          <div key={item.name}>
            <h1>{item.name}</h1>
            <h2>{item.price}</h2>
            {item.description}
            <h3>
              <button className='remove-button' onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </h3>
          </div>
        ))}
        {/* Display total price */}
        <h3>Total Price: {totalPrice.toFixed(2)}</h3>
      </div>
    </>
  );
}

export default ShoppingCart;