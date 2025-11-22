import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.utils.js";
import expressAsyncHandler from "express-async-handler";

export  const authenticate = expressAsyncHandler(async (req,res,next)=>{
    let token = req?.cookies?.token //. optional chaining 
    if(!token){
        next(new CustomError(401,"Not authorized to access this route"))
    };
    let decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    //! {id:"", iat: timestamp, exp: timestamp}

    let user = await UserModel.findById(decodedToken.id);
    if(!user) next(new CustomError(401, "Invalid Session, Please login again"))

    req.myUser = user;
    next();

})

// let req = {
//     body:{},
//     cookies:{},
//     myUser:{}
// }