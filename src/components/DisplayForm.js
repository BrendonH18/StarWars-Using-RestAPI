import React from "react";

const DisplayForm = ({ handleSearch, setSearch, changeCharacters_Table, characterId, showSearchResults, setShowSearchResults }) => {

  return(
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        setShowSearchResults(true)
      }}
    >
    <br/>
    <div className = "container">
    <div className = "row">
    <div className="">
        <div className = "col-8 mx-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            name="search" 
            id="search" 
            className="form-control"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            required
            />
        </div>

        <br/>

        <div className="row justify-content-center">
        <button 
          type="submit"
          className="btn btn-primary col-3"
          >
          Submit
        </button>

        <button 
          type="button"
          className="btn btn-secondary col-3"
          onClick={(e) => setShowSearchResults(false)}
          >
          Clear Results
        </button>
        </div>
        <br/>
      </div>
      </div>
      </div>
      </form>
  )
}

export default DisplayForm