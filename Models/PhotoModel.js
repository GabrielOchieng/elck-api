const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
	image: {
		type: String,
	},
	description: {
		type: String,
	},
});

module.exports = mongoose.model("Photo", photoSchema);
