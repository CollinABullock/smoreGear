import { Routes, Route, Link, useNavigate, BrowserRouter } from "react-router-dom";
import AllUsers from "./components/allUsers";
import Login from './components/Login';
import AllProducts from "./components/allProducts";
import NavBar from "./components/navBar";

function Home() {
  return (
    <div className="homeDiv">
    <h1>S'More Gear!</h1>
      <h4>Buy and sell everything you need for the great outdoors</h4>
      <NavBar />
      <Login />
      <img src="https://s7.bluegreenvacations.com/is/image/BGV/collection-great-outdoors-lg?$bg2-hero-lg$" className="homeIMG" alt="The Great Outdoors" />
      <p>(c) 2023, Collin A. Bullock, TRavis Bergen, Andy Nunez, and Fletcher Burton</p>
      </div>
  )
}

export default function App() {
  return (
    <>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/users" element={<AllUsers />} />
  <Route path="/products" element={<AllProducts />} />
</Routes>
</BrowserRouter>
</>
  );
}
