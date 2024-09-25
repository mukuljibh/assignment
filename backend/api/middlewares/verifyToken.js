/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { Token } from '../models/model.js'
export function createAccessToken(email) {
    return jwt.sign({ user: email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15s' })
}

//this middle ware is used for check token are valid or not

export async function verifyToken(req, res, next) {
    try {
        // token are store inside cookies, client send cookies on each api request
        const { accessToken, refreshToken } = req.cookies
        //for making it seemingless experience  i use two token refresh and access token
        // if access token expires backend automaticaly generate new access token without intrupting the client
        // issue of  access token only  takes place if refresh token is valid or it available in DB
        //i am storing refresh token on db we can store refresh token in hashes also inside DB
        //when the user hit the logout route refresh token automatically remove from the db
        // now even though access and refresh token are valid this middleware wont allow to access route now 
        //because it is not in the DB

        // here in this line we are checking in DB
        const token = await Token.find({ token: { $eq: refreshToken } })
        if (token.length == 0) return res.sendStatus(401)
        //first check whther refresh token is valid or not
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, function (err, decoded) {
            if (err) return res.sendStatus(401)
            //now verify access token if it is valid then no problem
            // when it is not silently we genrate and send to the client
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, function (err) {
                if (err) {
                    console.log("new acces token created")
                    const accessToken = createAccessToken(decoded.user)
                    res.cookie("accessToken", accessToken, { maxAge: 150000, httpOnly: true, secure: true, sameSite: 'strict' })
                }
            })
            next()
        });
    }
    catch (err) {
        res.sendStatus(501)
    }

}