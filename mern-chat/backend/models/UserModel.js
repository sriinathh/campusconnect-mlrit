const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new monggose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default : false,
    },


}, {
    timestamps : true,
}

);

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);

});

//method

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);

};
const User = mongoose.model('User', userSchema);
module.exports =User;