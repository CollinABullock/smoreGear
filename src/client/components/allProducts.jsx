import React, { useEffect, useState } from "react";
import NavBar from "./navBar";
import CreatePost from "./create-post";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    console.log("at first", products);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState("");

async function FetchAllProducts() {
    try {
        const response = await fetch ("http://localhost:3000/api/products");
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
}

useEffect (() => {
    async function getAllProducts() {
        const response = await FetchAllProducts();
        console.log("second response", response);
        setProducts(response.products);
    }
    getAllProducts();
}, []);

const displayedProducts = searchParams ? products.filter((products) =>
products.name.toLowerCase().includes(searchParams)
) : products;

console.log("displayed products", displayedProducts);
console.log("all products", products);

return (
<>
<NavBar />
<div className="searchBar">
  <label>
    Search{" "}
    <input type="text"
    placeholder="search"
    onChange={(e) => setSearchParams (e.target.value.toLowerCase())}
    />
  </label>
</div>

<div>
  <CreatePost />
</div>

{console.log("towards the end", products)}
{!error && displayedProducts.map((products) => {
  return (
    <>
   <div className="allProducts">
    <a href={`/products/${products.id}`}>
    <img src={products.image_path} alt={products.name} /> {/* Add this line */}
        <h2>{products.name}</h2>
</a>
</div>
  </>
  )
})}
</>
);
}  





     



                        