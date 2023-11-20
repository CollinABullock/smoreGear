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

async function handleDelete() {
  try {
    const response = await fetch (`http://localhost:3000/api/products/${id}`, {
      method: "DELETE"
    });
    const result = await response.json();
    return result;
} catch (error) {
  console.error(error);
}
}


export default function SingleProduct() {
  const [product, setProduct] = useState([]);

  const {id} = useParams();
  console.log(id);

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/products");
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

 function addToCart(productId) {
  var arr = [];
  if (localStorage.getItem("shoppingCart") !== null) {

    arr= JSON.parse(localStorage.getItem("shoppingCart"));
    }
    console.log(arr);
  arr.push(productId);
localStorage.setItem("shoppingCart", JSON.stringify(arr));
 };

  return (
    <>
    <NavBar />
    <h1>{product.name}</h1>
    <h3>${product.price}</h3>
    <p>Sold by {product.user_id}</p>
    <p>{product.description}</p>
    <button onClick={goBack}>Back to products</button><br />
    <button className="addToCart" onClick={() => addToCart(id)} >Add to shopping Cart </button>
    <button onClick={handleDelete}>Delete Product</button>
      
    </>
  )
}