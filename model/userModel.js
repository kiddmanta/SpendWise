const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type: String,
        required : [true,'Email is required'],
        unique : true,
        validate: [ validator.isEmail, 'invalid email' ]
    },
    password : {
        type : String,
        required : [true,'Password is required']
    }
},{timestamps:true}
);

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email", 
    hashField : "password"
});


module.exports = mongoose.model("User",userSchema);