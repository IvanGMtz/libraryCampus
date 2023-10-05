import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./shared/context/AuthContext";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import ProtectedRouted from "./shared/ProtectedRouted";
import ProtectedRoutedAdmin from "./shared/ProtectedRoutedAdmin";
import ProtectedRoutedEmployee from "./shared/ProtectedRoutedEmployee";
import routes from "./routes/index.js";
import routesadmin from "./routes/admin.js";
import routesemployee from "./routes/employee.js";
import Loader from "./common/Loader";
import { BookProvider } from "./shared/context/BookContext";


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
        <BookProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
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
            <Route element={<ProtectedRoutedEmployee />}>
              <Route element={<HomePage />}>
                {routesemployee.map(({ path, component: Component }) => (
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
            <Route element={<ProtectedRoutedAdmin />}>
              <Route element={<HomePage />}>
                {routesadmin.map(({ path, component: Component }) => (
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
        </BookProvider>
      </AuthProvider>
    </>
  );
}

export default App;
