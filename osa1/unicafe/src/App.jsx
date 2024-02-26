import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const changeValue = (setter,value) => {
    console.log("Pressed button with handler:",setter)
    console.log("New value:",value)
    setter(value)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button 
        handleClick={() => changeValue(setGood, good + 1)}
        text="good"
      />
      <Button 
        handleClick={() => changeValue(setNeutral, neutral + 1)}
        text="neutral"
      />
      <Button 
        handleClick={() => changeValue(setBad, bad + 1)}
        text="bad"
      />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) =>
{
  console.log("Create button with handler",handleClick,"and text",text)
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>statistics</h1>
      <ComputeStatistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const ComputeStatistics = ({ good, neutral, bad }) =>
{
  const total = () => good + neutral + bad

  // Laske keskimääräinen palautteen "hyvyys", missä
  // good-palautteen hyvyys on 1, neutralin 0 ja
  // badin -1. 
  // Palauta esim. 0.7
  const averageFeedback = () => 
    ((good - bad)/total()).toFixed(1)
    
  // Laske kuinka monta prosenttia vastauksista on positiivisia.
  // Palauta esim. "62.1%"
  const proportionGood = () =>
    (100*good/total()).toFixed(1).toString() + " %"
   
  if (total() == 0)
  {
    return <p>No feedback given</p>
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total()} />
          <StatisticLine text="average" value={averageFeedback()}/>
          <StatisticLine text="positive" value={proportionGood()} />
        </tbody>
      </table>
    )
  }
} 

const StatisticLine = ({ text, value }) => {
  console.log("Info:",text,value)
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App
