const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
} ,{
    timestamps:true
})

const authModel = mongoose.model("User", authSchema)
module.exports = authModel