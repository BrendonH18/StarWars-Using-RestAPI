import './App.css';
import React, { useEffect, useState } from 'react';
import DisplayHeader from './components/DisplayHeader';
import DisplayForm from './components/DisplayForm';
import DisplayTable from './components/DisplayTable';
import DisplayPageButtons from './components/DisplayPageButtons';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [characterId, setCharacterId] = useState(0)
  const [characters, setCharacters] = useState([])

useEffect(() => {
  
  if(showSearchResults) {
    handleSearch()
  } else {
    changeCharacters_Table(characterId + 1, characterId + 10)
  }
  
  async function changeCharacters_Table(startNumber, endNumber) {
    let characterNumber = startNumber
    let promises = []
    for (let i = 0; i < endNumber - startNumber + 1; i++) {
      promises.push(fetchData(`https://swapi.dev/api/people/${characterNumber}`))
      characterNumber += 1
    }
    Promise.allSettled(promises).then(results => {
      setCharacters([])
      results.forEach(async result => {
        const data = await editCharacterData(result)  
        setCharacters(prevState => [...prevState, data])
        }
      )
    })
  }

  async function handleSearch(e) {
    console.log(e)
    const results = await fetchData(`https://swapi.dev/api/people/?search=${search}`, "results")
    setCharacters([])
    results.forEach(async result => {
      const data = await editCharacterData(result, true)
      setCharacters(prevState => [...prevState, data])
    })
  }

  const editCharacterData = async (result, isSearch = false) => {
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
      character.homeworld = await fetchData(data.homeworld,"name")
      if(Array.isArray(data.species) && data.species.length > 0) {
        character.species = await fetchData(data.species,"name")
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

}, [characterId, showSearchResults])


const fetchData = async (URL, item1 = null) => {
  let response = await axios.get(URL);
  let returnData = response['data']
  if (item1 !== null) returnData = response['data'][item1]
  return returnData
}

  return (
    <div id="App">
      <DisplayHeader />
      <DisplayForm 
        setSearch ={setSearch}
        setShowSearchResults={setShowSearchResults}
        />
      <DisplayTable 
        characters={characters}
        />
      <DisplayPageButtons 
        characterId={characterId}
        setCharacterId={setCharacterId}  
        />
    </div>
  );
}

export default App;
