const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const { z } = require('zod');

const userValidation = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8).max(40),
    profilePicture: z.string().url().optional(),
    bio: z.string().min(10).max(100),
});


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
    profilePicture: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
},{ timestamps: true });

UserSchema.pre('save', function (next) {
    const validationResult = userValidation.safeParse(this.toObject());
    
    if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(e => e.message).join(", ");
        return next(new Error(errorMessages));
    }
    next();
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
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
