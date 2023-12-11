const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
	photo: {
		type: String,
	},
	description: {
		type: String,
	},
});

module.exports = mongoose.model("Photo", photoSchema);
