import { Homepage } from "../models/model.js"

// this route is fetching some data inside our homepage 
//i already provide some bunch of product info inside the db (homepage model) .
//verify token middle is applied here 
export async function homePageController(req, res) {

    try {
        const homepage = await Homepage.findOne({})
        res.status(200).json({ homepage })
    }
    catch (err) {
        res.sendStatus(500)
    }
}