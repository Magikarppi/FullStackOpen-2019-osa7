const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

describe('when there is initially one user at database', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({
            username: 'StrongWoman', password: 'PCPrincipal'
        })
        await user.save()
    })

    test('user without valid username is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'St',
            password: 'PCPrincipal',
            name: 'Jennifer'
        }

       const result =  await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('User validation failed')
        
        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user without username property is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            password: 'PCPrincipal',
            name: 'Jennifer'
        }

       const result =  await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Path `username` is required')
        
        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user without unique username is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'StrongWoman',
            password: 'wings2',
            name: 'Rane'
        }

       const result =  await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')
        
        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user without valid password is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'PCPrincipal',
            password: 'PC',
            name: 'Patrick'
        }

       const result =  await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password should be at least three (3) characters long')
        
        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })