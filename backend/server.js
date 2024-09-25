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
import { logoutController } from './api/controller/LogoutController.js';
import { homePageController } from './api/controller/homePageController.js';
dotenv.config({ path: ".env" });

const app = express()
const port = 3000

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())




app.post('/api/register', registercontroller)
app.post('/api/login', loginController)

app.patch('/api/profile/avatar', verifyToken, avatarUpdateController)
app.put('/api/profile/avatar', profileUpdateController)


app.post('/logout', verifyToken, logoutController)


app.get('/api/homepage', verifyToken, homePageController)



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

