import Login from "./components/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import UserVerification from "./components/Verification/Verification";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/verify/:verificationToken"
            element={<UserVerification />}
          />

          <Route path="/" element={<Dashboard />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
