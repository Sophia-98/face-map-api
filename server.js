const express =  require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: 'dpg-ck27h1g21fec73ceaj5g-a.frankfurt-postgres.render.com',
      ssl: {rejectionUnauthorized: false},
      host:  'dpg-ck27h1g21fec73ceaj5g-a',
      port: 5432,
      user: 'facerecogdb_zmh9_user',
      password: 'Ld4rx3A3aviAgfYC6QeUGrL2TGVz3IbV',
      database: 'facerecogdb_zmh9'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send('success');
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register',(req,res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(5432 || 3000, ()=> {
    console.log(`App is running on ${process.env.PORT}`);
})

