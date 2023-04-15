let express = require('express'); // calling the express module
const path = require('path');// calling the path module
const app = express(); // passing the express module to app variable
const port = 5500;// declare the port for the app
const env = require('dotenv');// calling the dotenv
const mysql = require('mysql2');// calling the mysqls

env.config({
    path: './.env'
})// config the path of env

app.set('view engine', 'hbs');
// priority to call first
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//creating a connection in database
const mydb = mysql.createConnection(
    {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DATABSE_PORT
    }
);
app.listen(port,()=>{
    console.log(`Server has started ${port}`);// testing the port
    //Condition to test if succesfully connected in databse
    mydb.connect((error)=>{
        if (error){
            console.log('Error occured:' + error);
        }else{
            console.log('Database Connected Sucessfully')
        }
        
    })

})