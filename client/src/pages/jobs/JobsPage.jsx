import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import JobCard from "../../components/jobs/JobCard";
import { jobsApi } from "../../api/jobsApi";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingJobId, setDeletingJobId] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsApi.getAll();
        setJobs(response.data);
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to load jobs."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const loweredTerm = searchTerm.trim().toLowerCase();

    if (!loweredTerm) {
      return jobs;
    }

    return jobs.filter((job) =>
      String(job.title).toLowerCase().includes(loweredTerm)
    );
  }, [jobs, searchTerm]);

  const handleDelete = async (jobId) => {
    setDeletingJobId(jobId);

    try {
      await jobsApi.remove(jobId);
      setJobs((currentJobs) => currentJobs.filter((job) => job.id !== jobId));
      toast.success("Job post deleted successfully.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete the job post."));
    } finally {
      setDeletingJobId("");
    }
  };

  return (
    <section>
      <div className="mb-4">
        <input
          type="search"
          className="form-control jobs-search"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search by job title"
        />
      </div>

      <h1 className="jobs-title">All Jobs</h1>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" aria-hidden="true"></div>
          <p className="mt-3 mb-0">Loading jobs...</p>
        </div>
      ) : null}

      {!isLoading && filteredJobs.length === 0 ? (
        <div className="alert alert-light border" role="status">
          No jobs found for your search.
        </div>
      ) : null}

      {!isLoading && filteredJobs.length > 0 ? (
        <div className="row g-4">
          {filteredJobs.map((job) => (
            <div className="col-12 col-md-6 col-xl-4" key={job.id}>
              <JobCard
                job={job}
                onDelete={handleDelete}
                isDeleting={deletingJobId === job.id}
              />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
