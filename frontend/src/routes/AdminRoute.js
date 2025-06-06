import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * A protected route component for admin-only pages.
 * Checks if the user is logged in and has admin privileges.
 */
const AdminRoute = () => {
  const { isAdmin, isLoggingOut, isLoggedIn, tryRefreshToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      await tryRefreshToken();
      setLoading(false);
    };
    refreshToken();
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!isLoggedIn && !isLoggingOut) {
    return <Navigate to="/admin/login" />;
  }

  if (!isAdmin && !isLoggingOut) {
    return (
      <div>
        <p>
          شما مجوز دسترسی به این صفحه را ندارید. بازگشت به
          &nbsp;
          <a href="/">
            صفحه اصلی
          </a>
          .
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
