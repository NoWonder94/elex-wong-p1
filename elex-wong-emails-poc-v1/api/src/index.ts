/**
 * Required External Modules
 */
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
/**
 *  App Configuration
 */
var whitelist = ['http://localhost:63342', 'http://127.0.0.1:8080']
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

//app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/", itemsRouter);

app.use(errorHandler);
app.use(notFoundHandler);
/**
 * Server Activation
 */
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
