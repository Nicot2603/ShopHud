import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../../layout/Navbar";

const AdminDashboard = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0); // 📌 Nueva variable de estado
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/admin/estadisticas", {
          headers: {
            "Accept": "application/json",
            "ngrok-skip-browser-warning": "true"
          }
        });

        setVisitCount(response.data.totalVisitas);
        setTotalUsuarios(response.data.totalUsuarios); // 📌 Ahora también almacena la cantidad de usuarios registrados
      } catch (err) {
        console.error("Error al obtener estadísticas:", err);
      }
    };

    fetchStats();

    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        const navbarRect = navbarRef.current.getBoundingClientRect();
        setNavbarHeight(navbarRect.height);
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);

    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  return (
    <div>
      <Navbar ref={navbarRef} className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50" />
      <div
        className="bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-8 lg:px-16"
        style={{
          paddingTop: `${navbarHeight}px`,
          minHeight: "100vh",
        }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Panel de Administrador
        </h1>
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Estadísticas de Usuarios
          </h2>
          <p className="text-lg text-gray-600">
            Personas ingresadas:{" "}
            <span className="font-bold text-gray-900">{visitCount}</span>
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Usuarios registrados:{" "}
            <span className="font-bold text-gray-900">{totalUsuarios}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
