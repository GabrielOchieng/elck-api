const express = require("express");
const Photo = require("../Models/PhotoModel.js");
const multer = require("multer");

// Route for Save a new Photo
// router.post("/", upload.single("image"),
const createNewPhoto = async (request, response) => {
	try {
		// if (!request.body.image || !request.body.description) {
		// 	return response.status(400).send({
		// 		message: "Send all required fields: image, description",
		// 	});
		// }
		const newPhoto = {
			image: request.file.originalname,
			description: request.body.description,
		};

		const photo = await Photo.create(newPhoto);

		return response.status(201).send(photo);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Route for Get All Photos from database
// router.get("/",
const getAllPhotos = async (request, response) => {
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
};

// Route for Get One Photo from database by id
// router.get("/:id",
const getOnePhoto = async (request, response) => {
	try {
		const { id } = request.params;

		const photo = await Photo.findById(id);

		return response.status(200).json(photo);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Route for Update a Photo
// router.put("/:id", upload.single("image"),
const updatePhoto = async (request, response) => {
	try {
		if (!request.body.image || !request.body.description) {
			return response.status(400).send({
				message: "Send all required fields: image, description",
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
};

// Route for Delete a photo
// router.delete("/:id",
const deletePhoto = async (request, response) => {
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
};

const restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new Error("You do not have permission to perform this action", 403)
			);
		}
		next();
	};
};

module.exports = {
	getAllPhotos,
	getOnePhoto,
	createNewPhoto,
	updatePhoto,
	deletePhoto,
	restrictTo,
};
