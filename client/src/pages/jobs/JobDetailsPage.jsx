import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { jobsApi } from "../../api/jobsApi";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobsApi.getById(id);
        setJob(response.data);
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to load job details."));
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" aria-hidden="true"></div>
        <p className="mt-3 mb-0">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <section>
        <h1 className="details-title mb-4">Job Details</h1>
        <div className="alert alert-light border">Job not found.</div>
        <Link to="/" className="btn btn-outline-primary">
          Back to Job Listings
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="details-title">{job.title}</h1>

      <article className="card details-card mt-4">
        <div className="card-body p-4 p-md-5">
          <p>
            <strong>Company Name:</strong> {job.company}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Salary:</strong> ${Number(job.salary).toLocaleString("en-US")}
          </p>
          <p>
            <strong>Job Type:</strong> {job.type}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
          <div>
            <strong>Qualifications:</strong>
            <ol className="mt-2 mb-0">
              {(Array.isArray(job.qualifications) ? job.qualifications : []).map(
                (qualification, index) => (
                  <li key={`${qualification}-${index}`}>{qualification}</li>
                )
              )}
            </ol>
          </div>
        </div>
      </article>
    </section>
  );
}
