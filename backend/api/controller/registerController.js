import { User } from "../models/model.js";
import bcrypt from 'bcrypt'

export async function registercontroller(req, res) {
    const { name, email, password, imageUrl } = req.body
    try {
        const encPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            imageUrl,
            email,
            password: encPassword
        })

        res.status(201).json({ user });
    }
    catch (error) {
        if (error.code === 11000 && error.keyValue) {
            const duplicateFields = Object.keys(error.keyValue)[0];
            return res.status(409)
                .json({ error: `${duplicateFields} already registered with us.` });
        }
        res.sendStatus(500)
    }
}