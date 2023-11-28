import React, { useState } from "react";
import Select from "react-dropdown-select";

export default function Dropdown({ onSelectCategory }) {
    const [category, setCategory] = useState();

    const options = [
        { label: "Hiking", value: "Hiking" },
        { label: "Camping", value: "Camping" },
        { label: "Water", value: "Water" },
        { label: "Miscellaneous", value: "Miscellaneous" }
    ];

    const handleCategoryChange = (category) => {
        setCategory(category);
        onSelectCategory(category);
    };

    return (
        <div>

            <h4>Select Category!</h4>
            <Select
            name="select"
            options={options}
            onChange={value => setValue(value)}
            >

            </Select>
            
        </div>
    );
}
