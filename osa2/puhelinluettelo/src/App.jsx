import { useState, useEffect } from 'react'
import personService from './services/person'

// Components
import Numbers from './components/numbers.jsx'
import Filter from './components/filter.jsx'
import Notification from './components/notification.jsx'
import ContactForm from './components/contactForm.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [notification, setNotification] = useState('notification')
  const [errorMsg, setErrorMsg] = useState('error')

  const hook = () => {
    personService
    .getAll()
    .then((response) => {
      const data = response.data 
      console.log("Received data:", data)
      setPersons(data)
    })
    setNotification(null)
    setErrorMsg(null)
  }

  useEffect(hook,[])

  const handleChange = (setValue,event) => {
    const newValue = event.target.value
    console.log("Input:",newValue)
    setValue(newValue)
  }

  const notify = (msg, setMsg) =>
  {
    setMsg(msg)
    setTimeout(() => setMsg(null), 5000)
  }

  const updateContact = (id, newEntry) => {
    if (confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
      console.log("Update number:", id, newEntry)
      personService
      .update(id, newEntry)
      .then((response) => {
          console.log("Response:",response)
          setPersons(
            persons.map((contact) =>
              contact.id === id ? response.data : contact
            )
          )
          notify(`Updated number for ${newEntry.name}`, setNotification)
      })
      .catch( (response) => {
        notify(`Information of ${newEntry.name} has already been deleted from the server`, setErrorMsg)
        setPersons(persons.filter((contact) => contact.id !== id))
      })
    }
  }

  const addContact = (newEntry) => {
    console.log("Adding:", newEntry)
    personService
    .post(newEntry)
    .then((response) => {
      console.log(response.data)
      setPersons(persons.concat(response.data))
      notify(`Added ${newEntry.name}`, setNotification)
    })
  } 

  const submitForm = (event) => {
    event.preventDefault()
    const newEntry = { 
      name: newName,
      number: newNumber
    }
    const existingEntry = persons.findIndex((e) => e.name == newEntry.name)
    if (existingEntry != -1) { 
      const id = persons[existingEntry].id
      updateContact(id, newEntry) 
    }
    else { addContact(newEntry) }
    setNewName("")
    setNewNumber("")
  }

  const deleteContact = (id) => () => {
    const contact = persons.find(p => p.id === id)
    if (confirm(`Delete ${contact.name}?`))
      {
        console.log("Delete",contact)
        personService.erase(id)
        setPersons(persons.filter(contact => id !== contact.id))
        notify(`Deleted ${contact.name}`, setNotification)
      }
  }

  const filteredPersons = persons.filter(
    ({ name }) => name.search(RegExp(query, "i")) !== -1
  )
  console.log("Filtered listing:",filteredPersons)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        msg={errorMsg}
        klass="error" />
      <Notification 
        msg={notification}
        klass="notification" />
      <Filter 
        query={query}
        queryHandler={(event) => handleChange(setQuery, event)} />
      <h1>add a new</h1>
      <ContactForm 
        name={newName}
        number={newNumber}
        nameHandler={(event) => handleChange(setNewName,event)}
        numberHandler={(event) => handleChange(setNewNumber,event)}
        submitForm={submitForm} />
      <h1>Numbers</h1>
      <Numbers 
        listing={filteredPersons} 
        deleteContact={deleteContact} />
    </div>
  )

}

export default App