const express = require("express");
const Photo = require("../Models/PhotoModel.js");
const multer = require("multer");
const router = express.Router();
const sharp = require("sharp");

// const multerStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "public/uploads/photos");
// 	},
// 	filename: (req, file, cb) => {
// 		const ext = file.mimetype.split("/")[1];
// 		cb(null, `photo-${req.photo.id}-${Date.now()}.${ext}`);
// 	},
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("Not an image, please only upload images", false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

const resizeUserPhoto = (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `photo-${req.photo.id}-${Date.now()}.jpeg`;

	sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`public/uploads/photos/${req.file.filename}`);

	next();
};

// Route for Save a new Photo
router.post("/", upload.single("photo"), async (request, response) => {
	try {
		if (!request.body.photo || !request.body.description) {
			return response.status(400).send({
				message: "Send all required fields: photo, description",
			});
		}
		const newPhoto = {
			photo: request.file.originalname,
			description: request.body.description,
		};

		const photo = await Photo.create(newPhoto);

		return response.status(201).send(photo);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Route for Get All Photos from database
router.get("/", async (request, response) => {
	try {
		const photos = await Photo.find({});

		return response.status(200).json({
			count: photos.length,
			data: photos,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Route for Get One Photo from database by id
router.get("/:id", async (request, response) => {
	try {
		const { id } = request.params;

		const photo = await Photo.findById(id);

		return response.status(200).json(photo);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Route for Update a Photo
router.put("/:id", upload.single("photo"), async (request, response) => {
	try {
		if (!request.body.photo || !request.body.description) {
			return response.status(400).send({
				message: "Send all required fields: photo, description",
			});
		}

		const { id } = request.params;

		const result = await Photo.findByIdAndUpdate(id, request.body);

		if (!result) {
			return response.status(404).json({ message: "Photo not found" });
		}

		return response.status(200).send({ message: "Photo updated successfully" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Route for Delete a photo
router.delete("/:id", async (request, response) => {
	try {
		const { id } = request.params;

		const result = await Photo.findByIdAndDelete(id);

		if (!result) {
			return response.status(404).json({ message: "Photo not found" });
		}

		return response.status(200).send({ message: "Photo deleted successfully" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

module.exports = router;
