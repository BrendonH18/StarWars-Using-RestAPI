import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import DisplayHeader from './components/Header';
import DisplayForm from './components/Form';
import DisplayTable from './components/Table';
import DisplayFooter from './components/Footer';

function App() {
  
  const [Number, setNumber] = useState('')
  const [Name, setName] = useState('')
  const [Birthday, setBirthday] = useState('')
  const [Height, setHeight] = useState('')
  const [Mass, setMass] = useState('')
  const [HomeWorld, setHomeWorld] = useState('')
  const [Species, setSpecies] = useState('')
  const [CharacterArray, setCharacterArray] = useState([])


function handleSearch(e) {
  const [SearchValue, setSearch] = useState('')
  const handle = (e) => {
    const SearchUpdate = e.target
    console.log(SearchUpdate)
    setSearch(SearchUpdate)

    return <input 
    type="text" 
    placeholder="Search..." 
    name="search" 
    id="search" 
    className="form-control"
    onChange={handle}
    value={SearchValue}
    required
    />
  }
}

function LogButtonClicks() {  
  const [count, setCount] = useState(0)
  const handle = () => {
    const updatedCount = count + 1
    console.log(`Clicked ${updatedCount} times.`)
    setCount(updatedCount)
  }
  console.log('I rendered!')
  return <button onClick={handle}>Click Me</button>
}


  // useEffect(() => {
  //  handleChange() 
  // })
  //   function handleChange(change)
  //   return () => {}
  // },[])

  // componentDidMount() {
  //   this.setState({
  //     expenseArray: JSON.parse(localStorage.getItem('expenses')) || []
  //   })
  // }
  
  // componentDidUpdate(prevProps, prevState) {
  //   if(this.state.expenseArray !== prevState.expenseArray.lengeth) {
  //     localStorage.setItem('expenses', JSON.stringify(this.state.expenseArray))
  //   }
  // }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log('name: ', name, 'value: ', value);
  //   this.setState({
  //     [name]: value
  //   })
  // }


  return (
    <div>
      <DisplayHeader />
      {LogButtonClicks()}
      <DisplayForm 
        handleSearch={handleSearch}
      />

      <DisplayTable />
      <DisplayFooter />
      
    </div>
  );
}

export default App;
