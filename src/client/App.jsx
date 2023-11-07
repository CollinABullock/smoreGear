import { Routes, Route, Link, useNavigate, BrowserRouter } from "react-router-dom";
import AllUsers from "./components/allUsers";
// import Login from './components/Login';
import Register from "./components/Register";
import AllProducts from "./components/allProducts";
import SingleProduct from "./components/singleProduct";
import SingleUser from "./components/singleUser";
import CreatePost from "./components/create-post";
import Submission from "./components/submission";
import Profile from "./components/profile";
import Login from "./components/SignIn";

export default function App() {
  return (
    <>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/login" element={<Login />} />
  <Route path="/users" element={<AllUsers />} />
  <Route path="/products" element={<AllProducts />} />
  <Route path="/products/create-post" element={<CreatePost />} />
  <Route path="/register" element={<Register />} />
  <Route path="/products/:id" element={<SingleProduct />} />
  <Route path="/users/:id" element={<SingleUser />} />
  <Route path="/products/submission" element={<Submission />} />

</Routes>
</BrowserRouter>
</>
  );
}
