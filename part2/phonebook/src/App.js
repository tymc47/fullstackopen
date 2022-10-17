import { useState } from 'react'
import { Filter, PersonForm, Persons} from './components'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filterMode, setFilterMode] = useState(false)

  const isExisting = (string) => {
    return persons.reduce((result, person) => {
      if (person.name === string) return true
      return result
    }, false)
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
    if (isExisting(newName)) {
      return alert(`${newName} is already added to phonebook`)
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
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
      <Persons personsToShow={namesToShow}/>
      
    </div>
  )
}

export default App;
