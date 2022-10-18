const Filter = (props) => {
    return (
        <div>
            filter shown with: <input onChange={props.inputChange} value={props.value}/>
        </div>
    )
}


const PersonForm = (props) => {
    return (
        <form onSubmit={props.submitForm}>
        <div>
          name: <input onChange={props.nameInput}/>
        </div>
        <div>
          number: <input onChange={props.numberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Persons = (props) => {
    return props.personsToShow.map(person => 
      <div key={person.id}>
        {person.name} {person.number} 
        <button onClick={()=> props.deleteBtn(person.id)}>delete</button>
      </div>
      )
}

export {Filter, PersonForm, Persons}