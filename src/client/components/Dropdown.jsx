import React, { useState } from "react";
import Select from "react-dropdown-select";

export default function Dropdown({ onSelectCategory }) {
    const [category, setCategory] = useState();

    

    const options = [
        { label: "Hiking", value: "hiking" },
        { label: "Camping", value: "camping" },
        { label: "Water", value: "water" },
        { label: "Winter", value: "winter" },
        { label: "Miscellaneous", value: "miscellaneous" }
    ];

  // Inside Dropdown component, when an option is selected:
const handleSelectCategory = (selected) => {
    onSelectCategory(selected); // Pass the selected value to the parent component
  };
  

      console.log(category);

    return (
        <div>

            <h4>Select Category!</h4>
            <Select
            name="select"
            options={options}
            onChange={handleSelectCategory}
            >

            </Select>
            
        </div>
    );
}
