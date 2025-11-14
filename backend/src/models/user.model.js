//! username, email, password, role, contactNumber,

import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    contactNumber:{
        type:String,
        required:true,
        unique:true
    },
    isverified:{
        type:Boolean,
        required:true,
        default:false
    }
});

let userModel = mongoose.model("User",userSchema);

export default userModel;