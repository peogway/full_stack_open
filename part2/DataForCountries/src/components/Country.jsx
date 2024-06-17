const Country = ({country}) => {
    if (!country) return

    const lans = country.languages;
    const value = Object.values(lans);


    return (
        <div>

            <h1>{country.name.common}</h1>

            capital {country.capital[0]}
            <br/>
            area {country.area}
            <br/>
            <h3>languages:</h3>
            <ul>
                {value.map(lan => (
                    <div key = {lan}>
                        <li>{lan} </li>
                    </div>
                ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width = '200' />
        </div>
    )
}

export default Country