const Filter = ({newFilter, inputFilterChange}) => {
    return (
        <div>
            filter shown with <input
                                value = {newFilter}
                                onChange = {inputFilterChange}
                            />
      </div>
    )
}

export default Filter