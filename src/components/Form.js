import React from "react";

const DisplayForm = ({ handleSearch, Search }) => {

  return(
    <div className="justify-content-md-center">
        <div>
          <input 
            type="text" 
            placeholder="Search..." 
            name="search" 
            id="search" 
            className="form-control"
            onChange={handleSearch}
            value={Search}
            required
            />
        </div>
      </div>
  )
}

export default DisplayForm