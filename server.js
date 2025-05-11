const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') })


const PORT = process.env.SERVER_PORT || 4500;

// // built-in middleware for json 
app.use(express.json());

// // built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}))

app.use('/user', require('./routs/user'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));