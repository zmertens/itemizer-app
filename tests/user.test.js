const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../server/models/user')
const app = require('../server/itemizer-app')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Vlad',
    email: 'vlad@example.com',
    password: 'ThatPasss77!',
    tokens: [
        {token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)}
    ]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

afterEach(async () => {

})

test('#Sanity checks', async () => {
    expect(5).not.toEqual(4)
    expect(5).toBe(5)
});

test('#Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Peter',
        email: 'peter@example.com',
        password: 'ThatPasss77!'
    }).expect(201)
})

test('#Should login an existing user', async () => {
    await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
})

test('#Should delete account for an existing user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('#Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer `)
        .send()
        .expect(401)
})

test('#Should fail to log in a non-existent user', async () => {
    await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: 'badpassword'
        }).expect(400)
})

test('#Should fail to load profile to log in unauthenticated user', async () => {
    await request(app).get('/users/me').send().expect(401)
})