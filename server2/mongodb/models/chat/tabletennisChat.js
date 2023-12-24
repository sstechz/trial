import mongoose from "mongoose";

const TabletennisChatSchema = new mongoose.Schema({
    author: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
});

const tabletennisChats = mongoose.model("tabletennisChats", TabletennisChatSchema);

export default tabletennisChats;