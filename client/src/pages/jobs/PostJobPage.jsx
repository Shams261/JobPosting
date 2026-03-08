import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jobsApi } from "../../api/jobsApi";
import { JOB_TYPE_OPTIONS } from "../../constants/jobTypes";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const initialFormState = {
  title: "",
  company: "",
  location: "",
  salary: "",
  type: JOB_TYPE_OPTIONS[0],
  description: "",
  qualifications: ""
};

function parseQualifications(value) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export default function PostJobPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = "Job title is required.";
    if (!formData.company.trim()) errors.company = "Company name is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";

    const salary = Number(formData.salary);
    if (!Number.isFinite(salary) || salary <= 0) {
      errors.salary = "Salary must be greater than 0.";
    }

    if (!JOB_TYPE_OPTIONS.includes(formData.type)) {
      errors.type = "Select a valid job type.";
    }

    if (!formData.description.trim()) {
      errors.description = "Job description is required.";
    }

    const parsedQualifications = parseQualifications(formData.qualifications);
    if (parsedQualifications.length === 0) {
      errors.qualifications = "Add at least one qualification (comma-separated).";
    }

    return {
      errors,
      parsedQualifications
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { errors, parsedQualifications } = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error(Object.values(errors)[0]);
      return;
    }

    const payload = {
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.location.trim(),
      salary: Number(formData.salary),
      type: formData.type,
      description: formData.description.trim(),
      qualifications: parsedQualifications
    };

    setIsSubmitting(true);

    try {
      await jobsApi.create(payload);
      toast.success("Job posted successfully.");
      navigate("/");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to post the job."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h1 className="post-title mb-4">Post a Job</h1>

      <form className="card post-job-card p-4 p-md-5" onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="form-label" htmlFor="title">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
            placeholder="e.g. Frontend Developer"
            value={formData.title}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.title}</div>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="company">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className={`form-control ${formErrors.company ? "is-invalid" : ""}`}
            placeholder="e.g. Acme Inc."
            value={formData.company}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.company}</div>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className={`form-control ${formErrors.location ? "is-invalid" : ""}`}
            placeholder="e.g. New York, NY or Remote"
            value={formData.location}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.location}</div>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="salary">
            Salary
          </label>
          <input
            id="salary"
            name="salary"
            type="number"
            min="1"
            step="1"
            className={`form-control ${formErrors.salary ? "is-invalid" : ""}`}
            placeholder="e.g. 80000"
            value={formData.salary}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.salary}</div>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="type">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            className={`form-select ${formErrors.type ? "is-invalid" : ""}`}
            value={formData.type}
            onChange={handleChange}
          >
            {JOB_TYPE_OPTIONS.map((jobType) => (
              <option key={jobType} value={jobType}>
                {jobType}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{formErrors.type}</div>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="description">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
            placeholder="Explain responsibilities, day-to-day work, and team expectations."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <div className="invalid-feedback">{formErrors.description}</div>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="qualifications">
            Required Qualifications
          </label>
          <input
            id="qualifications"
            name="qualifications"
            type="text"
            className={`form-control ${formErrors.qualifications ? "is-invalid" : ""}`}
            placeholder="Comma-separated, e.g. React, JavaScript, Communication"
            value={formData.qualifications}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{formErrors.qualifications}</div>
          <div className="form-text">Use commas to add multiple qualifications.</div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </section>
  );
}
