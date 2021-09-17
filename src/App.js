import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import DisplayHeader from './components/Header';
import DisplayForm from './components/Form';
import DisplayTable from './components/Table';
import DisplayFooter from './components/Footer';
import axios from 'axios';

function App() {
  const [Search, setSearch] = useState('')
  const [LowerCharacterNumber, setLowerCharacterNumber] = useState(0)
  const [imageURL, setImageURL] = useState('')

  const [Number, setNumber] = useState('')
  const [Name, setName] = useState('')
  const [Birthday, setBirthday] = useState('')
  const [Height, setHeight] = useState('')
  const [Mass, setMass] = useState('')
  const [HomeWorld, setHomeWorld] = useState('')
  const [Species, setSpecies] = useState('')
  const [CharacterArray, setCharacterArray] = useState([1,2,3])


function handleSearch(e) {
  setSearch(e.target.value)
}

function getPage(e) {
  e.target.value === "next10"
    ? setLowerCharacterNumber(LowerCharacterNumber + 10)
    : setLowerCharacterNumber(LowerCharacterNumber - 10)
}

function isPreviousActive(number) {
  return (
    (number === 0)
      ? false
      : true)
}

function formatGetRequest(attribute, number) {
  return `https://swapi.dev/api/${attribute}/${number}`
}

function batchTableGetRequests(number, attribute) {
  let elementArray = []  
  for (let index = number; index < number + 10; index++) {
    elementArray = [...elementArray, formatGetRequest(attribute, index)]
    }
  return elementArray
}

console.log(batchTableGetRequests(0,"people"))


// https://stackoverflow.com/questions/56532652/axios-get-then-in-a -for-loop
async function getElements(location, attribute, id) {
  await Promise.all(
    batchTableGetRequests(0, "people").map(request => axios.get(request))
   )
  .then(rawResponse => {
    console.log(rawResponse)
    let valuesArray = []
    let number = 0
    rawResponse.forEach(element => {
      number += 1
      console.log(element)
      let characterDetail = {
        id: number, 
        name: element.data.name,
        birthyear: element.data.birth_year,
        height: element.data.height,
        mass: element.data.mass,
        homeworld: element.data.homeworld,
        species: element.data.species
      }
      valuesArray = [...valuesArray, characterDetail]
    })
    return setCharacterArray(valuesArray)
  })
  .catch(error => {
    console.log(error)
  })
}


useEffect(() => {
  getElements('table','people', 1)
})


  return (
    <div>

      {/* <img alt="" src={imageURL}/> */}

      <DisplayHeader />
      {/* {LogButtonClicks()} */}
      <DisplayForm 
        handleSearch={handleSearch}
        Search={Search}
      />

      <DisplayTable CharacterArray={CharacterArray}/>
      <DisplayFooter 
        getPage={getPage}
        isPreviousActive={isPreviousActive(LowerCharacterNumber)}  
      />
      
    </div>
  );
}

export default App;
