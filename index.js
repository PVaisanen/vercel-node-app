 //require('dotenv').config()

const { urlencoded } = require('express');
const express = require('express');
const { Mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')

const app = express()
const mongoose = require('mongoose')


//const db_url = process.env.DATABASE_URL
const db_url = "mongodb+srv://admin:Admin123@cluster0.qmbws.mongodb.net/scorecard?retryWrites=true&w=majority"
mongoose.connect(db_url, {useNewUrlParser: true})
const db = mongoose.connection

const posts = [
    {
      username: 'Admin',
      title: 'Superman'
    },
    {
      username: 'Mag',
      title: 'Basicman'
    },
]

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/', (req, res) => res.send('Quiz app RestApi'));

const scoreboardRouter = require('./routes/scoreboard')
app.use('/scoreboard', scoreboardRouter)

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    console.log(process.env.ACCESS_TOKEN_SECRET)
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));