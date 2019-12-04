const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try {

        if (request.body.password.length < 3 || !request.body.password) {
            return response.status(400).json({ error: 'Password should be at least three (3) characters long' })
        }

        const passwordHash = await bcrypt.hash(request.body.password, 10)

        const user = new User({
            username: request.body.username,
            name: request.body.name,
            passwordHash
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1})
        response.json(users.map(user => user.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter