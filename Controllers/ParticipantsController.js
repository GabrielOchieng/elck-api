const express = require("express");
const Participant = require("../Models/ParticipantModel.js");
const multer = require("multer");

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

// Route for Save a new Participant
// router.post("/", upload.single("profilepic"),
const createNewParticipant = async (request, response) => {
	try {
		if (
			!request.body.username ||
			!request.body.age ||
			!request.body.caregiver ||
			!request.body.participantno ||
			!request.body.contact
		) {
			return response.status(400).send({
				message: "Send all required fields: title, author, publishYear",
			});
		}
		const newParticipant = {
			profilepic: request.file.originalname,
			username: request.body.username,
			participantno: request.body.participantno,
			age: request.body.age,
			caregiver: request.body.caregiver,
			contact: request.body.contact,
			pdf: request.body.pdf,
			residence: request.body.residence,
		};

		const participant = await Participant.create(newParticipant);

		return response.status(201).send(participant);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Route for Get All Participants from database
// router.get("/",
const getAllParticipants = async (request, response) => {
	try {
		const participants = await Participant.find({});

		return response.status(200).json({
			count: participants.length,
			data: participants,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Route for Get One Participant from database by id
// router.get("/:id",
const getOneParticipant = async (request, response) => {
	try {
		const { id } = request.params;

		const participant = await Participant.findById(id);

		return response.status(200).json(participant);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Route for Update a Participant
// router.put("/:id", upload.single("profilepic"),
const updateParticipant = async (request, response) => {
	try {
		if (
			!request.body.username ||
			// !request.body.dateOfBirth ||
			!request.body.caregiver ||
			!request.body.residence
		) {
			return response.status(400).send({
				message:
					"Send all required fields: username, DateofBirth, caregiver, Contact",
			});
		}

		const { id } = request.params;

		const result = await Participant.findByIdAndUpdate(id, request.body);

		if (!result) {
			return response.status(404).json({ message: "Participant not found" });
		}

		return response
			.status(200)
			.send({ message: "Participant updated successfully" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Route for Delete a participant
// router.delete("/:id",
const deleteParticipant = async (request, response) => {
	try {
		const { id } = request.params;

		const result = await Participant.findByIdAndDelete(id);

		if (!result) {
			return response.status(404).json({ message: "Participant not found" });
		}

		return response
			.status(200)
			.send({ message: "Participant deleted successfully" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

module.exports = {
	getAllParticipants,
	getOneParticipant,
	createNewParticipant,
	updateParticipant,
	deleteParticipant,
};
