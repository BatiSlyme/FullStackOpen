const blogsRouter = require('express').Router();
const middleware = require('.././utils/middleware')
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    if (blogs) {
        response.json(blogs);
    } else {
        response.status(404).end();
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const req = request.body;
    const user = request.user;
    console.log('user', user);

    if (!req.likes) {
        req.likes = 0;
        req.user = user.id;
    }
    req.user = user;
    const blog = new Blog(req);

    const savedBlogs = await blog.save();
    user.blogs = user.blogs.concat(savedBlogs.id);
    await user.save();
    response.status(201).json(savedBlogs);

});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res, next) => {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);

    if (user.id === blog.user.toString()) {
        const id = String(req.params.id)
        Blog.findByIdAndDelete(id)
            .then(() => { res.status(204).end(); logger.info('deleted') })
            .catch(error => next(error))
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }

});

blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    console.log(`updateBody is`, body);
    const blog = {
        body
    }

    const update = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true, context: 'query' });
    if (update) {
        res.json(update);
    } else {
        res.status(404).end();
    }
})

module.exports = blogsRouter;