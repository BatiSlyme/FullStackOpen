import { useState } from 'react'

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>
    {name}
  </button>
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
        <p> good {good} </p>
        <p>neutral {neutral} </p>
        <p>bad {bad} </p>
        <p>all {good + neutral + bad}</p>
        <p>average {((good - bad) / (good + neutral + bad) || 0)}</p>
        <p>positive {(good / (good + neutral + bad) || 0)}</p>
      </div>
    </div>

  )
}

export default App