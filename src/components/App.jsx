import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./shared/context/AuthContext";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";
import ProtectedRouted from "./shared/ProtectedRouted";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Loader from './common/Loader';
import routes from './routes';
import { Suspense, useEffect, useState } from "react";
import SignUpEmployee from "./pages/Authentication/SignUpEmployee";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <> 
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/registerE" element={<SignUpEmployee />} />
          <Route path="*" element={<Error404 />} />

          <Route element={<ProtectedRouted />}>
            <Route element={<HomePage />}>
              {routes.map(({ path, component: Component }) => (
                <Route
                  path={path}
                  key={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App
