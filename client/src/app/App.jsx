import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import JobsPage from "../pages/jobs/JobsPage";
import JobDetailsPage from "../pages/jobs/JobDetailsPage";
import PostJobPage from "../pages/jobs/PostJobPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
