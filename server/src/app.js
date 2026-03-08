import express from "express";
import cors from "cors";
import jobsRouter from "./modules/jobs/jobs.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/jobs", jobsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

export default app;
