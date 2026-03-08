import { httpClient } from "./httpClient";

export const jobsApi = {
  getAll(search = "") {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      return httpClient.get("/jobs");
    }

    return httpClient.get("/jobs", {
      params: { search: trimmedSearch }
    });
  },
  getById(id) {
    return httpClient.get(`/jobs/${id}`);
  },
  create(payload) {
    return httpClient.post("/jobs", payload);
  },
  remove(id) {
    return httpClient.delete(`/jobs/${id}`);
  }
};
