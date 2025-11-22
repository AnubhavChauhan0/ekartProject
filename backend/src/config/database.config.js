import mongoose from "mongoose";

export const connectDB = async()=>{
    let client = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database Connected to ${client.connection.host}` );
    
}