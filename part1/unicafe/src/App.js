import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

const StatisticLine = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>)

const Statistics = ({feedbacks}) => {
  if (feedbacks.good === 0 && feedbacks.neutral === 0 && feedbacks.bad === 0){
    return (
      <h3>No feedbacks given</h3>
    )
  }

  const all = feedbacks.good + feedbacks.neutral + feedbacks.bad;
  const average = (feedbacks.good - feedbacks.bad) / all;
  const positive = feedbacks.good / all * 100 + "%";

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={feedbacks.good} />
      <StatisticLine text="neutral" value={feedbacks.neutral} />
      <StatisticLine text="bad" value={feedbacks.bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const page = {
    name: "give feedback",
    feedbacks: {
      good: good,
      neutral: neutral,
      bad: bad
    }
  }

  return (
    <div>
    <Header text={page.name}/>
    <Button handleClick={() => setGood(good + 1)} text = "Good" />
    <Button handleClick={() => setNeutral(neutral + 1)} text = "Neutral" />
    <Button handleClick={() => setBad(bad + 1)} text = "Bad" />
    <Header text="statistics"/>
    <Statistics feedbacks={page.feedbacks}/>
    </div>
  )
}

export default App