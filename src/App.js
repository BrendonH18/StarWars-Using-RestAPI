import './App.css';
import React, { useEffect, useState } from 'react';
import DisplayHeader from './components/Header';
import DisplayForm from './components/Form';
import DisplayTable from './components/Table';
import DisplayFooter from './components/Footer';

function App() {
  const [Search, setSearch] = useState('')
  const [Number, setNumber] = useState('')
  const [Name, setName] = useState('')
  const [Birthday, setBirthday] = useState('')
  const [Height, setHeight] = useState('')
  const [Mass, setMass] = useState('')
  const [HomeWorld, setHomeWorld] = useState('')
  const [Species, setSpecies] = useState('')
  const [CharacterArray, setCharacterArray] = useState([]
  )

  useEffect(() => {
    function handleChange(change)
    const a = []
    // return () => {}
  },[])

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




  return (
    <div>
      <DisplayHeader />
      <DisplayForm />
      <DisplayTable />
      <DisplayFooter />
    </div>
  );
}

export default App;
