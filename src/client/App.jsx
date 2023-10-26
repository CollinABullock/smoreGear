import { Routes, Route, Link, useNavigate, BrowserRouter } from "react-router-dom";
import AllUsers from './components/allUsers';
import Login from './components/Login';

export default function App() {
  return (
    <>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/users" element={<AllUsers />} />

</Routes>
</BrowserRouter>
</>
  );
}
