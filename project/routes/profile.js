const express = require('express');
const verify = require('../token.js');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const router = express.Router();
const model = require('../controllers/profileController.js');

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



router.get('/login/userProf', verify, (req, res) => {
    model.showProf(req, res, pool);
})


router.get('/login/userProf/upload', verify, (req, res) => {
    res.render('uploadPaper', { layout: 'layout.hbs' , logged:true });
});



router.post('/login/userProf/pic', verify, (req, res) => {
    model.updateProfPic(req, res, pool);
});



router.post('/login/userProf/name', verify, (req, res) => {
    model.updateName(req, res, pool);
})


router.post('/login/userProf/bio', verify, (req, res) => {
    model.updateBio(req, res, pool);
})

router.post('/login/userProf/edu', verify, (req, res) => {
    model.updateEducation(req, res, pool);
})

router.post('/login/userProf/work', verify, (req, res) => {
    model.updateWork(req, res, pool);
})


router.post('/login/userProf/communication', verify, (req, res) => {
    model.updateCommunicationPoints(req, res, pool);
})

router.post('/login/userProf/upload', verify, (req, res) => {
    model.uploadDoc(req, res, pool);
})



//DOWNLOAD DOCUMENT
router.get('/login/userProf/download/:id', verify, (req, res) => {
    model.downloadDoc(req, res, pool);
})


//EDIT DOCUMENT
//EDIT PAGE
router.get('/login/userProf/edit/:id', verify, (req, res) => {
    res.render('uploadPaper',{layout:'layout.hbs', logged:true});
})
//EDIT UTILITY
router.post('/login/userProf/edit/:id', verify, (req, res) => {
    model.editDoc(req, res, pool);
})

//DELETE DOCUMENT'
router.get('/login/userProf/delete/:id', verify, (req, res) => {
    model.deleteDoc(req, res, pool);
})


router.get('/login/userProf/display/:id', verify, (req, res) => {
    model.displayDoc(req, res, pool);
})

//DISPLAY SAVED DOCUMENTS

router.get('/login/userProf/saved', verify, (req, res) => {
    model.displaySavedDoc(req, res, pool);
})


//SAVE DOCUMENT
router.get('/login/save/:id',verify, (req, res) => {
    model.saveDoc(req, res, pool);
})



module.exports = router;