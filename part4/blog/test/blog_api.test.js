const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const api = supertest(app)
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Terry Mak",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
      user: "63634349f53795bbf4bb403f"
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Terry Mak",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
      user: "63634349f53795bbf4bb403f"
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Percy Leung",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
]

const defaultUser = {
    username: "tymak",
    name: "Terry Mak",
    password: "1234567",
    id: "63634349f53795bbf4bb403f"
}

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjs = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjs.map(blog => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})
    const newUser = new User({
            username: defaultUser.username,
            name: defaultUser.name,
            passwordHash: await bcrypt.hash(defaultUser.password, 10),
            _id: "63634349f53795bbf4bb403f"
    })
    await newUser.save()
})

describe('posting new notes', () => {
    const token = jwt.sign({
        username: defaultUser.username,
        id: defaultUser.id
    }, process.env.SECRET) 

    test('correctly creates a new blog post with token', async () => {
        const newBlog = {
            title: "Hello World",
            author: "Ty Mak",
            url: "123123@yahoo.com.hk",
            likes: 100
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)
    
        const contents = response.body.map(blog => blog.title)
        expect(contents).toContain('Hello World')
    })

    test('correctly throws error 401 Authentication fail with no token', async () => {
        const newBlog = {
            title: "Hello World",
            author: "Ty Mak",
            url: "123123@yahoo.com.hk",
            likes: 100
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', "")
            .send(newBlog)
            .expect(401)
    
    })

    test('set likes to 0 if missing the likes property', async () => {
        const newBlog = {
            title: "Missing likes",
            author: "Terry Mak",
            url: "321321321@yahoo.com.hk",
        }
    
        const response = await api
                            .post('/api/blogs')
                            .set('Authorization', `Bearer ${token}`)
                            .send(newBlog)
                            .expect(201)
                            .expect('Content-Type', /application\/json/)
    
        expect(response.body.likes).toBe(0)
    })
    
    test('responds 400 if title or url is missing', async () => {
        const missingTitle = {
            author: "Terry Mak",
            url: "321321321@yahoo.com.hk",
            likes: 1
        }
    
        const missingUrl = {
            title: "Missing url",
            author: "Terry Mak",
            likes: 1
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(missingTitle)
            .expect(400)
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(missingUrl)
            .expect(400)  
    
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

})

test('get all notes', async () => {
    const response = await api
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('there is an id property of each blog', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()    
    });
})



test('delete a blog correctly with token', async () => {
    const login = await api
                    .post('/api/login')
                    .send({ 
                        username: defaultUser.username,
                        password: defaultUser.password
                    })
                    .expect(200)

    const token = login.body.token

    const blogToDelete = await Blog.findOne( {user: defaultUser.id} )

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length - 1)

    const contents = response.body.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
})

test('modify likes of a blog', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blogToUpdate = allBlogs.body[0]
    const oldLikes = blogToUpdate.likes

    blogToUpdate.likes = oldLikes + 1

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)

    const modifiedBlog = response.body[0]
    expect(modifiedBlog.likes).toBe(oldLikes + 1)
})

test('modify title of a blog', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blogToUpdate = allBlogs.body[0]

    blogToUpdate.title = "New Title Yes!"

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)

    const modifiedBlog = response.body[0]
    expect(modifiedBlog.title).toBe("New Title Yes!")
})

afterAll(() => {
    mongoose.connection.close()
}) 