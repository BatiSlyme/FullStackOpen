import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import { useEffect } from 'react';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <AnecdoteForm />
    </div>
  )
}

export default App