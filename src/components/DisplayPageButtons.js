import React from "react";

const DisplayPageButtons = ({ lowerCharacterNumber , setLowerCharacterNumber}) => {

  return(
    <div>
      {lowerCharacterNumber === 0
        ? <></>
        : <button 
            type="" 
            onClick={() => setLowerCharacterNumber(lowerCharacterNumber - 10)}
            value='previous10'>
              {"Prev 10 <-----"}
          </button>
      }
      <button 
        type=""
        onClick={() => setLowerCharacterNumber(lowerCharacterNumber + 10)}
        value='next10'>
          {"-----> Next 10"}
      </button>
    </div>
  )
}

export default DisplayPageButtons