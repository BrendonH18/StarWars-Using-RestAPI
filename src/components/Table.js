import React from "react";
// import { Row } from "react-bootstrap";
import Rows from "./Rows";

const DisplayTable = () => {

  return(
    <table striped boardered hover varient="dark">
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
        <Rows />
      </table>
  )
}

export default DisplayTable