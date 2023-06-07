/* IMPORTS */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

/* ROUTES IMPORT */
import authRoutes from "./routes/auth.js";
import stationRoutes from "./routes/stations.js";
import ticketRoutes from "./routes/tickets.js";
import trainLinesRoutes from "./routes/trainLines.js";
import issueRoutes from "./routes/issues.js";
import infoBoardsRoutes from "./routes/infoBoards.js";

/* MODELS*/
import User from "./models/User.js";

/* SETUP */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/stations", stationRoutes);
app.use("/tickets", ticketRoutes);
app.use("/trainlines", trainLinesRoutes);
app.use("/issues", issueRoutes);
app.use("/info-boards", infoBoardsRoutes);

/* MONGO CONNECTION */
const PORT = process.env.PORT || 7001;

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
