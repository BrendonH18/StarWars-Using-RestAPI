import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DisplayRows from "../Rows";
import DisplaySearchHeaders from "./Headers";
import DisplaySearchRows from "./Rows";

const DisplaySearch = ({ search, searchResults }) => {
  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // console.log("Resultes: ", searchResults)
  let keys = searchResults === 0 ? 0 : Object.keys(searchResults[0])
  // console.log("keys: ", keys)
  if (keys === 0) {
    if(show === true) setShow(false)
  } else {
    if(show === false) setShow(true)}

  if(show
    // keys !== 0
    ) {return (
    <>
        <div>{`Search: "${search.searchTerm}" in ${search.attribute}`}</div>
        <br/>
        <table className="table" variant="dark">
        <thead>
          <tr>
          <DisplaySearchHeaders
            keys={keys}
           />
          </tr>
        </thead>
        <tbody>
        <DisplaySearchRows
          searchResults={searchResults}
          keys={keys}
          />
        </tbody>
      </table>

    </>
  );
} else {
  return(
    <>
    </>
  )
}



}

export default DisplaySearch