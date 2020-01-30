// jshint esversion:6

const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    institute: String,
    department: String,
    id: String,
    bach: String,
    occupation: String,
    email: String,
    phone: String,
    gender: String,
    fb: String,
    designation: String,
    city: String,
    state: String,
    zip: String,
    img: String,
    skill1: String,
    skill2: String,
    status: String
});


let student = mongoose.model("student", studentSchema);


module.exports = student;