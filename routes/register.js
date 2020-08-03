const express = require('express')

const router = express.Router()

const bcrypt = require('bcryptjs')

const Reg = require('../model/Reg')

const passport = require("passport");


router.get('/register', (req, res, next) => {
    res.render('register', {
        title: 'REGISTRATION'
    })
})
//============= routes Register Get method=============

//============= routes Register Get method=============

router.post('/register', (req, res, next) => {
console.log(req.body);
    const username = req.body.username
    const surname = req.body.surname
    const email = req.body.email
    const number = req.body.number
    const password = req.body.password
    const passwordTwo = req.body.passwordTwo
    const file = req.body.file

    req.checkBody('username', "the name should not be left blank").notEmpty()
    req.checkBody('surname', "the surname should not be left blank").notEmpty()
    req.checkBody('email', "the email should not be left blank").notEmpty()
    req.checkBody('number', "the number should not be left blank").notEmpty()
    req.checkBody('password', "the password should not be left blank").notEmpty()
    req.checkBody('passwordTwo', "the confirm password  should not be left blank").equals(req.body.password)
    req.checkBody('file', "the file should not be left blank").notEmpty()
    pass = req.body.password
    email1 = req.body.email

    const errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            title: 'Controller when adding music',
            errors: errors
        })
    }
    else {
        const musicReg = new Reg({
            username: username,
            surname: surname,
            email: email,
            password: password,
            passwordTwo: passwordTwo,
            number: number,
            file: file
        })
        bcrypt.genSalt(10, (err, pass) => {
            bcrypt.hash(musicReg.password, pass, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                musicReg.password = hash;
                musicReg.save((err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        req.flash('info', 'Siz muvaffaqiyatli qoshildingiz')
                        res.redirect('/login')
                    }
                })
            })
        })

    }
})
//============= routes Register Get method=============

// ============== route Login GET method ===============

router.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'LOGIN'
    })
})

// ============== route Login GET method ===============

// ============== route Login GET method ===============

router.post('/login', (req, res, next) => {
   passport.authenticate( 'local' ,{
       successRedirect:'/user' ,
       failureRedirect: '/login',
       failureFlash: true
   })(req,res,next)
})

router.get('/logout', (req, res, next) => {
   req.logOut()
   req.flash('info' , 'Muaffaqiyatli tizimdan chiqib ketdingiz')
   res.redirect('/login')
})

module.exports = router