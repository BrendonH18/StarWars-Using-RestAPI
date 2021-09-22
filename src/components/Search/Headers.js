import React from "react";

const DisplaySearchHeaders = ({ keys }) => {
  return keys.map(column => {
    return(
      <th key={column}>{column}</th>
      )
    })
} 

export default DisplaySearchHeaders