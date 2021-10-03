import React from "react";

const DisplayPageButtons = ({ characterId , setCharacterId}) => {

  return(
    <div
      className='row'
      >
      {characterId === 0
        ? <></>
        : <button 
            type=""
            className="btn btn-warning col-3 mx-auto" 
            onClick={() => setCharacterId(characterId - 10)}
            value='previous10'>
              <i className="bi bi-chevron-double-left"></i>{"Prev 10"}<i className="bi bi-chevron-double-left"></i>
          </button>
      }
      {characterId === 80
        ? <></>
        : <button
            className="btn btn-danger col-3 mx-auto" 
            type=""
            onClick={() => setCharacterId(characterId + 10)}
            value='next10'>
              <i className="bi bi-chevron-double-right"></i>{"Next 10"}<i className="bi bi-chevron-double-right"></i>
          </button>}
    </div>
  )
}

export default DisplayPageButtons