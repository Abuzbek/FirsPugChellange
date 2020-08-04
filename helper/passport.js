// const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const Reg = require('../model/Reg')
const DbJson = require('../helper/db')
module.exports = (passport) => {
    passport.use(new LocalStrategy(
        function (username, password, done) { 
            Reg.findOne({ username: username }, function (err, user) {
                console.log(user);
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) console.log(err);
                    if (isMatch) {
                        done(null, user)
                    }
                    else {
                        done(null, false, { message: 'parolingiz natogri' })
                    }
                })
            });
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Reg.findById(id, function (err, user) {
            done(err, user);
        });
    });
} 