const Header = ({name}) => <h1>{name}</h1>


const Part = ({part, exercises}) => <p>{part} {exercises}</p>



const Content = ({parts}) => {
  return parts.map(part => <Part part = {part.name} exercises = {part.exercises}  key ={part.id}/>)
  }



const Total = ({parts}) => {
  let initialValue = 0;
  const sumWithInitialValue = parts.reduce(
    (a, c) => a + c.exercises,
    initialValue
  )
  return (
    <h3>total of {sumWithInitialValue} exercises</h3>
  )
}


const Course = ({course}) => {

  return (
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default Course