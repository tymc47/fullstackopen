import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons} from './components'
import numberService from './services'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filterMode, setFilterMode] = useState(false)

  useEffect(() => {
    numberService.getAll()
    .then(data => setPersons(data))
  }, [])

  const findExisting = (string) => {
    return persons.reduce((result, person) => {
      if (person.name === string) return person.id
      return result
    }, -1)
  }
  
  const filterName = (event) => {
    const input = event.target.value;
    setFilter(input);
    
    if (filter === '') setFilterMode(false);
    
    setFilterMode(true);
  }
  
  let namesToShow = filterMode ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons;
  
  const addPerson = (event) => {
    event.preventDefault()
    const existingID = findExisting(newName);
    const newPerson = {name: newName, number: newNumber};

    if (existingID !== -1) {
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)
      if (confirmation) {
        numberService.updateNum(existingID, newPerson)
        .then(data => {
          setPersons(persons.map(person => person.id !== existingID ? person : data))
      })
      } 
      return;
    }

    numberService.create(newPerson)
    .then(data => {
      setPersons(persons.concat(data))
      setNewNumber('')
      setNewName('')
    })
  }

  const deleteNumber = (id) => {
    console.log("to be deleted:", id)
    if (window.confirm(`Delete ${persons[id-1].name} ?`)) {
      numberService.deleteNum(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }
      )
    }
  }

  const changeName = (event) => setNewName(event.target.value)
  const changeNumber = (event) => setNewNumber(event.target.value)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputChange={filterName} value={filter} />
      <h2>add a new</h2>
      <PersonForm submitForm={addPerson} nameInput = {changeName} numberInput = {changeNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={namesToShow} deleteBtn={deleteNumber}/>
      
    </div>
  )
}

export default App;
