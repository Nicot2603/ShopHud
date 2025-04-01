import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inicio de sesión exitoso como usuario");
    navigate("/perfil-usuario"); // Redirige a su perfil
  };

  return (
    <div>
      <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl mb-6">Iniciar sesión como Usuario</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 rounded-md text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 rounded-md text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-yellow-500 text-black p-2 rounded-md hover:bg-yellow-400">
          Iniciar sesión
        </button>
      </form>
    </div>
    </div>
  );
};

export default UserLogin;
