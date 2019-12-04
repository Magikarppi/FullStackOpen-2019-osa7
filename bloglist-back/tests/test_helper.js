const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Sam Harris blog',
        author: 'Sam Harris',
        url: 'https://samharris.org/blog/',
        likes: 15
    },
    {
        title: 'Mindworks',
        author: 'Gurus',
        url: 'https://mindworks.org/blog/',
        likes: 3
    }
]

// const nonExistingId = async () => {
//     const blog = new Blog({ content: 'willremovethissoon' })
//     await blog.save()
//     await blog.remove()
  
//     return blog._id.toString()
//   }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())   
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())   
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}