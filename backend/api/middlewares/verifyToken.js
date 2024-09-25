/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { Token } from '../models/model.js'
export function createAccessToken(email) {
    return jwt.sign({ user: email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15s' })
}

export async function verifyToken(req, res, next) {
    try {
        const { accessToken, refreshToken } = req.cookies

        const token = await Token.find({ token: { $eq: refreshToken } })
        if (token.length == 0) return res.sendStatus(401)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, function (err, decoded) {
            if (err) return res.sendStatus(401)

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