import mongoose from "mongoose";

const CricketChatSchema = new mongoose.Schema({
    author: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
});

const cricketChats = mongoose.model("cricketChats", CricketChatSchema);

export default cricketChats;