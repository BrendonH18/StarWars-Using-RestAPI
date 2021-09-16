import React from "react";

const DisplayForm = ( handleSearch ) => {

  return(
    <div className="justify-content-md-center">
        <div>
          {handleSearch}
          {/* <input 
            type="text" 
            placeholder="Search..." 
            name="search" 
            id="search" 
            className="form-control"
            // onChange={handleChange}
            // value={state.expenseDate}
            required
            /> */}
        </div>
      </div>
  )
}

export default DisplayForm