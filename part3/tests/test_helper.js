const Blog = require('../models/blog')
const User = require('../models/user')

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

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}