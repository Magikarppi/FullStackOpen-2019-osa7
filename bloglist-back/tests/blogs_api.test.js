const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const data = response.body

    expect(data.length).toBe(helper.initialBlogs.length)
})

test('all blogs are returned', async () => { 
      const response = await api.get('/api/blogs')
      const data = response.body
  
      expect(data.length).toBe(helper.initialBlogs.length)
  })

test('blogs have proper id field instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(e => e.id)

    expect(contents).toBeDefined()
})

test('valid blog can be added', async () => {
    const newBlog = {
        title: 'Remedy games',
        author: 'Remedy',
        url: 'https://www.remedygames.com/blog/',
        likes: 9
    }

    await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(e => e.title)

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
        expect(titles).toContain(
            'Remedy games'
        )
})

test('a blog without title is not added', async () => {
    const newBlog = {
        author: 'Remedy',
        url: 'https://www.remedygames.com/blog/',
        likes: 9
    }

    await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('a blog without author is not added', async () => {
    const newBlog = {
        title: 'Remedy games',
        url: 'https://www.remedygames.com/blog/',
        likes: 9
    }

    await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('a blog without url is not added', async () => {
    const newBlog = {
        title: 'Remedy games',
        author: 'Remedy',
        likes: 9
    }

    await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('a blog without likes has the likes of 0', async () => {
    const newBlog = {
        title: 'Remedy games',
        author: 'Remedy',
        url: 'https://www.remedygames.com/blog/'
    }

    await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        const length = blogsAtEnd.length

        expect(length).toBe(helper.initialBlogs.length + 1)
        expect(blogsAtEnd[length - 1].likes).toBe(0)
})

test('deletion of a blog succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(e => e.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('updating a blog\'s like property succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const updateBlog = {
        id: blogsAtStart[0].id,
        likes: 99
    }

    await api
        .put(`/api/blogs/${updateBlog.id}`)
        .send(updateBlog)
        .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(99)
})

afterAll(() => {
  mongoose.connection.close()
})