const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const api = supertest(app)

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjs = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjs.map(blog => blog.save())
    await Promise.all(promiseArray)
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

test('correctly creates a new blog post', async () => {
    const newBlog = {
        title: "Hello World",
        author: "Ty Mak",
        url: "123123@yahoo.com.hk",
        likes: 100
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

    const contents = response.body.map(blog => blog.title)
    expect(contents).toContain('Hello World')
})

test('set likes to 0 if missing the likes property', async () => {
    const newBlog = {
        title: "Missing likes",
        author: "Ak Yeung",
        url: "321321321@yahoo.com.hk",
    }

    const response = await api
                        .post('/api/blogs')
                        .send(newBlog)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
})

test('responds 400 if title or url is missing', async () => {
    const missingTitle = {
        author: "Ak Yeung",
        url: "321321321@yahoo.com.hk",
        likes: 1
    }

    const missingUrl = {
        title: "Missing url",
        author: "Ak Yeung",
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(missingTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(missingUrl)
        .expect(400)  

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('delete a blog correctly', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blogToDelete = allBlogs.body[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
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