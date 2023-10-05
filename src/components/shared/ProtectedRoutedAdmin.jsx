import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";

function ProtectedRoutedAdmin() {
    const {isAuthenticated, loading, isAdmin} = useAuth();

  if (loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated || !isAdmin) return <Navigate to='/' replace/>
  return (
    <Outlet/>
  )
}

export default ProtectedRoutedAdmin