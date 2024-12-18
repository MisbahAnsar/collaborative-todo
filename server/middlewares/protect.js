const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

exports.protect = async(req, res, next)=>{
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try{
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      req.user = await User.findOne({ username: decoded.username}).select('-password')
      
      next();
    }catch(error){
      res.status(401).json({
        message: 'Not authorized, token failed'
      });
    }
  }

  if(!token){
    res.status(401).json({
      message: 'Not authorized, no token'
    })
  }
}