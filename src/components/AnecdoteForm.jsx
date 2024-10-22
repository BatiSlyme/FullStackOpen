import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from '../reducers/anecdoteReducer';
import Filter from './Filter';
import Notification from './Notification';

const AnecdoteForm = () => {
    console.log('state is:', useSelector(state => state.anecdotes));
    let anecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes));
    const filter = useSelector(state => state.filter);
    console.log('filter is:', filter);
    if (filter !== 'ALL') {
        anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter));
    }

    const dispatch = useDispatch()

    const create = (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        console.log('content is:', content);
        dispatch(createAnecdote(content));
        e.target.content.value = '';
    }

    const vote = (payload) => {
        dispatch(voteAnecdote(payload));
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => { vote(anecdote); }}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="content" /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm;