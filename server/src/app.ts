import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import { apiLimiter } from "./middleware/rateLimiter";
import { AppError } from "./utils/AppError";
import authRoute from './modules/auth/routes/routes'
import schoolRoute from './modules/school/routes/school.routes'
import classRoute from './modules/academic/routes/class.routes'
import studentRoute from './modules/academic/routes/student.route'
import teacherRoutes from './modules/academic/routes/teacher.routes'
import attendanceRoutes from "./modules/attendance/routes/attendance.routes";
import activityRoutes from "./modules/activity/routes/activity.routes";
import uploadRoutes from "./modules/upload/router/upload.routes";
import parentRoutes from './modules/parent/routes/parent.routes'
import monitorRoutes from './modules/monitor/routes/monitor.routes'


const app: Application = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger); 
app.use("/api", apiLimiter); 
app.use("/api/auth",authRoute)
app.use("/api/school",schoolRoute)
app.use("/api/class",classRoute)
app.use("/api/student",studentRoute)
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/parent", parentRoutes);
app.use("api/monitor",monitorRoutes)


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;