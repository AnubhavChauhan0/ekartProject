import CustomError from "../utils/ApiResponse.utils.js"

export const validate = (schema)=>{
    return (req,res,next)=>{
        const {error, value} = schema.validate(req.body,{abortEarly: false});

        if(error){
            next(new CustomError(400,`${error.details.map((ele)=> ele.message).join(", ")}`))
        }
        req.body = value;
        next()
    }
}