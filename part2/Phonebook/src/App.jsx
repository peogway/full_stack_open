import { useState, useEffect } from 'react'
import personServices from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState()
  const [errorMessage, setErrorMessage] = useState()

  useEffect(()=> {
    personServices
      .getAll()
      .then( persons =>{
        setPersons(persons)
      })
  },[])

  
  const personsToShow = persons.filter((person)=>person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
1
  

  const inputFilterChange = (event) => {
      setNewFilter(event.target.value);
  }
  const inputNameChange = (event) => {
      setNewName(event.target.value);
  }
  const inputNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const foundPerson =persons.find((person) => person.name === newName)

    if (foundPerson){
      if (confirm(`${newName} is already added to phone book, replace the old number with a new one?`)){
        const updatedPerson = {...foundPerson, number :newNumber}
        personServices
        .update(updatedPerson.id, updatedPerson)
        .then( returnedPerson=> {
          setPersons(persons.map(person => person.id !== updatedPerson.id ?person : returnedPerson));
          setNotification(
            `Update number of ${updatedPerson.name} to ${updatedPerson.number}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error =>{
          setPersons(persons.filter(person=> person.id!==updatedPerson.id))
          setErrorMessage(
            `Information of ${updatedPerson.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

        
        
      }
      return
    }
          
    const newPerson = {
      name : newName,
      number : newNumber, 
    }

    personServices
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNewName('');
        setNewNumber('');
      })

      setNotification(
        `Added ${newPerson.name}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }


  const deletePerson = (person) =>{
    if (confirm(`Delete ${person.name}?`)){
      personServices
        .deletePerson(person)
        .then(deletedPerson =>{
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
        .catch(error =>{
          setPersons(persons.filter(leftPerson=> leftPerson.id!==person.id))
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }
  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message ={notification} className ='notification'/>
      <Notification message ={errorMessage} className = 'error'/>
      
      <Filter newFilter = {newFilter} inputFilterChange = {inputFilterChange}/>


      <h3>add a new</h3>

      <PersonForm 
        addPerson={addPerson} 
        newName = {newName} inputNameChange= {inputNameChange} 
        newNumber = {newNumber} inputNumberChange = {inputNumberChange}/>
      

      <h3>Numbers</h3>

      <Persons persons = {personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App