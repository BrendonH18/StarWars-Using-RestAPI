import './App.css';
import React, { useEffect, useState } from 'react';
import DisplayHeader from './components/Header';
import DisplayForm from './components/Form';
import DisplayTable from './components/Table';
import DisplayFooter from './components/Footer';
import DisplaySearch from './components/Search/DisplaySearch';

import axios from 'axios';

function App() {
  const [search, setSearch] = useState({attribute: '', searchTerm: ''})
  const [LowerCharacterNumber, setLowerCharacterNumber] = useState(0)
  const [characterObjectDisplay, setCharacterObjectDisplay] = useState(null)
  const [searchResults, setSearchResults] = useState(0) 

  const blankCharacterObject = [{
    key: "",
    birthday: '',
    fullname: '',
    height: '',
    home: '',
    mass : '',
    species : ''
  }
]

async function handleSearch(e) {
  e.preventDefault()
  console.log("search: ", search)
  await axios.get(`https://swapi.dev/api/${search.attribute}/?search=${search.searchTerm}`)
  .then(result => setSearchResults(result.data.results))
  .catch(err => console.log(err))
}



function getPage(e) {
  e.target.value === "next10"
    ? setLowerCharacterNumber(LowerCharacterNumber + 10)
    : setLowerCharacterNumber(LowerCharacterNumber - 10)
  // getTableData()
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

useEffect(() => {
  getTableData('people')
}, [LowerCharacterNumber])


async function getTableData(attribute) {
  setCharacterObjectDisplay(null)
  let counter = LowerCharacterNumber
  let newTable = []
  while (newTable.length < 10 && counter < LowerCharacterNumber + 20) {counter = counter + 1
    let detail = await getCharacterData1(attribute , counter)
    .then(getCharacterData2)
    .catch(err => console.log(err))
    if (detail !== undefined) newTable = ([...newTable, detail])
    console.log("previous: ", counter)
  }
  setCharacterObjectDisplay(newTable)
}

async function getCharacterData1(category, number) {
  let copyCharacterObject = {}
  await axios.get(formatGetRequest(category, number)).then(results => {
    results.data.species.length === 0 
      ? copyCharacterObject.species = {isPresent: false} 
      : copyCharacterObject.species = {isPresent: true, address: results.data.species}
    
    results.data.homeworld.length === 0 
      ? copyCharacterObject.home = {isPresent: false} 
      : copyCharacterObject.home = {isPresent: true, address: results.data.homeworld}
    
    copyCharacterObject.key = number
    copyCharacterObject.fullname = results.data.name
    copyCharacterObject.birthday = results.data.birth_year
    copyCharacterObject.height = results.data.height
    copyCharacterObject.mass = results.data.mass
  })
  return Promise.resolve(copyCharacterObject)
}

async function getCharacterData2(copyCharacterObject) {
  // let copyCharacterObject = {...newCharacterObject}
  if (copyCharacterObject.species.isPresent) {
    let species = await getCharacterData3(copyCharacterObject)
    copyCharacterObject.species = species
  } else {
    copyCharacterObject.species = "---"
  }
  if (copyCharacterObject.home.isPresent) {
    await axios.get(copyCharacterObject.home.address).then(home => copyCharacterObject.home = home.data.name)
  }
  return Promise.resolve(copyCharacterObject)
}

async function getCharacterData3 (copyCharacterObject) {
  // let copyCharacterObject = {...newCharacterObject}
  let speciesList = []
  await copyCharacterObject.species.address.forEach(element => {
     axios.get(element).then(results => speciesList.push(results.data.name))
  });

  // How do I "join" the elements of [speciesList] with ", "?
  // I tried speciesList.join(", ") and it returned "undefined"
  // I also tried speciesList[0] and it returned ""

  return speciesList
}

  return (
    <div>
      <DisplayHeader />
      <DisplayForm 
        handleSearch={handleSearch}
        search={search}
        setSearch ={setSearch}
        setSearchResults={setSearchResults}
        />
      <DisplayTable 
      characterObject={characterObjectDisplay === null ? blankCharacterObject : characterObjectDisplay}
        />
      <DisplayFooter 
        getPage={getPage}
        isPreviousActive={isPreviousActive(LowerCharacterNumber)}  
        />
      <DisplaySearch 
        search={search}
        searchResults={searchResults}
        />
    </div>
  );
}

export default App;
