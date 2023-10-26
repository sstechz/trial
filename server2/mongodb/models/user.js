import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    s_id: {type: String, required: true},
    dp: {type: String, required: true},
});

const users = mongoose.model("users", UserSchema);

export default users;
