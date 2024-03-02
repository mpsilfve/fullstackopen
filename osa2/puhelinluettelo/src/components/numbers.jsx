const Numbers = ({ listing, deleteContact }) => {
    console.log("Rendering phonebook:", listing)
    const foo = listing.map(
      ({ id, name, number }) => {
        const bid = `d${name}`
        return (
          <p key={name}>{name} {number} <button 
              key={bid} 
              onClick={deleteContact(id)}>
                delete
              </button>
          </p>
        )
      }
    )
    return (
      <div>
        {foo}
      </div>
    )
}

export default Numbers