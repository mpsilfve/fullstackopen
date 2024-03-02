const Input = ({ type, value, onChange }) => {
    return (
      <div>
        {type}:
        <input 
          value={value}
          onChange={onChange}
        />
      </div>
    )
}

export default Input