import "dotenv/config";
import app from "./app.js";
import { initializeJobsStore } from "./modules/jobs/jobs.service.js";

const PORT = Number(process.env.PORT) || 3001;

initializeJobsStore();

app.listen(PORT, () => {
  console.log(`Job Posting API running on port ${PORT}`);
});
