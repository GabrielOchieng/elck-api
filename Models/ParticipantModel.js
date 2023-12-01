const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
	profilepic: {
		type: String,
	},
	participantno: {
		type: Number,
		required: [true, "Participant Number is required"],
		unique: true,
	},
	username: {
		type: String,
		required: [true, "Username is required"],
	},
	age: {
		type: Number,
		required: [true, "age is required"],
	},
	residence: {
		type: String,
	},
	caregiver: {
		type: String,
		required: [true, "Caregiver's name is required"],
	},
	contact: {
		type: Number,
	},
	pdf: {
		type: Number,
	},
});

module.exports = mongoose.model("Participant", participantSchema);
