const Course = ({ course }) => {
    return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
    )
}

const Header = (props) => {
    return <h1>{props.course.name}</h1>
}
  
const Content = (props) => {
    const content = props.course.parts.map(
      (part) => <Part key={part.name} part={part} />
    )
    return content
}
  
const Part = (props) => {
    console.log(`Render: ${props.part.name}`)
    const part = props.part
    return <p>{part.name} {part.exercises}</p>
}
  
const Total = (props) => {
    const numExercises = props.course.parts.reduce(
      (acc, part) => acc + part.exercises, 
      0
    )
  
    return (
      <p>
        <strong>total of {numExercises} exercises</strong>
      </p>
    )
}

export default Course