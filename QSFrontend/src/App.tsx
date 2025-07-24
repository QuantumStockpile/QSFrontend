import { AdminEquipment, Login } from "@/pages";
import { SignUp } from "@/pages";
import { UserEquipment } from "@/pages";
import { UserHistory } from "@/pages";
import { UserDashboard } from "@/pages";
import { UserEquipment2 } from "@/pages";
import { AdminHistory } from "@/pages";
import { AdminUsers } from "@/pages";
import { AdminDashboard } from "@/pages";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function App() {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<UserEquipment />} path="/u-eq" />
          <Route element={<UserHistory />} path="/u-his" />
          <Route element={<UserDashboard />} path="/u-dash" />
          <Route element={<UserEquipment2 />} path="/u-eq2" />
          <Route element={<AdminHistory />} path="/a-his" />
          <Route element={<AdminUsers />} path="/a-us" />
          <Route element={<AdminEquipment />} path="/a-eq" />
          <Route element={<AdminDashboard />} path="/a-das" />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );

  return Login;
  return SignUp;
}
export default App;
