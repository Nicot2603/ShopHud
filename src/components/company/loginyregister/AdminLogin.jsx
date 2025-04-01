import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar";

const AdminLogin = () => {
  const [email, setEmail] = useState(""); // Campo para el correo electrónico
  const [password, setPassword] = useState(""); // Campo para la contraseña
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página

    try {
      // Realiza la solicitud al backend
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email, // Envía el correo electrónico al backend
        password, // Envía la contraseña al backend
      }, {
        headers: { "Content-Type": "application/json" }, // Asegura que los datos se envíen como JSON
      });

      // Muestra el mensaje de éxito y redirige
      alert(response.data.message);
      navigate("/admin-dashboard"); // Redirige al panel de administración
    } catch (err) {
      // Manejo de errores, incluyendo la respuesta del backend
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("Algo salió mal. Inténtalo más tarde.");
      }
    }
  };

  return (
    <div>
<Navbar />
   
     
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 text-white">
    
      <h2 className="text-4xl font-bold mb-6">Admin Login</h2>
      <form
        onSubmit={handleSubmit} // Maneja el envío del formulario
        className="bg-white p-8 rounded-lg shadow-2xl w-96 text-gray-900"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Muestra mensajes de error */}
        <input
          type="email" // Tipo de entrada: correo electrónico
          placeholder="Correo electrónico"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={email} // Valor del estado de correo electrónico
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del correo electrónico
          required // Hace que el campo sea obligatorio
        />
        <input
          type="password" // Tipo de entrada: contraseña
          placeholder="Contraseña"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={password} // Valor del estado de la contraseña
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
          required // Hace que el campo sea obligatorio
        />
        <button
          type="submit" // Botón para enviar el formulario
          className="w-full bg-yellow-500 text-black p-3 rounded-md font-bold hover:bg-yellow-400 transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;