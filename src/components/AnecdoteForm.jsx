import { useSelector, useDispatch } from 'react-redux'
import { create, vote } from '../reducers/anecdoteReducer';
import Filter from './Filter';
import Notification from './Notification';
import { clear, notify } from '../reducers/notificationsReducer';
import { useEffect } from 'react';

const AnecdoteForm = () => {
    console.log('state is:', useSelector(state => state.anecdotes));
    let anecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes));
    const filter = useSelector(state => state.filter);
    console.log('filter is:', filter);
    if (filter !== 'ALL') {
        anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter));
    }
    const dispatch = useDispatch()
    const createAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        e.target.content.value = '';
        dispatch(create(content));
        dispatch(notify(`you created '${content}'`));
        setTimeout(() => { dispatch(clear(content)); }, 5000);
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
                        <button onClick={() => {
                            dispatch(vote(anecdote.id))
                            dispatch(notify(`you voted '${anecdote.content}'`));
                            setTimeout(() => { dispatch(clear(anecdote.id)); }, 5000);
                        }}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="content" /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm;