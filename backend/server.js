/* eslint-disable no-undef */
import express from 'express'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import cors from "cors";
import { verifyToken } from './api/middlewares/verifyToken.js';
import { registercontroller } from './api/controller/registerController.js';
import { loginController } from './api/controller/loginController.js';
import { avatarUpdateController, profileUpdateController } from './api/controller/profileUpdateController.js';
import { logoutController } from './api/controller/logoutController.js';
import { homePageController } from './api/controller/homePageController.js';
dotenv.config({ path: ".env" });

const app = express()
const port = 3000

// as client and server runing on differnt port we have to use cors package so that comunication between client and server
//can be established

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

//this are all the end points
app.post('/api/register', registercontroller)
app.post('/api/login', loginController)

app.patch('/api/profile/avatar', verifyToken, avatarUpdateController)
app.put('/api/profile/avatar', verifyToken, profileUpdateController)


app.post('/logout', verifyToken, logoutController)


app.get('/api/homepage', verifyToken, homePageController)


//connection to the database
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        app.listen(port, () => {
            console.log(`server Started runing on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
        console.log(`Database unreachable`);
    });

