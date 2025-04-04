import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../layout/Navbar";

const AdminDashboard = () => {
  const [visitCount, setVisitCount] = useState(0);
  const navbarRef = useRef(null); // Referencia para el Navbar
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        console.log("Haciendo GET a: /admin/obtenerVisitas");
    
        const response = await fetch("https://9440-186-29-84-254.ngrok-free.app/api/admin/obtenerVisitas", {
          headers: {
            "Accept": "application/json",
            "ngrok-skip-browser-warning": "true"
          }
        });
    
        const data = await response.json();
        console.log("Datos obtenidos del servidor:", data);
        setVisitCount(data.visits);
      } catch (err) {
        console.error("Error al obtener visitas:", err);
      }
    };

    fetchVisits();

    // Establecer la altura del Navbar una vez que se haya montado
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
      {/* Navbar con posición fija */}
      <Navbar ref={navbarRef} className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50" />
      {/* Contenedor principal con padding-top dinámico */}
      <div
        className="bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-8 lg:px-16"
        style={{
          paddingTop: `${navbarHeight}px`, // Compensamos la altura del Navbar
          minHeight: "100vh", // Aseguramos que el contenedor ocupe toda la pantalla
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
