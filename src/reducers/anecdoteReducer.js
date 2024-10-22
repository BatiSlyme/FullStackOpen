import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdoteService'
import { clear, notify, notifyWithTimeout } from './notificationsReducer'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   };
// }

// export const create = (content) => {
//   return ({
//     type: 'CREATE',
//     data: { content }
//   });
// }

// export const anecdotesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE':
//       const id = action.data.id;
//       const anecdoteToChange = state.find(n => n.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       };
//       return state.map(anecdote =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       );
//     case 'CREATE':
//       return [...state, asObject(action.data.content)];
//     default:
//       return state
//   }
// }

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      console.log('vote called');
      const id = action.payload;
      const anecdoteToChange = state.find(n => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    create(state, action) {
      return [...state, asObject(action.payload)];
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})

export const { vote, create, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    console.log('createAnecdote called', content);
    await anecdoteService.postAnecdote((content));
    dispatch(create(content));
    dispatch(notifyWithTimeout(`you created '${content}'`, 5));
  };
};

export const voteAnecdote = (payload) => {
  return async dispatch => {
    console.log('voteAnecdote called', payload);
    await anecdoteService.updateAnecdote(payload.id, { ...payload, votes: payload.votes + 1 });
    dispatch(vote(payload.id))
    dispatch(notifyWithTimeout(`you voted '${payload.content}'`, 5));
  }
}

export default anecdoteSlice.reducer;




