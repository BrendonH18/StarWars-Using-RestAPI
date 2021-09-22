import React, { useState } from "react";
import DisplaySearchHeaders from "./Headers";
import DisplaySearchRows from "./Rows";

const DisplaySearch = ({ search, searchResults }) => {
  const [show, setShow] = useState(false);
  let keys = 0
  let isNoData
  let isArray = Array.isArray(searchResults)
  if(isArray) isNoData = searchResults.length === 0
  if (!isNoData) {keys = searchResults === 0 ? 0 : Object.keys(searchResults[0])} 
  if (keys === 0 || isNoData) {
    if(show === true) setShow(false)
  } else {
    if(show === false) setShow(true)}


  if(show) {
    return (
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
} else if (isNoData) {
  return(
    <div>
    No Data Returned from Search -_- Sorry!
    </div>
  )
} else {
  return(
    <>
    </>
  )
}
}

export default DisplaySearch