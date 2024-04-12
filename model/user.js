const { type } = require('express/lib/response');
const db = require('./db');

const userSchema = new db.mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    phone:{type:Number},
    avatar: { type: String, require: true },
    password: { type: String, require: true },
}, {
    collection: "users",
});

let userModel = db.mongoose.model("userModel", userSchema);

module.exports = { userModel }