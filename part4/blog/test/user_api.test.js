const { initial } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../model/user')
const api = supertest(app)

const initialUsers = [
    {
        "username": "tymak",
        "name": "Terry Mak",
        "password": "1234567"
    },
    {
        "username": "pyleung",
        "name": "Percy Leung",
        "password": "7654321"
    }
]

beforeEach(async () => {
    await User.deleteMany({})

    const userObjs = initialUsers.map(user => new User(user))
    const promiseArray = userObjs.map(user => user.save())
    await Promise.all(promiseArray)
})

describe('adding user with valid input', () => {
    test('valid input', async () => {
        const newUser = {
            'username': "billytam",
            "name": "Billy Tam",
            'password': "2222222"
        }

       await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length + 1)

        const users = response.body.map(user => user.username)
        expect(users).toContain('billytam')
    })
})

describe('adding user with invalid username or password', () => {
    test('duplicate username', async () => {
        const duplicate = {
            "username": "tymak",
            "name": "Terry Mak23",
            "password": "1234567"
        }

        const response = await api
                                .post('/api/users')
                                .send(duplicate)
                                .expect(400)

        expect(response.body.error).toBe('username must be unique')

        const allUsers = await api.get('/api/users')
        expect(allUsers.body).toHaveLength(initialUsers.length)
    })

    test('empty username or empty password', async () => {
        const missingUsername = {
            "name": "Terry Mak23",
            "password": "1234567"
        }

        const missingPassword = {
            "username": "tymak",
            "name": "Terry Mak23",
        }

        const response = await api
                                .post('/api/users')
                                .send(missingUsername)
                                .expect(400)

        expect(response.body.error).toBe('username and password must be given')

        const response2 = await api
                                .post('/api/users')
                                .send(missingPassword)
                                .expect(400)

        expect(response2.body.error).toBe('username and password must be given')

        const allUsers = await api.get('/api/users')
        expect(allUsers.body).toHaveLength(initialUsers.length)
    })

    test('invalid username or invalid password', async () => {
        const invalidUsername = {
            "username": "ty",
            "name": "Terry Mak23",
            "password": "1234567"
        }

        const invalidPassword = {
            "username": "tymak223",
            "name": "Terry Mak23",
            "password": "12"
        }

        const response = await api
                                .post('/api/users')
                                .send(invalidUsername)
                                .expect(400)

        expect(response.body.error).toBe('username and password must consists of at least 3 characters')

        const response2 = await api
                                .post('/api/users')
                                .send(invalidPassword)
                                .expect(400)

        expect(response2.body.error).toBe('username and password must consists of at least 3 characters')

        const allUsers = await api.get('/api/users')
        expect(allUsers.body).toHaveLength(initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
}) 