import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./connections/connectMongo.js";
import authRoutes from "./routes/AuthRouter.js";
import agencyRoutes from "./routes/routes.js";

dotenv.config({ path: "./env" });

const app = express();

app.use(express.json());

app.use(cors());

dbConnection();

app.use("/", authRoutes);
app.use("/", agencyRoutes);

export default app;
