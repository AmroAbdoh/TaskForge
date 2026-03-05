import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" />} />

      
      <Route path="/login" element={<LoginPage />} />

      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashBoard/>
        </ProtectedRoute>
      }   />

      
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
