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
          name: <input onChange={props.nameInput} value={props.values[0]}/>
        </div>
        <div>
          number: <input onChange={props.numberInput} value={props.values[1]}/>
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

const Message = ({msgObj}) => {
  if (msgObj === null) {
    return <></>
  }

  const msgStyle = {
    color: msgObj.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={msgStyle}>{msgObj.content}</div>
}

export {Filter, PersonForm, Persons, Message}