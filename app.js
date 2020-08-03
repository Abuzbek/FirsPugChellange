const express = require('express')

const path = require('path')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const User = require('./model/User')

const Reg = require('./model/Reg')

const passport = require('passport')


const sassMiddleware = require('node-sass-middleware')

//============== validation ==============

const flash = require('connect-flash')
const expressValidator = require('express-validator')
const session = require('express-session')

const bcrypt = require('bcryptjs')
//============== validation ==============

const app = express()

//============== messages ==============

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//============== messages ==============

// ============== express-sessions ==============

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

// ============== express-sessions ==============

// ============== express-validator ==============

app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

// ============== express-validator ==============



//==============mongose conection ==============
const dbJson = require('./helper/db')

mongoose.connect(dbJson.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

    console.log('mongoDbga local ulandik');
});
//=======body-parser=========

// BodyParser init
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

//sass setup
app.use(sassMiddleware({

    src: path.join(__dirname, 'public'),

    dest: path.join(__dirname, 'public'),

    indentedSyntax: true, // true = .sass and false = .scss

    sourceMap: true
}));

// ======== passport setup ========


require('./helper/passport')(passport)

app.use(passport.initialize())

app.use(passport.session())
app.get('*' , (req,res,next)=>{
 res.locals.user = req.user || null;
 next()
})

// ======== passport setup ========


// =====================router setup =====================
const userRouter = require('./routes/index')
const regRouter = require('./routes/register')

app.use('/' , userRouter)
app.use('/' , regRouter)

//============= routes Register Get method=============



// ============== route Login GET method ===============



// =============== style js img files ===============

app.use(express.static(path.join(__dirname, 'public')));

// =============== style js img files ===============

// =============== Listen server ===============

app.listen(3000, console.log('http://localhost:3000/'))

// =============== Listen server ===============


