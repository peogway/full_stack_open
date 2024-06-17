const Countries = ({countries, showInfor}) => { 
    return (
        <div>
            {countries.map((country) => (
                <div key = {country.ccn3}>
                    {country.name.common}
                    <button onClick ={() => showInfor(country)}>show</button>
                </div>
            ))}
        </div>
    )
}

export default Countries