//jshint esversion :6
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');

// initial multer
const upload = require('../models/upload');
// students
const students = require('../models/Student');
const bach = require('../models/bach');

let general = require('../models/general');

//init general
let foundGeneral = general.findById("5e063252b44b702c18510c3d", (err, foundGeneral) => {
    if (err) console.log(err);
});

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});
// edit user
router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render("admin/userProfile", {
        bach: bach,
        user: req.user

    });
});


router.post('/edit-profile', ensureAuthenticated, (req, res) => {
    let data = {
        name: req.body.username,
        email: req.body.email,
        fbid: req.body.fbid,
        fbPass: req.body.fbPass
    }

    User.findByIdAndUpdate(req.user._id, data, (err, done) => {
        if (err) {
            res.redirect('/users/profile');
        } else {
            res.redirect('/users/profile');

        }
    })

});

router.post('/edit-img', upload, ensureAuthenticated, (req, res) => {
    let data = {
        userIMG: req.file.filename

    }

    User.findByIdAndUpdate(req.user._id, data, (err, done) => {
        if (err) {
            res.redirect('/users/profile');
        } else {
            res.redirect('/users/profile');

        }
    })

});


// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});


// *************** Add Or Delete Baches *********************
router.get('/baches', ensureAuthenticated, (req, res) => {


    bach.find({}, (err, bach) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/addBaches', {
                bach: bach,
                user: req.user
            });

        }
    });


})

// ******************** add bach ****************************
router.post('/add-bach', ensureAuthenticated, (req, res) => {

    let newBach = {
        name: req.body.bachName,
        session: req.body.session,
        department: req.body.department,
        fbLink: req.body.fbLink
    }

    bach.create(newBach, (err, newBach) => {
        if (err) {
            console.log(err);
        } else {
            console.log("bach created");
        }
    });


    res.redirect("/users/baches");
});

// **************************  end add bach *********************
//***************************edit bach********************** */

router.get('/edit-bach/:id', ensureAuthenticated, (req, res) => {
    bach.findById(req.params.id, (err, foundBach) => {
        if (err) {
            res.redirect('admin/editBach');
        } else {
            res.render('admin/editBach', {
                bach: foundBach,
                user: req.user
            });
        }
    });

});

router.put('/edit-bach/:id', ensureAuthenticated, (req, res) => {
    let data = {
        name: req.body.bachName,
        department: req.body.department,
        session: req.body.session,
        fbLink: req.body.fbLink
    }

    bach.findByIdAndUpdate(req.params.id, data, (err, done) => {
        if (err) {
            res.redirect('/users/baches');

        } else {
            res.redirect('/users/baches');
        }
    })

});



router.get('/delete-bach/:id', ensureAuthenticated, (req, res) => {
    bach.findByIdAndRemove(req.params.id, (err, foundBach) => {
        if (err) {
            res.redirect('/users/baches');
        } else {
            res.redirect('/users/baches');
        }
    });

});

// ************** end Baches ********************

module.exports = router;