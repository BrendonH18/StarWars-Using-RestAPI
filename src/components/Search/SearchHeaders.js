import React from "react";

const DisplaySearchHeaders = ({ keys }) => {
  return keys.map(key => {
    return(
      <th key={key}>{key}</th>
      )
    })
} 

export default DisplaySearchHeaders