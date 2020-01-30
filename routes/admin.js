//jshint esversion :6
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const general = require('../models/general');
const portfolio = require('../models/portfolio');
const blog = require('../models/blog');

const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');

// initial multer
const upload = require('../models/upload');
// students
const students = require('../models/Student');
const bach = require('../models/bach');


//init general
let foundGeneral = general.findById("5e063252b44b702c18510c3d", (err, foundGeneral) => {
    if (err) console.log(err);
});


// Login Page
router.get('/login', ensureAuthenticated, (req, res) => res.render('login'));
router.get('/dashboard', ensureAuthenticated, (req, res) => res.redirect('/dashboard'));
router.get('/', ensureAuthenticated, (req, res) => res.redirect('/dashboard'));

// ************** general setting ********************
router.get('/general', ensureAuthenticated, (req, res) => {
    general.findById("5e063252b44b702c18510c3d", (err, foundgeneral) => {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/generalSettings", {
                user: req.user,
                general: foundgeneral
            });
        }


    });
});

router.put('/generalsetting', ensureAuthenticated, (req, res) => {

    let data = {
        tagline: req.body.tagLine,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        google: req.body.google,
        tumblr: req.body.tumblr,
        aboutHeader: req.body.aboutHeader,
        aboutText: req.body.aboutText,
        street: req.body.street,
        city: req.body.city,
        phone: req.body.phone,
        map: req.body.map,
        email: req.body.email
    }

    general.findByIdAndUpdate("5e063252b44b702c18510c3d", data, (err, done) => {
        if (err) {
            res.redirect('/admin/general');
        } else {
            res.redirect('/admin/general');
        }
    })

});

router.put('/aboutImg', upload, ensureAuthenticated, (req, res) => {

    let data = {
        aboutImg: req.file.filename

    };

    general.findByIdAndUpdate("5e063252b44b702c18510c3d", data, (err, done) => {
        if (err) {
            res.redirect('/admin/general');

        } else {
            res.redirect('/admin/general');
        }
    })

});



module.exports = router;