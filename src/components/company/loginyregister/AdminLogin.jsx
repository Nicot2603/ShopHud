import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar";


const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Haciendo POST a: /api/admin/login");

      const response = await fetch("https://086b-186-29-234-218.ngrok-free.app/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Datos obtenidos del servidor:", data);

      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }

      navigate("/admin-dashboard", { 
        state: { notification: data.message || "Inicio de sesión exitoso" } 
      });
    } catch (err) {
      console.error("Error en la autenticación:", err);
      setError("Error al iniciar sesión. Por favor, verifica tus credenciales o inténtalo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-r from-gray-800 to-gray-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Header con flecha hacia la página principal */}
            <div className="bg-yellow-500 p-6 relative">
              <button 
                onClick={navigateToHome}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 hover:text-gray-700 transition"
                aria-label="Ir a la página principal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-center text-gray-900">
                Acceso Administrativo
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200" role="alert">
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="admin@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center p-3 rounded-md font-medium transition ${
                    isLoading 
                      ? "bg-yellow-300 cursor-not-allowed" 
                      : "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </>
                  ) : "Iniciar sesión"}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                ¿Problemas con el acceso? Contacta al departamento de sistemas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
