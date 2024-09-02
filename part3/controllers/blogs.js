const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    if (blogs) {
        response.json(blogs);
    } else {
        response.status(404).end();
    }
})

blogsRouter.post('/', async (request, response) => {
    const req = request.body;
    // const user = await User.findById(req.userId);

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!req.likes) {
        req.likes = 0;
        req.user = user.id;
    }
    
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

blogsRouter.delete('/:id', async (req, res, next) => {
    const id = String(req.params.id)
    Blog.findByIdAndDelete(id)
        .then(() => { res.status(204).end(); logger.info('deleted') })
        .catch(error => next(error))

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