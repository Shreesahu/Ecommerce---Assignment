import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {

  const user = useSelector(
    (state) => state.auth.user
  );

  const token =
    localStorage.getItem("token");

  if (
    user &&
    token &&
    token !== "null"
  ) {

    return <Navigate to="/" replace />;

  }

  return <Outlet />;
}