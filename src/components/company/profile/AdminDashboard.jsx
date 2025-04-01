import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        console.log("Haciendo GET a: http://localhost:5000/api/admin/obtenerVisitas");
        const response = await axios.get("http://localhost:5000/api/admin/obtenerVisitas");
        console.log("Datos obtenidos del servidor:", response.data);
        setVisitCount(response.data.visits); // Actualiza el estado con el conteo de visitas
      } catch (err) {
        console.error("Error al obtener visitas:", err.response || err);
      }
    };

    fetchVisits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Panel de Administrador</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Estadísticas de Usuarios</h2>
        <p className="text-lg text-gray-600">
          Personas ingresadas: <span className="font-bold text-gray-900">{visitCount}</span>
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;