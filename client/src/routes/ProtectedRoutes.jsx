import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // ❌ not logged in
  if (!token || token === "null") {
    return <Navigate to="/login" replace />;
  }

  // ✅ logged in → render child routes
  return <Outlet />;
} 
