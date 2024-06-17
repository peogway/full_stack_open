
const Persons = ({ persons, deletePerson }) => {
    return (
      <div>
        {persons.map((person)=>  (
          <div key = {person.id}>
            {person.name} {person.number}
            <button onClick = {() => deletePerson(person)}>delete</button>
          </div>)
        )}
      </div>
    )
  }
  

export default Persons