import { useState } from 'react'

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>
    {name}
  </button>
}

const Statistics = ({ name, value }) => {
  return <div>{name} {value}</div>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={() => setGood(good => good + 1)} name={'good'} />
        <Button onClick={() => setNeutral(neutral => neutral + 1)} name={'neutral'} />
        <Button onClick={() => setBad(bad => bad + 1)} name={'bad'} />
      </div>

      <div>
        <h1>statistics</h1>
        <Statistics name={'good'} value={good} />
        <Statistics name={'neutral'} value={neutral} />
        <Statistics name={'bad'} value={bad} />
        <Statistics name={'all'} value={good + neutral + bad} />
        <Statistics name={'average'} value={((good - bad) / (good + neutral + bad) || 0)} />
        <Statistics name={'positive'} value={(good / (good + neutral + bad) || 0)} />
      </div>
    </div>

  )
}

export default App