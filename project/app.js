const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const TWO_HOURS = 1000 * 60 * 60 * 2
const {
    PORT = 3000,

    SESS_NAME = 'sid',
    SESS_SECRET = 'quiet',
    NODE_ENV = 'development',
    SESS_LIFETIME = TWO_HOURS
} = process.env

//Encrypted information
dotenv.config({ path: './.env' })

const app = express();

// Templating engine
app.engine(
    "hbs",
    exphbs({
        extname: "hbs",
        defaultLayout: false,
        layoutsDir: "views/layouts/"
    })
);

app.set('view engine', 'hbs');

//Use public directory
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir))
app.use(express.static('upload'));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

//Parse JSON bodies (as sent by API clients) data from Form comes as JSONS
app.use(express.json());

//Initialize Cookie Parser 
app.use(cookieParser());



//Connect to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DATABASE
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log('Connected')
    }
})

//Define Routes
app.use('/', require('./routes/pages.js'))

app.use('/', require('./routes/auth.js'))


app.use('/', require('./routes/profile.js'))

app.use('/', require('./routes/search.js'))


app.listen(PORT, () => console.log(`Server listen to port ${PORT}...`))




