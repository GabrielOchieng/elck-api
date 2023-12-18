const express = require("express");
const router = express.Router();
const multer = require("multer");
const PhotoController = require("../Controllers/PhotosController");

// MULTER IMAGE UPLOAD
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "../frontend/public/photosdes/");
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	},
});

const upload = multer({ storage: storage });
router
	.route("/")
	.get(PhotoController.getAllPhotos)
	.post(
		upload.single("image"),
		PhotoController.restrictTo("admin"),
		PhotoController.updatePhoto
	)
	.put(
		upload.single("image"),
		PhotoController.restrictTo("admin"),
		PhotoController.updatePhoto
	)
	.delete(PhotoController.restrictTo("admin"), PhotoController.deletePhoto);

module.exports = router;
