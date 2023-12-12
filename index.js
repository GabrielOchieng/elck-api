const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const compression = require("compression");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const ParticipantRoute = require("./Routes/ParticipantRoute");
const photosRoute = require("./Routes/PhotosRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB is  connected successfully"))
	.catch((err) => console.error(err));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

app.use(compression());

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			//  "https://elck-cdc.onrender.com"
		],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(cookieParser());

app.use(express.json());

app.use("/users", authRoute);
app.use("/participants", ParticipantRoute);
app.use("/photos", photosRoute);
