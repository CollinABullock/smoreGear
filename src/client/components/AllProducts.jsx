import React, { useEffect, useState } from "react";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);


useEffect(() => {
    async function fetchAllProducts() {
        try{
            const response = await fetch("http://localhost:3000/api/products");
            const result = await response.json();
            setProducts(result);

        }
        catch(error){
            setError(error);
        }
    }
    fetchAllProducts();
}, []);

return (
    <div>
        {error ? (
            <p>Error: {error.message}</p>
        ) : (
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        )}
    </div>
);
                }