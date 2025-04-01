const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const messageSchema = new monggose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",

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

const Message = mongoose.model("Messsage", messageSchema);

module.exports =Message;