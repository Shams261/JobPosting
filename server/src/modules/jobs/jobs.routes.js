import { Router } from "express";
import {
  getAllJobs,
  getJobDetails,
  postJob,
  removeJob
} from "./jobs.controller.js";

const jobsRouter = Router();

jobsRouter.get("/", getAllJobs);
jobsRouter.get("/:id", getJobDetails);
jobsRouter.post("/", postJob);
jobsRouter.delete("/:id", removeJob);

export default jobsRouter;
