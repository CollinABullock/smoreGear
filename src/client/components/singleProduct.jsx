import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./navBar";

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


export default function SingleProduct() {
  const [product, setProduct] = useState([]);

  const {id} = useParams();
  console.log(id);

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  }

 useEffect(() => {
  async function getSingleProduct() {
    const response = await fetchSingleProduct(id);
    console.log("response", response);
    setProduct(response);
  }
  getSingleProduct()
 }, [])

 console.log("towards the end", product);

  return (
    <>
    <NavBar />
    <h1>{product.name}</h1>
    <h3>${product.price}</h3>
    <p>{product.description}</p>
    <a href="http://localhost:3000/products" class="button">Back to products!</a>
      
    </>
  )
}