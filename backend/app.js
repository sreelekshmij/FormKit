const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()

dotenv.config()
const PORT = process.env.PORT || 8000;
connectDB()

const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const formRoute = require('./routes/formRoute')

app.use(cors());
app.use(bodyParser.json())

app.use('/v1/auth',authRoute)
app.use('/v1/users',userRoute)
app.use('v1/forms',formRoute)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});