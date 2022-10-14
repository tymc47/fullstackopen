const Header = (props) => {
  return (
    <h1>{props}</h1>
  )
}

const Content = (props) => {
  return (
    <Part />
    <Part />
    <Part />
  )
}

const Total = (props) => {
  return (
    <p>"Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
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
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App