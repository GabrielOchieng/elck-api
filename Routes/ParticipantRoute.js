const express = require("express");
const router = express.Router();
const multer = require("multer");
const ParticipantController = require("../Controllers/ParticipantsController.js");

// MULTER IMAGE UPLOAD
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "../frontend/public/uploads/");
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	},
});
const upload = multer({ storage: storage });
router
	.route("/")
	.get(ParticipantController.getAllParticipants)
	.post(
		upload.single("profilepic"),
		ParticipantController.restrictTo("admin"),
		ParticipantController.createNewParticipant
	)
	.put(
		upload.single("profilepic"),
		ParticipantController.restrictTo("admin"),
		ParticipantController.updateParticipant
	)
	.delete(
		ParticipantController.restrictTo("admin"),
		ParticipantController.deleteParticipant
	);

module.exports = router;
