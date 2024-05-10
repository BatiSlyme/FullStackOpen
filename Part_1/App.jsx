import { useState } from 'react'


const LargestVote = ({ anecdotes, largest, largestElement }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[largestElement]}
      <div></div>
      has {largest} votes
    </div>
  )
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const randomNumberRange = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setSelected(randomNumber);
  };
  const [largest, setLargest] = useState(0);
  const [largestElement, setLargestElement] = useState(0);

  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 });
  const setVotes = (n) => {
    const updatedPoints = { ...points, [n]: points[n] + 1 };
    setPoints(updatedPoints);
    const sortedObj = Object.entries(updatedPoints).sort((a, b) => b[1] - a[1]);
    setLargest(sortedObj[0][1]);
    setLargestElement(sortedObj[0][0])
  }

  return (
    <div>
      {anecdotes[selected]}
      <div></div>
      has {points[selected]} votes
      <div></div>
      <button onClick={() => { setVotes(selected); }}>vote</button>
      <button onClick={() => { randomNumberRange(0, anecdotes.length - 1) }}>next anecdote</button>
      <div></div>
      <LargestVote anecdotes={anecdotes} largest={largest} largestElement={largestElement} />
    </div>
  );
}

export default App