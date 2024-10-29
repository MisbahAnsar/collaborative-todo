const User = require('../models/userSchema')
const generateToken = require('../utils/generatetoken');

const signupUser = async(req,res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        return res.status(400).json({
            message: 'User Already Exists'
        })
    }

    const newUser = await User.create({ username, email, password })

    if(User){
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            token: generateToken(newUser._id)
        });
    } else {
        res.status(400).json({
            message: "Invalid data, please try again!"
        })
    }
};

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword( password ))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({
            message: "Invalid username or password"
        })
    }
}

module.exports = {signupUser, loginUser}