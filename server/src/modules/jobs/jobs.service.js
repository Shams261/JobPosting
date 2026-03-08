import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { JOBS_DATA_FILE_PATH } from "../../config/paths.js";

let jobsStore = [];

function readJobsFromDisk() {
  try {
    const raw = fs.readFileSync(JOBS_DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read jobs data:", error.message);
    return [];
  }
}

function writeJobsToDisk() {
  fs.writeFileSync(JOBS_DATA_FILE_PATH, JSON.stringify(jobsStore, null, 2));
}

export function initializeJobsStore() {
  jobsStore = readJobsFromDisk();
}

export function listJobs(searchQuery = "") {
  const normalizedQuery = String(searchQuery).trim().toLowerCase();

  if (!normalizedQuery) {
    return jobsStore;
  }

  return jobsStore.filter((job) =>
    String(job.title).toLowerCase().includes(normalizedQuery)
  );
}

export function getJobById(id) {
  return jobsStore.find((job) => job.id === id) ?? null;
}

export function createJob(jobPayload) {
  const newJob = {
    id: uuidv4(),
    ...jobPayload
  };

  jobsStore.push(newJob);
  writeJobsToDisk();

  return newJob;
}

export function deleteJobById(id) {
  const index = jobsStore.findIndex((job) => job.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedJob] = jobsStore.splice(index, 1);
  writeJobsToDisk();
  return deletedJob;
}
