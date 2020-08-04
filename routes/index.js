const express = require('express')

const router = express.Router()

const User = require('../model/User')

const Reg = require('../model/Reg')


//============= routes User Get method=============

router.get('/', (req, res, next) => {
    User.find({}, (err, music) => {
        if (err) {
            console.log(err + 'javob yoq');
        }
        else {
            res.render('user', {
                title: 'Users',
                musics: music,
                isAdd: true
            })
        }
    })

})

//============= routes User Get method=============
// ============= eA middlewar =============
const eA = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        req.flash('danger', 'oldin royhatdan oting')
        res.redirect('/login')
    }
}


//============= routes Index Get method =============

router.get('/user', eA, (req, res, next) => {
    res.render('index', {
        title: 'Pug salom',
        isIndex: true
    })
})
//============= routes Index Get method=============

//============= routes Index post method=============

router.post('/user', eA, (req, res, next) => {
    req.checkBody('name', "the name should not be left blank").notEmpty()
    req.checkBody('surname', "the surname should not be left blank").notEmpty()
    req.checkBody('email', "the email should not be left blank").notEmpty()
    req.checkBody('number', "the number should not be left blank").notEmpty()
    req.checkBody('file', "the file should not be left blank").notEmpty()

    const errors = req.validationErrors();
    if (errors) {
        res.render('index', {
            title: 'Controller when adding music',
            errors: errors
        })
    }
    else {
        const musicUser = new User()
        musicUser.AccoundName = req.user._id
        musicUser.name = req.body.name
        musicUser.surname = req.body.surname
        musicUser.email = req.body.email
        musicUser.number = req.body.number
        musicUser.file = req.body.file
        // console.log(req.body);
        musicUser.save((err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                req.flash('info', 'musiqamiz muvaffaqiyatli qoshildi')
                res.redirect('/')
            }
        })
    }



})

//============= routes  Index post method=============



//============= routes Update GET method=============


router.get('/update', eA, (req, res, next) => {
    res.render('update', {
        title: 'Update'
    })
})

//============= routes Update GET method=============

//============= routes Update:id GET method=============

router.get('/update/:id', eA, (req, res, next) => {
    User.findById(req.params.id, (err, music) => {
        if (err)
            console.log(err);
        else
            Reg.findById(music.AccoundName, (err, say) => {
                if (err)
                    console.log(err)
                else
                    res.render('userUpdate', {
                        title: 'User Update',
                        music: music,
                        data: say.username
                    })
            })

    })
})

//============= routes Update:id GET method=============

//============= routes user/edit:id GET method=============

router.get('/user/edit/:id', (req, res, next) => {
    User.findById(req.params.id, (err, music) => {
        Reg.findById(music.AccoundName, (err, data) => {
            if (music.AccoundName != req.user._id) {
                req.flash('danger', 'Haqqingiz yoq')
                res.redirect('/')
            }
            res.render('userEdit', {
                title: 'User Update',
                music: music,
                // data: data.username
            })
        })

    })
})

//============= routes user:id GET method=============

//============= routes Update:i  d post method=============


router.post('/user/edit/:id', (req, res, next) => {
    const musics = {};
    // musics.AccoundName = 
    musics.name = req.body.name;
    musics.surname = req.body.surname;
    musics.email = req.body.email;
    musics.file = req.body.file;
    musics.number = req.body.number;
    musics.data = req.body.data;
    const query = { _id: req.params.id }
    User.update(query, musics, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            req.flash('info', 'musiqa muvoffaqiyatli almashdi')
            res.redirect('/')
        }
    })



})

//============= routes Update:id post method=============

//============= routes Update:id Delete method=============

router.get('/user/delete/:id', (req, res, next) => {
    if (!req.user._id) {
        res.status(500).send()
    }
    User.findById(req.params.id, (error, music) => {
        if (music.AccoundName != req.user._id) {
            req.flash('danger', 'haqqingiz yoq')
            res.redirect('/')
        }
        else {
            User.findByIdAndRemove(req.params.id, (err, music) => {
                if (err) {
                    console.log(err);
                }
                else {
                    req.flash('info', "musiqa muvoffaqiyatli o'chdi")

                    res.redirect('/')
                }
            })
        }
    })



})
module.exports = router