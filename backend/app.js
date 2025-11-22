import dotenv from "dotenv";
dotenv.config({quiet:true});

import express from "express";
import { errorMiddleware } from "./src/middlewares/error.middlesware.js";
import userRoutes from "./src/routes/user/user.routes.js"
import addressRoutes from "./src/routes/shop/address.routes.js"
import cookieParser from "cookie-parser";



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use("/api/user", userRoutes);

app.use("/api/address", addressRoutes);

app.use(errorMiddleware)
export default app;
