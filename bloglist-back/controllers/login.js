const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
    try {
    const body = request.body 
    console.log('request.body:', request.body)

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    console.log('user in loginjs:', user)

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    console.log('token in loginjs:', token)

    response.status(200).send({ token, username: user.username, name: user.name, id: user._id }) //lisäsin id: user._id osa5 thtv
} catch (exception) {
    next(exception)
}
})

module.exports = loginRouter