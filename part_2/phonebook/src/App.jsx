import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import allPersons from './services/persons'
import Notification from './components/Notification'

import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect');
    allPersons.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      console.log(initialPersons);
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    if(newName === '') {
      return
    }
    const currentPerson = persons.find((person) => person.name === newName)
    if(currentPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          console.log(currentPerson);
          const changedNumber = {...currentPerson, number: newNumber}
          allPersons.update(currentPerson.id, changedNumber)
          .then(updatedPerson => {
            console.log(updatedPerson);
            setPersons(persons.map((person) => (person.id !== currentPerson.id ? person : updatedPerson)))
            setNewNumber('')
            setNewName('')
            setMessage({
            type: "success",
            text: `Updated number for ${updatedPerson.name}`
            })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            console.log(currentPerson);
            setMessage({
              type: "error",
              text: `Information of ${currentPerson.name}has already been removed from server`
              })
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            setPersons(persons.filter(person => person.id !== currentPerson.id))
          })
      }
      return
    }
    const personsObject = {
      name: newName,
      number: newNumber
    }
    allPersons.add(personsObject)
    .then(addedPerson =>{
      console.log(addedPerson);
      setPersons(persons.concat(addedPerson))
      setNewNumber('')
      setNewName('')
      setMessage({
        type: "success",
        text: `Added ${addedPerson.name}`
        })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
  }
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      allPersons.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage({
        type: "success",
        text: `Removed ${name}`
        })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      handleNewName={handleNewName}
      newNumber={newNumber}
      handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filter={newFilter} persons={persons} handleRemove={handleRemove}/>
    </div>
  )

}

export default App