import { Outlet } from "react-router-dom";
import AppNavbar from "../components/navigation/AppNavbar";

export default function MainLayout() {
  return (
    <>
      <AppNavbar />
      <main className="app-main">
        <div className="container py-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}
