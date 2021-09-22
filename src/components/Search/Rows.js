import axios from "axios";
import React, { useState } from "react";

const DisplaySearchRows = ({ searchResults, keys }) => {
  const [nameArrayState, setNameArrayState] = useState([])
  
  // define output object
  const displayObjectFull = []

  // Dig into one piece at at time (Element by Element)
  for (let i = 0; i < searchResults.length; i++) {
    // look at one piece
    const displayObjectPiece = searchResults[i];
    
    //Define Finished Product
    let displayObjectPiecePreparation = {}

    // promises array
    let promises = []    

    // look at each key/value pair, decide how to handle it, and handle it (build promises)
    for (let j = 0; j < keys.length; j++) {
      const valueOfObjectPiece = displayObjectPiece[keys[j]]
      
      // logic to help with path-finding
      let isArray
      let isArrayLengthZero
      let isArrayFirstElementHTTP
      let isHTTP
      
      isArray = Array.isArray(valueOfObjectPiece)
      if(isArray) isArrayLengthZero = valueOfObjectPiece.length === 0
      if(!isArrayLengthZero) isArrayFirstElementHTTP = valueOfObjectPiece[0].includes("https")
      isHTTP = valueOfObjectPiece.includes("https")

      // handle empty arrays - (OK)
      if (isArrayLengthZero) {
        displayObjectPiecePreparation[keys[j]] = ""
      }

      // handle strings - (OK)
      if (!isArray && !isHTTP) {
        displayObjectPiecePreparation[keys[j]] = valueOfObjectPiece
      }

      // handle single http request - (OK)
      if (isHTTP) {
        promises.push(
          newPromise(valueOfObjectPiece, displayObjectPiecePreparation, keys[j])
        )
      }

      // handle multiple http requests
      if (isArray && !isArrayLengthZero) {
        let multipleNamesArray = []
        valueOfObjectPiece.forEach(HTTPRequest => { 
          promises.push(
            newPromise(HTTPRequest, displayObjectPiecePreparation, keys[j], true).then(results => {
              multipleNamesArray = [...multipleNamesArray, results]
              displayObjectPiecePreparation[keys[j]] = multipleNamesArray.join(", ")
          })
          )        
        });
        // put back into object
        displayObjectPiecePreparation[keys[j]] = multipleNamesArray
      }
    }
    // check promises
    // console.log("promises: ", promises)

    // resolve promises
    Promise.allSettled(promises).catch(err => console.log(err))

    // check object again
    // console.log(`Done ${i+1} - `, displayObjectPiecePreparation)

    // push object to displayFull
    displayObjectFull.push(displayObjectPiecePreparation)

    // if last time through loop, display final vs original
    if (i === searchResults.length -1) console.log("final: ",displayObjectFull, searchResults)
  }

  // displayObjectFull is complete and ready to be passed to the component below

  async  function newPromise(HTTPRequest, object, key, nameArray = null) {
    if (nameArray === null) return await new Promise((resolve, reject) => {
      axios.get(HTTPRequest).then(response => object[key] = response.data.name).catch(err => console.log(err))
    })
    if (nameArray !== null)  {
      let resolveResponse = ''
      await axios.get(HTTPRequest).then((response) => {
        
        // Switch to handle error
        response.data['name'] === undefined ? resolveResponse = response.data['title'] : resolveResponse = response.data['name']
      })
      return Promise.resolve((resolveResponse))
    }
  
}

  function formatArray(nameArray, newElement, originalArray, count) {
    return ["--Multiple--", count, newElement, originalArray, nameArray]
  }
  return(
    <>

    </>
  )
}

export default DisplaySearchRows