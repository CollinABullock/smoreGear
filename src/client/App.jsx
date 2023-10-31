import { Routes, Route, Link, useNavigate, BrowserRouter } from "react-router-dom";
import AllUsers from './components/allUsers';
import AllProducts from "./components/getAllProducts";
import Login from './components/Login';
import Register from "./components/Register";

export default function App() {
  return (
    <>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/users" element={<AllUsers />} />
  <Route path="/products" element={<AllProducts />} />
  <Route path="/register" element={<Register />} />

</Routes>
</BrowserRouter>
</>
  );
}
