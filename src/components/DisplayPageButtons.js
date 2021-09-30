import React from "react";

const DisplayPageButtons = ({ retrieveStartNumber_Character , setRetrieveStartNumber_Character}) => {

  return(
    <div>
      {retrieveStartNumber_Character === 0
        ? <></>
        : <button 
            type="" 
            onClick={() => setRetrieveStartNumber_Character(retrieveStartNumber_Character - 10)}
            value='previous10'>
              <i class="bi bi-chevron-double-left"></i>{"Prev 10"}<i class="bi bi-chevron-double-left"></i>
          </button>
      }
      <button 
        type=""
        onClick={() => setRetrieveStartNumber_Character(retrieveStartNumber_Character + 10)}
        value='next10'>
          <i class="bi bi-chevron-double-right"></i>{"Next 10"}<i class="bi bi-chevron-double-right"></i>
      </button>
    </div>
  )
}

export default DisplayPageButtons