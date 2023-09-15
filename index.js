import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import * as register from './controllers/register.js';
import * as signin from './controllers/signin.js';
import * as profile from './controllers/profile.js';
import * as image from './controllers/image.js';


const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {rejectionUnauthorized: false},
      host:  process.env.DATABASE_HOST,
      port: process.env.PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_DB
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send('success');
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
  });
  

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`App is running on ${process.env.PORT}`);
})

