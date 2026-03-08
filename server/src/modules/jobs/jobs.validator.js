import { JOB_TYPES } from "../../config/constants.js";

function parseQualifications(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function validateCreateJobPayload(payload) {
  const title = String(payload.title ?? "").trim();
  const company = String(payload.company ?? "").trim();
  const location = String(payload.location ?? "").trim();
  const type = String(payload.type ?? "").trim();
  const description = String(payload.description ?? "").trim();
  const salary = Number(payload.salary);
  const qualifications = parseQualifications(payload.qualifications);
  const errors = [];

  if (!title) errors.push("Job title is required.");
  if (!company) errors.push("Company name is required.");
  if (!location) errors.push("Location is required.");
  if (!type) errors.push("Job type is required.");
  if (type && !JOB_TYPES.includes(type)) errors.push("Job type is invalid.");
  if (!description) errors.push("Job description is required.");
  if (!Number.isFinite(salary) || salary <= 0) {
    errors.push("Salary must be a number greater than 0.");
  }
  if (qualifications.length === 0) {
    errors.push("At least one qualification is required.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      title,
      company,
      location,
      salary,
      type,
      description,
      qualifications
    }
  };
}
