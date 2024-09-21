const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Th',
        author: 'Сими',
        url: 'https://www.сими.com/',
        likes: 123,
    },
    {
        title: 'LOTR',
        author: 'J.R.R. Tolkien',
        url: 'https://www.lotr.com/',
        likes: 456,
    },
];

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

const getTokenFromLogin = async () => {
    const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'sa',
    }
    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const token = await api
        .post('/api/login')
        .send({
            username: 'mluukkai',
            password: 'sa',
        });

    return token;
}
module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb, getTokenFromLogin
}