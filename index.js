let express = require('express'); // calling the express module
const path = require('path');// calling the path module
const app = express(); // passing the express module to app variable
const port = 5000;// declare the port for the app
const env = require('dotenv');// calling the dotenv
const mysql = require('mysql2');// calling the mysqls
env.config({
    path: './.env'
})// config the path of env

app.set('view engine', 'hbs');
// priority to call first

app.use(express.urlencoded(
    {
        extended: true
    }));

app.use(express.static('public'));
//define the routes
app.use('/', require('./routes/admin_routes'));
app.use('/auth',require('./routes/auth'));

//creating a connection in database
app.use(express.json())
app.listen(port,()=>{
    console.log(`Server has started https://localhost:${port}`);// testing the port
})