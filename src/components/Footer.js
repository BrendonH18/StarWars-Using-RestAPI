import React from "react";

const DisplayFooter = ({ getPage, isPreviousActive }) => {

  return(
    <div>
      {(isPreviousActive === false)
        ? <div></div>
        : <button 
            type="" 
            onClick={getPage}
            value='previous10'>
              {"Prev 10 <-----"}
          </button>
      }
      <button 
        type=""
        onClick={getPage}
        value='next10'>
          {"-----> Next 10"}
      </button>
    </div>
  )
}

export default DisplayFooter