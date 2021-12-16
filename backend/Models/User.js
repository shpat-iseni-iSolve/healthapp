const mongoose = require('mongoose');

var resultsSchema = new mongoose.Schema({
    name: {type: String},
    date: {type: String},
    description: {type: String},
    file: {type: String}
});

var diagnosesSchema = new mongoose.Schema({
    name: {type: String},
    date: {type: String},
    description: {type: String}
});

var userSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    guardianName: {type: String},
    socialID: {type: String},
    username: {type: String},
    email: {type: String},
    password: {type: String},
    appointment: {type: String},
    results: {type: [resultsSchema.schema], default: null},
    recommendedDrugs: {type: String},
    role: {type: String},
    diagnoses: {type: [diagnosesSchema.schema], default: null},
});

module.exports = new mongoose.model("User", userSchema, "User");