const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();

app.use(cookieParser())
module.exports = function auth(req, res, next) {
    const token = req.cookies['jwt']
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next()
    } catch (error) {

        res.status(401).send('Invalid Token');
    }


}