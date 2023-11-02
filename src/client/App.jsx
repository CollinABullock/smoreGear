import { Routes, Route, Link, useNavigate, BrowserRouter } from "react-router-dom";
import AllUsers from "./components/allUsers";
import Login from './components/Login';
import Register from "./components/Register";
import AllProducts from "./components/allProducts";
import SingleProduct from "./components/singleProduct";
import SingleUser from "./components/singleUser";
import CreatePost from "./components/create-post";
import NavBar from "./components/navBar";
import "./style.css";


function Home() {
  return (
    <div className="homeDiv">
    <h1>S'More Gear!</h1>
      <h4>Buy and sell everything you need for the great outdoors</h4>
      <NavBar />
      <img src="src/client/assets/images/smoregearlogo.jpg" className="homeIMG" alt="The Great Outdoors" />
      <p>(c) 2023, Collin A. Bullock, Travis Bergen, Andy Nunez, and Fletcher Burton</p>
      </div>
  )
}


export default function App() {
  return (
    <>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/users" element={<AllUsers />} />
  <Route path="/products" element={<AllProducts />} />
  <Route path="/create-post" element={<CreatePost />} />
  <Route path="/register" element={<Register />} />
  <Route path="/products/:id" element={<SingleProduct />} />
  <Route path="/users/:id" element={<SingleUser />} />

</Routes>
</BrowserRouter>
</>
  );
}
