import mongoose from "mongoose";
const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    purchased_products: {
        type: Array,
        required: true,
        default: [],
    },
});

mongoose.set("strictQuery", false);

//export const userModel = mongoose.model(userCollection, userSchema);
export default { ticketCollection, ticketSchema };