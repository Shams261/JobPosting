import { Link } from "react-router-dom";

export default function JobCard({ job, onDelete, isDeleting }) {
  return (
    <article className="card h-100 job-card">
      <div className="card-body d-flex flex-column p-4">
        <h3 className="job-card-title">{job.title}</h3>

        <p className="job-card-line">
          <strong>Company name:</strong> {job.company}
        </p>
        <p className="job-card-line">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="job-card-line mb-4">
          <strong>Job Type:</strong> {job.type}
        </p>

        <div className="job-actions mt-auto d-grid d-sm-flex gap-2">
          <Link className="btn btn-primary flex-fill" to={`/jobs/${job.id}`}>
            See Details
          </Link>
          <button
            type="button"
            className="btn btn-danger flex-fill"
            onClick={() => onDelete(job.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
