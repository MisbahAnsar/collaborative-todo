const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
// User Schema
const UserSchema = new mongoose.Schema(
  {
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },
    
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    
    password: { 
        type: String, 
        required: true 
    },
},{ timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next(); // Skip hashing if password is not modified
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next()
    } catch(err){
        next(err)
    }
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema);
