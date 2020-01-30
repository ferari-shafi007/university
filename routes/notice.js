//jshint esversion :9
const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');
let facbook = require("facebook-chat-api");
const User = require('../models/User');
const noticeFile = require('../models/file');

// students
const students = require('../models/Student');
const bach = require('../models/bach');
const messege = require('../models/messege');
const messenger = require('../config/facebook');
let general = require('../models/general');

//init general
let foundGeneral = general.findById("5e063252b44b702c18510c3d", (err, foundGeneral) => {
    if (err) console.log(err);
});

//time and date

let date = new Date().toLocaleDateString();
let time = new Date().toLocaleTimeString();
let currentDate = date + " " + time;



//show Notice
router.get('/', (req, res) => {
    messege.find((err, messege) => {
        if (err) {
            console.log(err);
        } else {
            res.render('notice', {
                notice: messege
            });
        }
    });
});

// add notice
router.get("/add", ensureAuthenticated, (req, res) => {
    bach.find((err, bach) => {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/addNotice", {
                bach: bach,
                user: req.user
            });

        }


    });

});
router.post('/add', ensureAuthenticated, (req, res) => {
    // add new notice and push into database


    let newMessege = {
        date: currentDate,
        bach: req.body.bach,
        subject: req.body.noticeHead,
        noticeBody: req.body.noticeBody,
        noticeFile1: req.body.noticeFile1,
        noticeFile2: req.body.noticeFile2,
        noticeFile3: req.body.noticeFile3,
        noticeFile4: req.body.noticeFile4

    };

    messege.create(newMessege, (err, newMessege) => {
        if (err) {
            console.log(err);
            res.render('/admin/addNotice', {
                msg: err,
                user: req.user,
                bach: bach

            });

        } else {
            console.log("notice created");
            // send notice to fb link
            messenger.sendTextMessage({
                id: bach.fbLink,
                text: newMessege
            });

        }
    });


    // redirect to notice page

    res.redirect("/notice/edit");
});


//*********************** edit notice ****************/
router.get('/edit', ensureAuthenticated, (req, res) => {
    messege.find((err, messege) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/Notice', {
                notice: messege,
                user: req.user,
                bach: bach
            });
        }
    });
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    messege.findById(req.params.id, (err, foundNotice) => {
        if (err) {
            res.redirect('notice/edit');
        } else {
            bach.find((err, bach) => {
                if (err) { console.log(err); } else {
                    res.render('admin/editNotice', {
                        notice: foundNotice,
                        user: req.user,
                        bach: bach
                    });
                }
            });
        }
    });

});


router.put('/edit/:id', ensureAuthenticated, (req, res) => {
    let data = {
        date: currentDate,
        bach: req.body.bach,
        subject: req.body.noticeHead,
        noticeBody: req.body.noticeBody,
        noticeFile1: req.body.noticeFile1,
        noticeFile2: req.body.noticeFile2,
        noticeFile3: req.body.noticeFile3,
        noticeFile4: req.body.noticeFile4
    }

    messege.findByIdAndUpdate(req.params.id, data, (err, done) => {
        if (err) {
            res.redirect('/notice/edit');
        } else {
            res.redirect('/notice/edit');

        }
    })

});
//*******************delete notice ******************/

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    messege.findByIdAndRemove(req.params.id, (err, foundMessege) => {
        if (err) {
            res.redirect('/notice/edit');
        } else {
            res.redirect('/notice/edit');
        }
    });

});


module.exports = router;