const express = require('express');
const verify = require('../token.js');
const router = express.Router();


router.get('/', (req , res)=>{
    res.render('home');
});

router.get('/aboutUs', (req , res)=>{
    res.render('aboutUs');
});

router.get('/categories', (req , res)=>{
    res.render('categories');
});

router.get('/register', (req , res)=>{
    res.render('register');
});



// IF YOU ARE VERIFIED
router.get('/login', verify , (req, res)=>{
    res.status(200).render('home', {logged: true})
})

router.get('/login/aboutUs',verify, (req , res)=>{
    res.render('aboutUs', {logged: true});
});

router.get('/login/categories',verify, (req , res)=>{
    res.render('categories', {logged: true});
});


module.exports = router;