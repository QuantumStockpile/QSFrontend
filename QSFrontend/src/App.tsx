import { Login } from "@/pages";
import { SignUp } from "@/pages";
import { UserEquipment } from "@/pages";
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
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );

  return Login;
  return SignUp;
}
export default App;
