const App = () => {
  const course = {
    name: "Half Stack application development",  
    parts: [
      {
        name:"Fundamentals of React", 
        exercises:10
      },
      {
        name:"Using props to pass data", 
        exercises:7
      },
      {
        name:"State of a component", 
        exercises:14
      }
    ]
  }
  console.log(course)

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  const content = props.course.parts.map(
    (part) => <Part key={part.name} part={part} />
  )
  return (content)
}

const Part = (props) => {
  console.log(`Render: ${props.part.name}`)
  const part = props.part
  return (<p>{part.name} {part.exercises}</p>)
}


const Total = (props) => {
  const numExercises = props.course.parts.reduce(
    (acc, part) => acc + part.exercises, 
    0
  )

  return (
    <p>Number of exercises {numExercises}</p>
  )
}

export default App