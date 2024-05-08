import { useState } from 'react'

const Button = ({ onClick, name }) => {
  return <button onClick={onClick}>
    {name}
  </button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>{text} {value}</div>
  );
}


const Statistics = ({ good, bad, neutral }) => {
  if (good || bad || neutral) {
    return (
      <div>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={good + neutral + bad} />
        <StatisticLine text={'average'} value={((good - bad) / (good + neutral + bad) || 0)} />
        <StatisticLine text={'positive'} value={(good / (good + neutral + bad) || 0)} />
      </div>
    );
  }
  return (<div>No feedback given</div>);

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>

  );
}

export default App