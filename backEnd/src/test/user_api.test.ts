// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import supertest from 'supertest';
import { server } from '..';
const api = supertest(server);
import { User } from '../models/User';

const initialUsers = [
  {
    _id: 'rootId123',
    email: 'root@gmail.com',
    password: 'root',
    fullName: 'root root',
    nameOfPet: 'rootPet',
    position: 'ST',
  },
  {
    _id: 'rootTwoId123',
    email: 'rootTwo@gmail.com',
    password: 'rootTwo',
    fullName: 'rootTwo rootTwo',
    nameOfPet: 'rootTwoPet',
    position: 'Gk',
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
  userObject = new User(initialUsers[1]);
  await userObject.save();
});

describe('register', () => {
  test('insert to mongoDb one user', async () => {
    await User.deleteMany({});
    const newUser = await User.create(initialUsers[0]);
    const response = await api.get('/getUser');
    console.log(response);
    const users = response.body;
    expect(users.length).toBe(1);
    expect(users[0].email).toBe(newUser.email);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
