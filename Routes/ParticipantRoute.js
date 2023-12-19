const express = require("express");
const router = express.Router();
const multer = require("multer");
const ParticipantController = require("../Controllers/ParticipantsController.js");
const AuthController = require("../Controllers/AuthController.js");

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
router.route("/").get(ParticipantController.getAllParticipants).post(
	upload.single("profilepic"),
	// AuthController.restrictTo("admin", "director"),
	ParticipantController.createNewParticipant
);

router
	.route("/:id")
	.put(
		upload.single("profilepic"),
		// AuthController.restrictTo("admin", "director"),
		ParticipantController.updateParticipant
	)
	.delete(
		// AuthController.restrictTo("admin", "director"),
		ParticipantController.deleteParticipant
	);

module.exports = router;
