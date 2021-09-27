import React from "react";

const DisplayForm = ({ handleSearch, setSearch, getCharacters, lowerCharacterNumber }) => {

  return(
    <form 
      onSubmit={handleSearch}
    >
    <div className="justify-content-md-center">
        <div>
          <input 
            type="text" 
            placeholder="Search..." 
            name="search" 
            id="search" 
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            required
            />
        </div>
        <button 
          type="submit"
          >
          Submit
        </button>

        <button 
          type="button"
          onClick={() => getCharacters(lowerCharacterNumber + 1, lowerCharacterNumber + 10)}
          >
          Clear Results
        </button>
      </div>
      </form>
  )
}

export default DisplayForm