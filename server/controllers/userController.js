const User = require('../models/userSchema')
const generateToken = require('../utils/generatetoken');

const signupUser = async(req,res) => {
    //destructuring here
    const { username, email, password, profilePicture, bio } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        return res.status(400).json({
            message: 'User Already Exists'
        })
    }

    console.log("hey wassup meow");

    const newUser = await User.create({ username, email, password, profilePicture, bio})
    const savedUser = await User.findById(newUser._id).select("-password");

    if(newUser){
        res.status(201).json({
            message: "User created successfully",
            user: savedUser,
        });
    } else {
        res.status(400).json({
            message: "User ID or email already exists"
        })
    }
};

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword( password ))){
        res.status(201).json({
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