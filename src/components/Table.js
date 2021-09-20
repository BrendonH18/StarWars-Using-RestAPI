import React from "react";
// import { Row } from "react-bootstrap";
import Rows from "./Rows";

const DisplayTable = ({ characterObject }) => {

  return(
    // <table striped boardered hover varient="dark">
    <table >
        <thead>
          <tr>
            <th >#</th>
            <th >Name</th>
            <th >Birthday</th>
            <th >Height</th>
            <th >Mass</th>
            <th >Home World</th>
            <th >Species</th>
          </tr>
        </thead>
        <tbody>
        <Rows 
          characterObject={characterObject}
        />
        </tbody>
      </table>
  )
}

export default DisplayTable