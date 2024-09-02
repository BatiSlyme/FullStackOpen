const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const { initialBlogs, blogsInDb } = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared');

    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);

    console.log('done');
});

test('blogs are returned as json', async () => {
    console.log('entered test');
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
});

test('The unique identifier property of the blog posts is named id', async () => {
    const blogs = await blogsInDb();
    for (const blog of blogs) {
        const blogJson = JSON.stringify(blog);
        assert.strictEqual(blogJson.includes('id'), true);
    }
});


test('the blog note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('Th'), true)
});

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: 'No Likes',
        author: 'New York Giants',
        url: 'https://www.giants.com/',
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

    const likes = blogsAtEnd[2].likes;
    console.log('likes', likes);
    assert.strictEqual(likes, 0);
})

test('title is missing', async () => {
    const newBlog = {
        author: 'New York Giants',
        url: 'https://www.giants.com/',
    };

    const res = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    // .expect()
    // console.log('res.body.message', res.body);
    assert.strictEqual(res.body.error, 'Blog validation failed: title: Title required');
});

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'Eli Manning',
        author: 'New York Giants',
        url: 'https://www.giants.com/',
        likes: '2'
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

    const contents = blogsAtEnd.map(n => n.title);

    assert(contents.includes('Eli Manning'));
})

// test('blog without content is not added', async () => {
//     const newBlog = {
//         title: 'Eli !@#Easdas',
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(400)

//     const blogsAtEnd = await blogsInDb();
//     assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

//     assert.strictEqual(response.body.length, initialBlogs.length)
// });

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await blogsInDb();
    const resultBlog = await api
        .get(`/api/blogs/${blogsAtStart[0].id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    assert.deepStrictEqual(resultBlog.body, blogsAtStart[0]);
});

test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

    const blogsAtEnd = await blogsInDb();

    const contents = blogsAtEnd.map(r => r.title);
    assert(!contents.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);
});

test('a blog can be updated', async () => {
    const blogsAtStart = await blogsInDb();
    const blog = blogsAtStart[0];
    let updatedBlog = blog;
    updatedBlog.title = 'updated'
    console.table([updatedBlog]);
    await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
        .expect(200);

    const blogsAtEnd = await blogsInDb();
    console.table(blogsAtEnd);
    const titles = blogsAtEnd.map(r => r.title);
    assert.strictEqual(titles[0], 'updated');

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
});

after(async () => {
    await mongoose.connection.close()
});