import { Token } from "../models/model.js"
export async function logoutController(req, res) {
    const { refreshToken } = req.cookies
    try {
        await Token.deleteOne({ token: refreshToken })
        //console.log(token)    
        res.sendStatus(200)
    }
    catch (err) {
        res.sendStatus(500)
    }

}