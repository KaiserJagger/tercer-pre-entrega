import mongoose from "mongoose";
const userCollection = "users";

const cartSchema = new mongoose.Schema(
    {
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts",
            require: true,
        },
    },
    { _id: false }
);

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
    },
    cart: {
        type: cartSchema,
        default: null,
    },
});
mongoose.set("strictQuery", false);

//export const userModel = mongoose.model(userCollection, userSchema);
export default {userCollection, userSchema};

