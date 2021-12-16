const User = require("../Models/User");
const Mongoose = require('mongoose');
 
exports.test = async (req, res, next) => {
    const usertosave = new User({
        firstname: 'name',
        lastname: 'test',
        guardianName: 'ska',
        socialID: '2606998470008',
        username: 'name',
        email: 'nameskatest@email.com',
        password: 'test',
        appointment: 'appointment',
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

    res.status(200).json({
        id: '123',
        username: user.username,
        password: user.password,
        firstName: user.firstname,
        lastName: user.lastname,
        token: 'secret'
    });
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