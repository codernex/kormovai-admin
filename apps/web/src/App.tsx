import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/components/root-layout";
import { AuthState } from "@/components/private-route";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "./redux";
import { fetchUsers } from "./redux/actions/user";
import {
  Deposits,
  Home,
  Login,
  Membership,
  NotFound,
  Payments,
  Settings,
  User,
  Users,
} from "./view";

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
            <Route index element={<Home />} />
            <Route path="users" element={<Users />}>
              <Route path=":id" element={<User />} />
            </Route>
            <Route path="payments" element={<Payments />} />
            <Route path="deposits" element={<Deposits />} />
            <Route path="membership" element={<Membership />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
