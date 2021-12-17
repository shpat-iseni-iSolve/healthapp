const mongoose = require('mongoose');


var labSchema = new mongoose.Schema({
    name: {type: String},
    address: {type: String},
    phoneNumber: {type: String, default: ''},
    capacityPerHour: {type: String},
});

module.exports = new mongoose.model("Lab", labSchema, "Lab");