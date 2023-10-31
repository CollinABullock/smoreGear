import { Routes, Route, Link, useNavigate, BrowserRouter } from "react-router-dom";
import AllUsers from './components/allUsers';
import Login from './components/Login';
import AllProducts from "./components/AllProducts";

export default function App() {
  return (
    <>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/users" element={<AllUsers />} />
  <Route path="/products" element={<AllProducts />} />
</Routes>
</BrowserRouter>
</>
  );
}
