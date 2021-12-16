const User = require("../Models/User");
const Mongoose = require('mongoose');
 
exports.test = async (req, res, next) => {
    const usertosave = new User({
        firstname: 'name',
        lastname: 'test',
        guardianName: 'ska',
        socialID: '2606998470008',
        username: 'nameskatest',
        email: 'nameskatest@email.com',
        password: 'password',
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