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
    
    // not sure yet
    const valueOfObjectPieceMultipleNamesArray = ['Hello World', ]

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
        // displayObjectPiecePreparation[keys[j]] = ""
      }

      // handle strings - (OK)
      if (!isArray && !isHTTP) {
        // displayObjectPiecePreparation[keys[j]] = valueOfObjectPiece
      }

      // handle single http request - (OK)
      if (isHTTP) {
        // promises.push(
        //   newPromise(valueOfObjectPiece, displayObjectPiecePreparation, keys[j])
        // )
      }

      // handle multiple http requests
      if (isArray && !isArrayLengthZero) {
        
        let count = 1

        let newList = []

        valueOfObjectPiece.forEach(HTTPRequest => { 
          let piece
          promises.push(
            
            // newPromise(HTTPRequest, displayObjectPiecePreparation, keys[j], valueOfObjectPieceMultipleNamesArray, valueOfObjectPiece, count)

            newPromise(HTTPRequest, displayObjectPiecePreparation, keys[j], ['piece'], valueOfObjectPiece, count)

          )
          // console.log("External :")

          // update end list
          // newList = [...newList, piece] 
          count = count + 1
        });

        
      
      
      
        // put back into object
        // displayObjectPiecePreparation[keys[j]] = ["--Multiple--", valueOfObjectPieceMultipleNamesArray, valueOfObjectPiece]
      }
      // check object so far
      // console.log(`Internal ${i+1}.${j+1} - `, displayObjectPiecePreparation)
      
      // check promises
      // console.log("promises: ", promises)
    }
    // check promises
    console.log("promises: ", promises)

    // resolve promises
    Promise.allSettled(promises).catch(err => console.log(err))

    // check object again
    console.log(`Done ${i+1} - `, displayObjectPiecePreparation)

    // push object to displayFull
    displayObjectFull.push(displayObjectPiecePreparation)

    // if last time through loop, display final vs original
    if (i === searchResults.length -1) console.log("final: ",displayObjectFull, searchResults)
  }

  // displayObjectFull is complete and ready to be passed to the component below

  async  function newPromise(HTTPRequest, object, key, nameArray = null, originalArray, count) {
    if (nameArray === null) return await new Promise((resolve, reject) => {
      axios.get(HTTPRequest).then(response => object[key] = response.data.name).catch(err => console.log(err))
    })
    if (nameArray !== null) return await new Promise((resolve, reject) => {
      axios.get(HTTPRequest).then(response => {
        
        // My goal is to pull out the name data
        setNameArrayState(response.data.name)

        console.log("Internal: ", response.data.name);
        
        // object[key] = 
        
        // formatArray(object[key], response.data.name, originalArray, count)
      
      }).catch(err => console.log(err))
  })
}

  function formatArray(nameArray, newElement, originalArray, count) {
    return ["--Multiple--", count, newElement, originalArray, nameArray]
  }


      // for (let k = 0; k < keys.length; k++) {
      //   const element = searchResults[i][keys[k]];
      //   let isArrayLengthZero, isArrayFirstElementHTTP
      //   let isArray = Array.isArray(element)
      //   if(isArray) isArrayLengthZero = element.length === 0
      //   if(!isArrayLengthZero) isArrayFirstElementHTTP = element[0].includes("https")
      //   let isHTTP = element.includes("https")
      //   if (isHTTP) {

      //     // add one promise to list
      //     // be sure to update in last .then "attributeResponse[keys[k]] = element"
      //     // console.log("element: ", element)
      //     promises.push(
      //        newPromise(element, displayObjectPiecePreparation, keys[k])
      //      )
      //   }
      //   if (isArray && !isArrayLengthZero) {

      //     // add multiple promises to list
      //     // be sure to update in last .then "attributeResponse[keys[k]] = element"
      //     // element.forEach(HTTPRequest => {
      //     //   promises.push(
      //     //     newPromise(HTTPRequest, attributeResponse, keys[k], nameArray).then()
      //     //   )
      //     // });

      //     // console.log("name Array: ", nameArray)
      //   }
      //   if (!isArray && !isHTTP) {
      //     displayObjectPiecePreparation[keys[k]] = element
      //   }
      //   if (isArrayLengthZero) {
      //     displayObjectPiecePreparation[keys[k]] = ""
      //   }
        

      // }
      // Create Promise.all chain
      // Use .then until the chain is finished
      


  return(
    <>

    </>
  )
}

export default DisplaySearchRows