import mongoose from "mongoose";

const BasketballChatSchema = new mongoose.Schema({
    author: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
});

const basketballChats = mongoose.model("basketballChats", BasketballChatSchema);

export default basketballChats;