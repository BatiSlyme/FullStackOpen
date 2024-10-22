import axios from 'axios';
const url = 'http://localhost:3001';

const getAnecdotes = async () => {
    const res = await axios.get(`${url}/anecdotes`);
    console.log('res.data', res.data);
    return res.data;
};

const postAnecdote = async (content) => {
    const obj = { content, votes: 0 };
    const res = await axios.post(`${url}/anecdotes`, obj);
    return res.data;
}

const updateAnecdote = async (id, obj) => {
    const res = await axios.put(`${url}/anecdotes/${id}`, obj);
    return res.data;
}

export default { getAnecdotes, postAnecdote, updateAnecdote };