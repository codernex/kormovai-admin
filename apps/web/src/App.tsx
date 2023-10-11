import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/components/root-layout";
import { AuthState } from "@/components/private-route";
import Login from "./view/auth/login";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "./redux";
import { fetchUsers } from "./redux/actions/user";

function App() {
  const disptach = useAppDispatch();

  useEffect(() => {
    disptach(fetchUsers());
  }, [disptach]);
  return (
    <Suspense fallback={<h2>Loading</h2>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthState />}>
          <Route element={<RootLayout />}>
            <Route
              index
              element={
                <div>
                  <h2>Hello</h2>
                </div>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
