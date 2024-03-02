const Filter = ({ query, queryHandler }) => {
    return (
      <div>
        filter shown with
        <input 
           value={query} 
          onChange={queryHandler} 
        />
      </div>  
    )
  }

export default Filter