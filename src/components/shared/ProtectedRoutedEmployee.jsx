import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";

function ProtectedRoutedEmployee() {
    const {isAuthenticated, loading, isEmployee} = useAuth();

    if (loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated || !isEmployee) return <Navigate to='/' replace/>
  return (
    <Outlet/>
  )
}

export default ProtectedRoutedEmployee