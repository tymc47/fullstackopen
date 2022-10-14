const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part =({part}) => {
  const {name, exercise} = part;
  return (
    <p>{name} {exercise}</p>
  )
}

const Content = ({course}) => {
  const parts = course.parts
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  )
}

const Total = ({course}) => {
  const parts = course.parts
  return (
    <p>Total Number of exercises: {parts[0].exercise +parts[1].exercise+parts[2].exercise}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using props to pass data',
        exercise: 7
      },
      {
        name: 'State of a component',
        exercise: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App