const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const compression = require("compression");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const ParticipantRoute = require("./Routes/ParticipantRoute");
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

// app.use(function (req, res, next) {
// 	res.setHeader("Access-Control-Allow-Origin", "https://elck-cdc-website-front.vercel.app");
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
// 	);
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"X-Requested-With,content-type"
// 	);
// 	res.setHeader("Access-Control-Allow-Credentials", true);
// 	next();
// });

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

// app.use(cors());
// app.options("https://elck-cdc-website-front.vercel.app", cors());
// app.use(
// 	cors({
// 		origin: [
// 			// "http://localhost:3000",
// "https://elck-cdc-website-front.vercel.app",
// 		],
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		credentials: true,
// 	})
// );

app.use(cookieParser());

app.use(express.json());

app.use("/users", authRoute);
app.use("/participants", ParticipantRoute);
