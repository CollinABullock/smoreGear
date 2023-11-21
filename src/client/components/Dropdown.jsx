import React, { useState } from "react";
import Select from "react-dropdown-select";




function Dropdown() {
    const [value, setValue] = useState()
    

    const options = [
        {label: "Hiking", value: 1},
        {label: "Camping", value: 2},
        {label: "Water", value: 3},
        {label: "Miscellaneous", value: 4}
    ]

    return (
       <div>
        <div>
            <h4>Select Category!</h4>
            <Select
            name="select"
            options={options}
            onChange={value => setValue(value)}
            >

            </Select>
        </div>
       </div>
    )
}

export default Dropdown;