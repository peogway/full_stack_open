const PersonForm = ({addPerson, newName, newNumber, inputNameChange, inputNumberChange}) => {
    return (
        <form onSubmit = {addPerson}>
        <div>
          name: <input 
                  value = {newName}
                  onChange = {inputNameChange}
                />
        </div>
        <div>
          number: <input 
                    value = {newNumber}
                    onChange = {inputNumberChange}
                  />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
    )
}

export default PersonForm