import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, BrowserRouter } from "react-router-dom";
import AllUsers from "./components/allUsers";
import Login from './components/Login';
import Register from "./components/Register";
import AllProducts from "./components/allProducts";
import SingleProduct from "./components/singleProduct";
import SingleUser from "./components/singleUser";
import CreatePost from "./components/create-post";
import Profile from "./components/Profile";
import ShoppingCart from "./components/shoppingcart";
import Dropdown from "./components/Dropdown";
import AllProductsByCategory from "./components/singleCategory";






export default function App() {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

    // This functions keeps the user logged so they can move from page to page without being logged out.
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);

  return (
    <>
    
    <BrowserRouter>
<Routes>

  <Route path="/" element={<Login loggedInUser={loggedInUser}
  isLoggedIn = {isLoggedIn}
              items={items}
              setItems={setItems} />} />
  <Route path="/users/profile" element={<Profile loggedInUser={loggedInUser}
              items={items}
              setItems={setItems}/>} />
  <Route path="/users" element={<AllUsers loggedInUser={loggedInUser}
              items={items}
              setItems={setItems}/>} />
  <Route path="/products" element={<AllProducts loggedInUser={loggedInUser}
              items={items}
              setItems={setItems}/>} />
  <Route path="/products/create-post" element={<CreatePost loggedInUser={loggedInUser}
              items={items}
              setItems={setItems}/>} />
  <Route path="/users/register" element={<Register loggedInUser={loggedInUser}
              items={items}
              setItems={setItems}/>} />
  <Route path="/products/:id" element={<SingleProduct loggedInUser={loggedInUser}
              items={items}
              setItems={setItems}/>} />
  <Route path="/users/:id" element={<SingleUser loggedInUser={loggedInUser}
              items={items}
              setItems={setItems}/>} />
  <Route path="/products/shoppingcart" element={<ShoppingCart loggedInUser={loggedInUser}
              items={items}
              setItems={setItems}/>} />
  <Route path ="/products/dropdown" element={<Dropdown loggedInUser={loggedInUser} 
              items={items} 
              setItems={setItems} />} />
<Route path ="/products/category/:category" element={<AllProductsByCategory loggedInUser={loggedInUser} 
              items={items} 
              setItems={setItems} />} />
<Route path ="/products/checkout" element={<ShoppingCart loggedInUser={loggedInUser} 
              items={items} 
              setItems={setItems} />} />



</Routes>
</BrowserRouter>
</>
  );
}
