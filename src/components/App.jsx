import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./shared/context/AuthContext";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRouted from "./shared/ProtectedRouted";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Error404 />} />

            <Route element={<ProtectedRouted />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App
