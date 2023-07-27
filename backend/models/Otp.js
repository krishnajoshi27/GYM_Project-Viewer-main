const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
	email:String,
    code:String,
    expireIn :Number
});

module.exports = mongoose.model("otp", otpSchema);