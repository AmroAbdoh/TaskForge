import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import DashBoard from "./Pages/DashBoard/DashBoard";

import useAuthStore from "./store/useAuthStore";
import ProjectPage from "./Pages/Project/ProjectPage";

function AppRoutes() {

  const currentUser = useAuthStore( (state) => state.currentUser );

  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" />} />

      
      <Route path="/login" element={<LoginPage />} />

      
      <Route path="/dashboard" element={
        currentUser ? <DashBoard /> : <Navigate to= "/login" />
      }   />

      <Route path="/projects/:id" element={<ProjectPage />} />

      
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
