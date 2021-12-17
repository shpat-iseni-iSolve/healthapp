const User = require("../Models/User");
const Lab = require("../Models/Lab");
const Mongoose = require('mongoose');
const axios  = require('axios');
 
exports.test = async (req, res, next) => {
    const usertosave = new User({
        firstname: 'date',
        lastname: 'test',
        guardianName: 'ska',
        socialID: '2606998470008',
        username: 'name',
        email: 'nameskatest@email.com',
        password: 'test',
        appointment: '2021-12-17T08:01',
        recommendedDrugs: 'recommendedDrugs',
        role: 'role',
    });
    // usertosave._id = Mongoose.Types.ObjectId();
    await usertosave.save(async (err, data) => {
        if (err) {
            console.log('in err', err);
        }
        console.log('in done', data);
    });


    res.status(200).json({test:'test'});
}
 
exports.registerUser = async (req, res, next) => {

    const userToRegister = req.body;

    const userExists = await User.findOne({'socialID':userToRegister.socialID});

    if(userExists != null){        
        res.status(403).json('User already exists with the same social number!');
    }
    else {
        const usertosave = new User({
            firstname: userToRegister.firstName,
            lastname: userToRegister.lastName,
            guardianName: userToRegister.guardianName,
            socialID: userToRegister.socialID,
            username: userToRegister.username,
            email: userToRegister.email,
            password: userToRegister.password,
            role: 'user'
        });
        
        await usertosave.save(async (err, data) => {
            if (err) {
                console.log('in err', err);
            }
            console.log('in done', data);
        });

        res.status(200).json('User registered!');
    }
}

exports.authenticateUser = async (req, res, next) => {

    console.log('ktau');
    const _username = req.body.username;
    const _password = req.body.password;
    const user = await User.findOne({$and: [{'username': _username},{'password': _password}]});

    res.status(200).json(user);
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
}

exports.getUserById = async (req, res, next) => {
    const users = await User.findOne({_id: req.params.id});
    console.log(req.params.id)
    console.log(users._id)
    res.status(200).json(users);
}

exports.updateUserById = async (req, res, next) => {
    const users = await User.findOneAndUpdate({_id: req.params.id}, req.body);
    res.status(200).json(users);
}

exports.deleteUserById = async (req, res, next) => {
    const users = await User.deleteOne({_id: req.params.id});
    console.log(req.params.id)
    console.log(users._id)
    res.status(200).json(users);
}

exports.getAppointments = async (req, res, next) => {
    
    const todaysDate = new Date();
    
    const appointments = await User.find(
        {
                "appointment": {
                    "$gte": todaysDate.toISOString().split('T')[0],
                }
        });
        
    res.status(200).json(appointments);
}

exports.registerLab = async (req, res, next) => {

    const lab = new Lab({
        name: 'Laboratory',
        address: 'Dimo Gavrovski Kara 2, Tetovo 1220',
        phoneNumber: '071234567',
        capacityPerHour: '5',
    });
    
    lab.save(async (err, data) => {
        if (err) {
            res.status(403).json('not allowed.');
        }
        res.status(200).json(lab);
    });
}

exports.getDrugs = async (req, res, next) => {
    try {
        var response = await axios({
          method: "get",
          url: `https://api.fda.gov/drug/ndc.json?search=product_type:"HUMAN PRESCRIPTION DRUG"&limit=10000000`,
        });
        if (response.status == 200) {
          res.status(200).json(response.data);
        } else {
          res.status(404).json({ message: "Not found!" });
        }
      } catch (err) {
        console.log("no drugs :( " + err);
        res.status(404).json({ message: "Not found!" });
      }
}