import { Homepage } from "../models/model.js"
export async function homePageController(req, res) {

    try {
        const homepage = await Homepage.findOne({})
        res.status(200).json({ homepage })
    }
    catch (err) {
        res.sendStatus(500)
    }
}