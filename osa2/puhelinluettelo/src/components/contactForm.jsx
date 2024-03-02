import Input from './input.jsx'

const ContactForm = ({ name, 
    number, 
    nameHandler, 
    numberHandler, 
    submitForm }) => {
    return (
        <div>
            <form onSubmit={submitForm}>
                <Input type="name" value={name} onChange={nameHandler} />
                <Input type="number" value={number} onChange={numberHandler} />
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm