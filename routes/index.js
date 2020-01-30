//jshint esversion:6
const express = require('express');
const router = express.Router();


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const bach = require('../models/bach');
const students = require('../models/Student');
const fileupload = require('../models/upload');
const messege = require('../models/messege');
let general = require('../models/general');
let allStudent;

//init general
let foundGeneral = general.findById("5e063252b44b702c18510c3d", (err, foundGeneral) => {
    if (err) console.log(err);
});
// Welcome Page
router.get('/', (req, res) => {
    general.findById("5e063252b44b702c18510c3d", (err, foundGeneral) => {
        if (err) console.log(err);
        else {
            res.render('welcome', { general: foundGeneral })
        }
    });

});

//************ gallary************ */
router.get('/gallary', (req, res) => res.render('gallary'));


//******************** */ blog*************************
router.get('/blog', (req, res) => res.render('blog'));
router.get('/blog/single', (req, res) => res.render('singleBlog'));


allStudent = students.find().count();

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('admin/dashboard', {
        user: req.user,
        bach: bach,
        students: students,
        allStudent: allStudent
    })
);


router.get('/admin/acknowledgement', ensureAuthenticated, (req, res) => {

    bach.find({}, (err, bach) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/acknowledgement', {
                bach: bach,
                user: req.user
            });

        }
    });
});

router.get('/resume', (req, res) => {
    res.render('resume');
});


router.post('/send-messege', ensureAuthenticated, (req, res) => {
    res.send('send messege');
});

module.exports = router;