import React from "react";

const DisplayForm = ({ handleSearch, search, setSearch, setSearchResponse }) => {

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
            onChange={(e) => setSearch({...search, searchTerm: e.target.value})}
            required
            />
        </div>

        

    <div className="form-group row">
      <label className="col-sm-3 col-form-label">Category: </label>
      <div className="col-md-6">
        <select 
          className="form-control" 
          name="searchAttribute" 
          id="searchAttribute" 
          // placeholder="Food"
          onChange={(e) => setSearch({...search, attribute: e.target.value})}
          required
          // value={search.attribute}>
          >
            <option value="default">Select a category</option>
            <option value="films">Films</option>
            <option value="people">People</option>
            <option value="planets">Planets</option>
            <option value="species">Species</option>
            <option value="starships">Starships</option>
            <option value="vehicles">Vehicles</option>
        </select>
      </div>
  </div>


        <button 
          type="submit"
          >
          Submit
        </button>

        <button 
          type="button"
          onClick={() => {setSearchResponse(0)}}
          >
          Clear Results
        </button>
      </div>
      </form>
  )
}

export default DisplayForm