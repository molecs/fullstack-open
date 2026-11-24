const Persons = ({filter, persons}) => {
    const filteredPersons = persons.filter((person) => 
    person.name.toUpperCase().includes(filter.toUpperCase()))

    return (
        <div>
        {filteredPersons.map(person =>
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        )}
      </div> 
    )
}

export default Persons