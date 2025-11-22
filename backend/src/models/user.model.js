//! username, email, password, role, contactNumber

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import crypto from "crypto";


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: "user",
        },
        contactNumber: {
            type: String,
            required: true,
            unique: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        //! for email
        emailVerificationToken:{
            type: String,
        },
        emailVerificationTokenExpiry:{
            type: Date,
        },

        //! for password
        passwordResetToken:{
            type: String,
        },
        passwordResetTokenExpiry:{
            type: Date,
        }
    },
    { 
        timestamps: true, 
        toJSON: {
            transform(doc,ret){
            console.log("toJSON called");
            delete ret.password;
            delete ret.__v;

            //TODO change _id  to id while displaying
            ret.id = ret._id;
            delete ret._id;
        }
    }, 
        toObject: {
            transform(doc, ret){
            console.log("toObject called");
            delete ret.password;
            delete ret.__v;

            //TODO change _id  to id while displaying
            ret.id = ret._id;
            delete ret._id;
        }
    }
 }
);

userSchema.pre("save", async function (next) {
    
    //#  this if block will only execute when the modified field is  password
    if (!this.isModified("password")) return next();

    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.genereateEmailVerificationToken = function(){
    const randomBytes = crypto.randomBytes(32).toString("hex");

    this.emailVerificationToken = crypto
        .createHash("sha256")
        .update(randomBytes)
        .digest("hex");

    this.emailVerificationTokenExpiry = Date.now() + 10 * 60 * 1000;
    return randomBytes;
};

userSchema.methods.genereatePasswordResetToken = function(){
    const randomBytes = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(randomBytes)
        .digest("hex");

    this.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000;
    return randomBytes;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;


//? 1) while registering , a token is generated and that token is sent to the client's mail
//? 2) in backend , a same token is hashed using some process, and that hashed token is saved in database
//? 3) when client will click on the verfication link, in the url there will be un-hashed token willbe present, we will extract the token , and extracted token is hashed using same process
//? 4) after that the hashed token is checked in database, if it matches, then we will update the verified filed 