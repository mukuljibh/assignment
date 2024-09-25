import { User } from "../models/model.js"
export async function avatarUpdateController(req, res) {
    const { image, email } = req.body
    if (!image.imageUrl || !image) res.status(400).json({ msg: "imageUrl is empty   " })
    try {
        // this controller just updating the property of the object which we find using their email
        // email are set as unique so only one entry is being return always
        await User.updateOne(
            { email: email },
            { $set: { "imageUrl": image.imageUrl } })

        res.status(200).json({ msg: "successfully store in database" })
    }
    catch (err) {
        res.status(500).json({ msg: "problem while storing image in database" })
    }
}

export async function profileUpdateController(req, res) {
    const { name, email, oldEmail } = req.body
    //this controller again update some part info so based on oldEmail we will find the object 
    //and update that
    try {
        await User.updateOne(
            { email: oldEmail },
            { $set: { "email": email, "name": name } })

        res.status(200).json({ msg: "successfully updated" })
    }
    catch (err) {
        res.status(500).json({ msg: "problem while updating profile in database" })
    }

}