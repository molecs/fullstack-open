const Persons = ({filter, persons, handleRemove}) => {
    const filteredPersons = persons.filter((person) => 
    person.name.toUpperCase().includes(filter.toUpperCase()))

    return (
        <div>
        {filteredPersons.map(person =>
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleRemove(person.id, person.name)}>
              delete
            </button>
          </p>
        )}
      </div> 
    )
}

export default Persons