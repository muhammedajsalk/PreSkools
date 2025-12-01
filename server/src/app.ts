import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import { apiLimiter } from "./middleware/rateLimiter";
import { AppError } from "./utils/AppError";
import authRoute from './modules/auth/routes/routes'


const app: Application = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger); 
app.use("/api", apiLimiter); 
app.use("/api/auth",authRoute)


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;