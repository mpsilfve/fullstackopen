import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  // Initialize all votes to 0
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0) 
  )

  const recordVote = (pos) => {
    const newVotes = [...votes]
    newVotes[pos] += 1
    console.log("Voting for:",pos)
    console.log("Votes:",newVotes)
    setVotes(newVotes)
  } 

  // Generate a random number in the range 0 ... (anecdotes.length - 1)
  const randomPos = () =>
  {
    const rPos = Math.floor(Math.random() * anecdotes.length) 
    console.log(
      "Random pos:", rPos,"in range [0,",anecdotes.length,")"
    )
    return rPos;
  }

  // Find the anecdote with the most votes, i.e. the pos with the higest 
  // value in the array votes.
  const maxVotePos = () => {
    const maxVote = Math.max(...votes)
    const pos = votes.findIndex((v) => v == maxVote)
    console.log("Max vote:",maxVote,"Position:",pos)
    return pos
  }

  return (
    <div>
      <Anecdote 
        header="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]} 
      />
      <Button 
        handleClick={() => recordVote(selected)} 
        text="vote"
      />
      <Button 
        handleClick={() => setSelected(randomPos())} 
        text = "next anecdote"
      />
      <Anecdote 
        header="Anecdote with most votes"
        anecdote={anecdotes[maxVotePos()]}
        votes={votes[maxVotePos()]}
      />
    </div>
  )
}

const Anecdote = ({ header, anecdote, votes }) => {
  return (
    <>
      <h1>{header}</h1>
        {anecdote}<br />
        has {votes} votes<br />
    </>
  )
}
const AnecdotePar = ({ anecdote }) =>
  <p>{anecdote}</p>

const VotePar = ({ votes }) =>
  <p>has {votes} votes</p>

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}>{text}</button>

export default App