import './App.css';
import React, { useEffect, useState } from 'react';
import DisplayHeader from './components/Header';
import DisplayForm from './components/Form';
import DisplayTable from './components/Table';
import DisplayFooter from './components/Footer';
import axios from 'axios';

function App() {
  const [Search, setSearch] = useState('')
  const [LowerCharacterNumber, setLowerCharacterNumber] = useState(0)
  const [characterObject, setCharacterObject] = useState(null)

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

useEffect(() => {
  getTableData()
}, [LowerCharacterNumber])


async function getTableData() {
  setCharacterObject(null)
  let counter = LowerCharacterNumber
  let newTable = []
  do {
    counter = counter + 1
    let detail = await getCharacterData1(counter)
    .then(getCharacterData2)
    .catch(err => console.log(err))
    if (detail !== undefined) newTable = ([...newTable, detail])
  } while (newTable.length < 10 && counter < LowerCharacterNumber + 20);
  setCharacterObject(newTable)
}

async function getCharacterData1(number) {
  let copyCharacterObject = {}
  await axios.get(formatGetRequest('people',number)).then(results => {
    results.data.species.length === 0 
      ? copyCharacterObject.species = {value: false} 
      : copyCharacterObject.species = {value: true, address: results.data.species}
    
    results.data.homeworld.length === 0 
      ? copyCharacterObject.home = {value: false} 
      : copyCharacterObject.home = {value: true, address: results.data.homeworld}
    
    copyCharacterObject.key = number
    copyCharacterObject.fullname = results.data.name
    copyCharacterObject.birthday = results.data.birth_year
    copyCharacterObject.height = results.data.height
    copyCharacterObject.mass = results.data.mass
  })
  return Promise.resolve(copyCharacterObject)
}

async function getCharacterData2(newCharacterObject) {
  let copyCharacterObject = {...newCharacterObject}
  if (copyCharacterObject.species.value) {
    let species = await getCharacterData3(copyCharacterObject)
    copyCharacterObject.species = species
  } else {
    copyCharacterObject.species = ""
  }
  if (copyCharacterObject.home.value) {
    await axios.get(copyCharacterObject.home.address).then(home => copyCharacterObject.home = home.data.name)
  }
  return Promise.resolve(copyCharacterObject)
}

async function getCharacterData3 (newCharacterObject) {
  let copyCharacterObject = {...newCharacterObject}
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
        Search={Search}
      />
      <DisplayTable 
      characterObject={characterObject === null ? blankCharacterObject : characterObject}
      />
      <DisplayFooter 
        getPage={getPage}
        isPreviousActive={isPreviousActive(LowerCharacterNumber)}  
      />
    </div>
  );
}

export default App;
