import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";


function CreatePost() {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const navigate = useNavigate();

   
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const result = await createPost(name, description, price);
        navigate('/products/submission');
    } catch (error) {
        console.log(error);
    }
}







    async function createPost(name, description, price) {
      try {
          const response = await fetch("http://localhost:3000/products/post", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  name: name,
                  description: description,
                  price: price
              })
          });
          
          if (response.status === 200) {
              // The POST request was successful (status code 200 Created)
              const result = await response.json();
              return result;
          } else {
              // Handle errors or other status codes here
              throw new Error("Failed to create a post");
          }
      } catch (error) {
          console.error("Error creating a post:", error);
          throw error;
      }
  }
  


    return(
      <><NavBar />
        <div id="createpost">
            <form onSubmit={handleSubmit} id="createform">
                <h1 id="newpost">Sell Your Gear!</h1>
                <label className="createlabels">What are your selling?
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setName(e.target.value);
                        }}
                    />
                </label>

                <label className="createlabels">Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setDescription(e.target.value);
                        }}
                    />
                </label>
                
                <label className="createlabels">Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setPrice(e.target.value);
                        }}
                    />
                </label>
                
          







                <button id="create-button"type="submit">Submit</button>

            </form>
        </div>
        </>
    )
}




export default CreatePost;