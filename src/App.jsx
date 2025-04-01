import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pagina_prin/HomePage";

import UserLogin from "../src/components/user/loginyregistro/UserLogin";
import AdminLogin from "../src/components/company/loginyregister/AdminLogin";
import AdminDashboard from "./components/company/profile/AdminDashboard"; 
import AboutUs from "./components/pagina_prin/quienes_somos/AboutUs"; // Nueva importación
import "../config/axiosSetup.js"
  
function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutUs />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
