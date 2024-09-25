import { Token } from "../models/model.js"
export async function logoutController(req, res) {
    const { refreshToken } = req.cookies
    try {
        //  when this route is hited we just delete the token from the database now user must have to login again wther token are valid
        //or not
        await Token.deleteOne({ token: refreshToken })
        res.sendStatus(200)
    }
    catch (err) {
        res.sendStatus(500)
    }

}