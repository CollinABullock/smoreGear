import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function CreatePost(props) {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const navigate = useNavigate();

   
    const handleSubmit = async(e) => {
        e.preventDefault()
   
        try {
            const result = await createPost(); 


            navigate('/')
        } catch (error) {
            console.log(error)
        }

    }






    async function createPost() {
        try {
            if(props.isLoggedIn) {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:3000/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        post: {
                           name: name,
                           description: description,
                           price: price
                        }
                    })
                });  
                const result = await response.json()
                console.log(result, props.items)
                const itemsCopy = [...props.items]
                itemsCopy.push(result.data.post)
                props.setItems(itemsCopy)

                setName("")
                setDescription("")
                setPrice("")

                console.log(result)
                return result;
            }
        } catch (error) {
            console.log(error)
        }
    }


    return(
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
    )
}




export default CreatePost;