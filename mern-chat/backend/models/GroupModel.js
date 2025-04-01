const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const groupSchema = new monggose.Schema({
    name: {
        type: String,
        required: true,
        trim :true,
    },
    description: {
        type: String,
        required: true,
    
    },
    members: [
        {tpe: mongoose.Schema.Types.ObjectId , ref : "User"} ],
        admin :{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },



}, {
    timestamps : true,
}

);

//method

const Group = mongoose.model("Group", groupSchema);

module.exports =Group;