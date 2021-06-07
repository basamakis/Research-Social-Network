const express = require('express');
const verify = require('../token.js');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const router = express.Router();
const model = require('../controllers/searchController.js');


//default option
router.use(fileUpload());
router.use(express.urlencoded());
router.use(express.json());

//Connect to database
const pool = mysql.createPool({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DATABASE
});



//router

router.post('/search', (req, res) => {
    model.find(req, res, pool,false);
})

router.post('/login/search', verify, (req, res) => {
    model.find(req, res, pool,true);
})


//DOWNLOAD DOCUMENT
router.get('/search/download/:id', (req, res) => {
    model.downloadDoc(req, res, pool);
})

//SAVE DOCUMENT
router.get('/login/save/:id',verify, (req, res) => {
    model.saveDoc(req, res, pool);
})

//DISPLAY DOCUMENT
router.get('/search/display/:id', (req, res) => {
    model.displayDoc(req, res, pool,false);
})
router.get('/login/search/display/:id', verify, (req, res) => {
    model.displayDoc(req, res, pool,true);
})


//SEARCH BY CATEGORY
router.get('/search/byCategory/:id', (req, res) => {
    model.searchByCategory(req, res, pool,false);
})

router.get('/login/search/byCategory/:id', (req, res) => {
    model.searchByCategory(req, res, pool,true);
})


//SEARCH BY TYPE
router.get('/search/byType/:id', (req, res) => {
    model.searchByType(req, res, pool,false);
})

router.get('/login/search/byType/:id', (req, res) => {
    model.searchByType(req, res, pool,true);
})





module.exports = router;
