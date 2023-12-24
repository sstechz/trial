import mongoose from "mongoose";

const BadmintonChatSchema = new mongoose.Schema({
    author: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
});

const badmintonChats = mongoose.model("badmintonChats", BadmintonChatSchema);

export default badmintonChats;