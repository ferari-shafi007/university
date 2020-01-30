//jshint esversion :9
const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');
const User = require('../models/User');
const upload = require('../models/upload');
// students
const students = require('../models/Student');
const bach = require('../models/bach');
let general = require('../models/general');

//init general
let foundGeneral = general.findById("5e063252b44b702c18510c3d", (err, foundGeneral) => {
    if (err) console.log(err);
});


// *************** show student *********************
router.get('/', (req, res) => {

    students.find({}, (err, students) => {
        if (err) {
            console.log(err);
        } else {
            bach.find((err, bach) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("students", {
                        bach: bach,
                        students: students
                    });
                }


            });
        }
    });


});

router.post('/select', (req, res) => {
    students.find({
        department: req.body.department,
        institute: req.body.institute,
        bach: req.body.bach,
        status: req.body.status
    }, (err, foundStudents) => {
        if (err) console.log(err);
        else {
            bach.find((err, bach) => {
                if (err) console.log(err);
                else {
                    res.render('students', {
                        students: foundStudents,
                        bach: bach
                    });
                }
            })
        }
    });
});
// ************** end show student ********************


// *************** show student *********************
router.get('/dashboard', ensureAuthenticated, (req, res) => {


    students.find((err, students) => {
        if (err) {
            console.log(err);
        } else {
            bach.find((err, bach) => {
                res.render("admin/students", {
                    students: students,
                    user: req.user,
                    bach: bach

                });
            });
        }
    });


});
// ************** end show student ********************

// ***************************  add student ******************
router.get("/add", ensureAuthenticated, (req, res) => {
    bach.find((err, bach) => {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/addStudent", {
                bach: bach,
                user: req.user
            });
        }


    });

});


router.post("/add", upload, ensureAuthenticated, (req, res) => {

    let errors = [];
    let newStudent = new students({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.Department,
        id: req.body.id,
        occupation: req.body.occupation,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        fb: req.body.fb,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        img: req.file.filename,
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        bach: req.body.bach,
        status: req.body.status
    });

    students.create(newStudent, (err, newStudent) => {
        if (err) {
            console.log(err);
            errors.push({
                msg: err
            });

            res.render('/admin/addStudent', {
                error: err,
                user: req.user,
                bach: bach,
                failureFlash: true

            });

        } else {
            console.log("Student created");

        }
    });
    res.redirect('/student/add');

});


// *************************** end add student *****************

// ***************** show student profile **************************

router.get("/:id", (req, res) => {
    // find user
    students.findById(req.params.id, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            res.render("user/userProfile", {
                foundUser: foundUser
            });
        }
    });
});

// ***************** end show student profile **********************
//******************edit student *************************/
router.get('/edit/:id', ensureAuthenticated, (req, res) => {

    students.findById(req.params.id, (err, foundStudent) => {
        if (err) {
            res.render('admin/editStudent', {
                user: req.user
            });
        } else {
            res.render('admin/editStudent', {
                students: foundStudent,
                user: req.user
            });
        }
    })

});




//*********delete student */
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    students.findByIdAndRemove(req.params.id, (err, foundStudent) => {
        if (err) {
            res.redirect('/student/dashboard');
        } else {
            res.redirect('/student/dashboard');
        }
    });

});

module.exports = router;