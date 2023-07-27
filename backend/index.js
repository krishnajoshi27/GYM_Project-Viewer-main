const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectToMongo = require('./db')
const routes = require('./routes/routes')
const auth = require('./routes/auth')
const admin = require('./routes/admin')
require('dotenv').config()
const app = express();
connectToMongo()
app.use(bodyParser.json())
app.use(cors())

app.use('/workout',routes)
app.use('/auth',auth)
app.use('/admin', admin)

app.listen(8080,()=>console.log('Server started at port 8080'))
