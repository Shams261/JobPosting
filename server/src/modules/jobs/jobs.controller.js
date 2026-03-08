import {
  createJob,
  deleteJobById,
  getJobById,
  listJobs
} from "./jobs.service.js";
import { validateCreateJobPayload } from "./jobs.validator.js";

export function getAllJobs(req, res) {
  const search = req.query.search ?? "";
  const jobs = listJobs(search);
  return res.json(jobs);
}

export function getJobDetails(req, res) {
  const job = getJobById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found." });
  }

  return res.json(job);
}

export function postJob(req, res) {
  const { isValid, errors, value } = validateCreateJobPayload(req.body ?? {});

  if (!isValid) {
    return res.status(400).json({
      message: "Validation failed.",
      errors
    });
  }

  try {
    const newJob = createJob(value);
    return res.status(201).json(newJob);
  } catch (error) {
    return res.status(500).json({ message: "Failed to save the new job post." });
  }
}

export function removeJob(req, res) {
  try {
    const deletedJob = deleteJobById(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.json({
      message: "Job deleted successfully.",
      deletedJob
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to persist deletion." });
  }
}
