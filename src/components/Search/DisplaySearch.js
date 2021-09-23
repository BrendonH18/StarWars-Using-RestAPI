import React, { useState } from "react";
import DisplaySearchHeaders from "./SearchHeaders";
import DisplaySearchRows from "./SearchRows";

const DisplaySearch = ({ search, searchResponse }) => {
  const [show, setShow] = useState(false);
  let keys = 0
  let isNoData
  let isArray = Array.isArray(searchResponse)
  if(isArray) isNoData = searchResponse.length === 0
  if (!isNoData) {keys = searchResponse === 0 ? 0 : Object.keys(searchResponse[0])} 
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
          searchResponse={searchResponse}
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