const Input = ({ countryQuery, setter }) => {
    return (
      <>
        find countries
        <input 
          value={countryQuery} 
          onChange={(event) => setter(event.target.value)} 
        />
      </>
    )
  }

export default Input