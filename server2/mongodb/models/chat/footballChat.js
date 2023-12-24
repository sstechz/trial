import mongoose from "mongoose";

const FootballChatSchema = new mongoose.Schema({
    author: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
});

const footballChats = mongoose.model("footballChats", FootballChatSchema);

export default footballChats;