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

// app.use(cors());

// app.use(
// 	cors({
// 		origin: [
// 			// "http://localhost:3000",
// 			"https://elck-cdc.onrender.com/",
// 		],
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		credentials: true,
// 	})
// );

// using proxy to overcome cors issues
const apiProxy = createProxyMiddleware("/api", {
	target: "https://elck-cdc.onrender.com/",
	changeOrigin: true,
});

// Telling the app to use the proxy
// middleware for the path /api
app.use("/api", apiProxy);

app.use(cookieParser());

app.use(express.json());

app.use("/users", authRoute);
app.use("/participants", ParticipantRoute);
