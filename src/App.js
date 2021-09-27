import './App.css';
import React, { useEffect, useState } from 'react';
import DisplayHeader from './components/DisplayHeader';
import DisplayForm from './components/DisplayForm';
import DisplayTable from './components/DisplayTable';
import DisplayPageButtons from './components/DisplayPageButtons';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [lowerCharacterNumber, setLowerCharacterNumber] = useState(0)
  const [characters, setCharacters] = useState([])

// I think this is my issue
useEffect(() => {
  getCharacters(lowerCharacterNumber + 1, lowerCharacterNumber + 10)
},[lowerCharacterNumber])

async function getCharacters(startNumber, endNumber) {
  let lookupNumber = startNumber
  let promises = []
  let characters = []
  for (let i = 0; i < endNumber - startNumber + 1; i++) {
    promises.push(getData(`https://swapi.dev/api/people/${lookupNumber}`))
    lookupNumber += 1
  }
  await Promise.allSettled(promises).then(results => results.forEach(async result => {
    const data = await organizeData(result)  
    characters.push(data)
    }
  ))
  // Why is the log data different than the State data?
  console.log("Characters: ", characters)
  setCharacters(characters)
}

async function handleSearch(e) {
  e.preventDefault()
  let characters = []
  const results = await getData(`https://swapi.dev/api/people/?search=${search}`, "results")
  results.forEach(async result => {
    const data = await organizeData(result, true)
    characters.push(data)
  })

  // Why is the log data different than the State data?
  console.log("Search: ", characters)
  setCharacters(characters)
}

const getData = async (URL, item1 = null) => {
  let response = await axios.get(URL);
  let returnData = response['data']
  if (item1 !== null) returnData = response['data'][item1]
  return returnData
}

const organizeData = async (result, isSearch = false) => {
  if(result.status === "fulfilled" || isSearch === true) {
    let data
    isSearch 
      ? data = result 
      : data = result.value
    const character = {}
    const url = data.url.split("/")
    character.raw = data
    character.key = Number(url[url.length - 2])
    character.name = data.name
    character.birth_year = data.birth_year
    character.height = data.height
    character.mass = data.mass
    character.homeworld = await getData(data.homeworld,"name")
    if(Array.isArray(data.species) && data.species.length > 0) {
      character.species = await getData(data.species,"name")
    } else {
      character.species = "Human"
    }
  return character
  } else {
    const character = {}
    character.raw = result
    return character
  }
}

  return (
    <div>
      <DisplayHeader />
      <DisplayForm 
        handleSearch={handleSearch}
        search={search}
        setSearch ={setSearch}
        getCharacters={getCharacters}
        lowerCharacterNumber={lowerCharacterNumber}
        />
      <DisplayTable 
      characters={characters}
        />
      <DisplayPageButtons 
        lowerCharacterNumber={lowerCharacterNumber}
        setLowerCharacterNumber={setLowerCharacterNumber}  
        />
    </div>
  );
}

export default App;
