/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { User, Token } from "../models/model.js"
import bcrypt from 'bcrypt'
import { createAccessToken } from "../middlewares/verifyToken.js"
export async function loginController(req, res) {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (!user) return res.sendStatus(404)
        const match = bcrypt.compare(password, user.password)

        if (!match) return res.sendStatus(401)

        // in this login route only iam  generating  access and refresh
        const accessToken = createAccessToken(email)
        // for testing refresh token expiry 30 s and access token expiration 20s
        const refreshToken = jwt.sign({ user: email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '30s' })
        // in this route token are getting stored inside the DB for now i am storing them without hashing 
        await Token.create({ email, token: refreshToken })

        //we can change cookies option as per our requirement
        const options = {
            maxAge: 5000000, httpOnly: true, secure: true, sameSite: 'strict'
        }
        // attaching cookies to the res object
        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)
        res.status(200).json({ msg: "authorized", details: { name: user.name, imageUrl: user.imageUrl, email: user.email } })

    }
    catch (err) {

        res.sendStatus(500)
    }

}
