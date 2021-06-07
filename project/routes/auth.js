const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const router = express.Router();

//Connect to database
const db = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DATABASE
});

//Registration
router.post('/register', (req, res) => {
    
    let { firstname, lastname, username, email, password, birthday } = req.body
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1)
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1)
    //Make sure that the email does not already exist if not registration is succeed
    db.query('SELECT email FROM LOGIN WHERE email = ?', [email], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        }

        //encrypt user password
        let hashedPassword = await bcrypt.hash(password, 8)

        db.query('insert into USER set ? ', { fname: firstname, lname: lastname, birthday: birthday }, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                db.query('insert into LOGIN set ? ', { username: username, email: email, password: hashedPassword, logUserID: result.insertId }, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.render('register', {
                            message: 'User registered'
                        })
                    }
                })
            }
        })

    });
})


//Login
router.post('/login',async (req, res)=>{
    try{
        const {username , password} = req.body
        db.query('SELECT * FROM LOGIN WHERE username = ?',[username], async (err,result)=>{
            if(result == '' ){
                res.status(401).render('home', {message: 'Email or Password is incorrect'})
            }
            else if(!(await bcrypt.compare(password,result[0].Password))){
                res.status(401).render('home', {message: 'Email or Password is incorrect'})
            }
            else{
                const id = result[0].loginID

                //token for user
                const token =jwt.sign({id: id},process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("the token is: " + token);

                //Set Cookie Options
                const cookieOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                //Create Cookie
                res.cookie('jwt', token, cookieOptions)
                res.status(200).render('home', {logged: true})
            }
        })
    }catch(error){
        throw error;
    }
} )


//Logout
router.get('/logout',async (req, res)=>{
    try{
        res.cookie('jwt','',{maxAge: 1});
        res.redirect('/');
    }catch(error){
        throw error;
    }
} )



module.exports = router;