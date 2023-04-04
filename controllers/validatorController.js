const User = require('../models/User');
const { check, validationResult } = require('express-validator');

//Go to the home page
exports.home = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()  });
    }
    res.status(200).render('home', { message: 'Welcome to Test Bank' });
}

//Go to the signup page
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    res.status(200).render('signup', {pageTitle: 'Sign Up Form' });
}

//Code for the signup page
exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //User Creation
    const { name, email, age, balance, accounttype } = req.body;
    const newUser = new User({
        name: name,
        email: email,
        age: age,
        account: {
            balance: balance,
            accountType: accounttype,
        }
    });

    newUser.save().then(() => console.log('User saved successfully')).catch((err) => console.error(err));
    res.render('signup', {pageTitle: 'Sign Up Form' });
};

//Go to the lookup page
exports.lookuppage = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    res.status(200).render('lookup', {pageTitle: 'Look up form' });
}

//Look up a user by email, if email doesn't exist return an error otherwise return the user object
exports.lookup = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        console.log(`User not found/doesn't exist`);
        return res.render('lookup', {message: `User not found in Database`});
    }

    console.log(user);
    res.status(200).render('lookup', {pageTitle: 'Look up form' });
}

//Go to the edit page
exports.editg = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    res.status(200).render('editdetails', {pageTitle: 'Edit form' });
}


//Code for the signup page
exports.editp = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userOld = await User.findOne({ email: req.body.email });
    if(!userOld) {
        console.log(`An error occurred - User not found`);
        return res.render('editdetails', {message: `Edit user details`});
    }
    //User Creation
    const { name, email, age, balance, accounttype } = req.body;
    const editUser = new User({
        name: name,
        email: email,
        age: age,
        account: {
            balance: balance,
            accountType: accounttype,
        }
    });

    editUser.validate()
            .then(() => console.log('Changes verified successfully'))
            .catch((err) => console.error(err));
            
    User.findOneAndUpdate({ email: req.body.email }, 
        { name: req.body.name, email: req.body.email, age: req.body.age, 
            account: { balance: req.body.balance, accountType: req.body.accounttype } })
        .then(() => console.log('User details saved successfully'))
        .catch((err) => console.error(err));
    
        res.render('home', {pageTitle: 'Home Page' });
};

//Go to the delete lookup page
exports.deleteg = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    res.status(200).render('delete', {pageTitle: 'Delete a record' });
}

//Code for the signup page
exports.deletep = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        //Look up user by email field, delete if found, otherwise post error
        User.deleteOne({ email: req.body.email })
            .then(() => console.log('User details deleted successfully'))
            .catch((err) => console.error(err));
    
        res.render('home', {pageTitle: 'Home Page' });
};