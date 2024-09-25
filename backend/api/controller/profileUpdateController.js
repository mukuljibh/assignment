import { User } from "../models/model.js"
export async function avatarUpdateController(req, res) {
    const { image, email } = req.body
    if (!image.imageUrl || !image) res.status(400).json({ msg: "imageUrl is empty   " })
    try {
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