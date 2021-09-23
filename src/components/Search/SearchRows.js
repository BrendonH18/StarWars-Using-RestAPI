import axios from "axios";
import React, { useState } from "react";

const DisplaySearchRows = ({ searchResponse, keys }) => {
  const [searchRenderData, setSearchRenderData] = useState([])
  const displayObjectFull = []

  // Dig into one piece at at time (Element by Element)
  for (let i = 0; i < searchResponse.length; i++) {
    // look at one piece
    const displayObjectPiece = searchResponse[i];

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
      let isHTTP
      isArray = Array.isArray(valueOfObjectPiece)
      if(isArray) isArrayLengthZero = valueOfObjectPiece.length === 0
      if (typeof valueOfObjectPiece === 'string') isHTTP = valueOfObjectPiece.includes("https")

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

      // handle multiple http requests - (OK)
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
    // resolve promises
    Promise.allSettled(promises).catch(err => console.log(err))

    // push object to displayFull
    displayObjectFull.push(displayObjectPiecePreparation)
    }

  // A data check for consistency
  // console.log("Final: ", displayObjectFull)
  
  // update state updating state here causes an infinite loop. Why?
  // setSearchRenderData(displayObjectFull)

  // My Observation:
  // The rendered search table is missing information from the promises even though the resultant list of object (labeled "displayObjectFull") contains this information. All the data is stored as a 'string,' so that probably isn't the reason for the error. My next thought was "maybe the promises aren't resolving before the Return block below," but that doesn't make 
  
  // react-dom.development.js:14997 Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
  //The above error occurred in the <DisplaySearchRows> component:

//   at DisplaySearchRows (http://localhost:3000/main.25728ce5f5fd6f21886c.hot-update.js:29:3)
//   at tbody
//   at table
//   at DisplaySearch (http://localhost:3000/static/js/main.chunk.js:1119:3)
//   at div
//   at App (http://localhost:3000/static/js/main.chunk.js:180:85)

// Consider adding an error boundary to your tree to customize error handling behavior.
// Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
  
  
  

  // displayObjectFull is complete and ready to be passed to the component below

  async  function newPromise(HTTPRequest, object, key, nameArray = null) {
    if (nameArray === null) return await new Promise((resolve, reject) => {
      axios.get(HTTPRequest).then(response => object[key] = response.data.name).catch(err => console.log(err))
    })
    if (nameArray !== null)  {
      let resolveResponse = ''
      await axios.get(HTTPRequest).then((response) => {

        // Switch to handle error
        // I could create a new KEYS variable
        response.data['name'] === undefined ? resolveResponse = response.data['title'] : resolveResponse = response.data['name']
      })
      return Promise.resolve((resolveResponse))
    }

}

// Idea: Map over Keys to make Headers instead of using a separate component
// Idea: Change header case

// Display Results - (OK)
  let dataCounter = 0
  //Check Input Data - (OK)
  console.log("Base Data: ", displayObjectFull)

  return displayObjectFull.map(data => {
    //Check Character Data - (OK)
    console.log("Data: ", data)

    dataCounter += 1
    let keyCounter = 0
    const dataKeys = Object.keys(data)

    // Check Keys Data
    // Missing: "homeworld" and "url"
    console.log("Keys: ", dataKeys)

    const dataCells = dataKeys.map(key => {
      // Idea: cut long strings
      // Idea: add link to display module with full data
      keyCounter += 1
      
      // Check Cell Data
      // Obviously missing "homeworld" and "url" (see line 133)
      // Missing string data for "films", "species", "vehicles", "starships"
      console.log(`Cell ${dataCounter} - ${key}:`, data[key])
      return (
        <td key={`${dataCounter}.${keyCounter}.1`}>
          {data[key]}
        </td>
      )
    })
    return (
      <tr key={`${dataCounter}.${keyCounter}.2`}>
        {dataCells}
      </tr>
    )
  })
}

export default DisplaySearchRows