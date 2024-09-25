import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
        unique: true
    },
    imageUrl: {
        type: String,
    },
    password: {
        type: String
    },

});
const tokenSchema = new mongoose.Schema({
    email: { type: String, },
    token: {
        type: String,
    },
});

const homepageSchema = new mongoose.Schema({
    banner: {
        imageUrl: String,
        link: String,
    },
    products: [{
        id: Number,
        name: String,
        description: String,
        price: Number,
        imageUrl: String,
    }]
})

const User = mongoose.model(
    "User",
    userSchema,
);
const Token = mongoose.model(
    "token",
    tokenSchema,
);
const Homepage = mongoose.model(
    "homepage",
    homepageSchema,
)



export { User, Token, Homepage };