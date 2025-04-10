import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../layout/Navbar";

const RegistroUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
    });

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");

        try {
            const response = await axios.post("/usuario/register", formData, {
    headers: {
      "Accept": "application/json",
      "ngrok-skip-browser-warning": "true"
    }
  });
            setMensaje(response.data.message);

            // Mostrar alerta de éxito
            alert("Usuario registrado exitosamente");

            // Limpiar el formulario después del registro exitoso
            setFormData({
                nombre: "",
                email: "",
                password: "",
            });

            // Limpiar el mensaje después de 5 segundos (opcional)
            setTimeout(() => {
                setMensaje("");
            }, 5000);
        } catch (err) {
            setError(
                err.response?.data?.message || "Ocurrió un error al registrar el usuario"
            );

            // Limpiar error después de 5 segundos (opcional)
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
                <div className="w-full max-w-md">
                    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 relative">
                            <Link
                                to="/"
                                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center text-gray-900 hover:text-gray-700 transition-colors duration-200 group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="group-hover:-translate-x-1 transition-transform duration-200"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 text-center">
                                Crear cuenta
                            </h1>
                            <p className="text-gray-800 text-center mt-1">
                                Regístrate como nuevo usuario
                            </p>
                        </div>

                        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Ej. Juan Pérez"
                                    className="w-full p-3 border border-gray-600 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="ejemplo@correo.com"
                                    className="w-full p-3 border border-gray-600 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Crea una contraseña segura"
                                    className="w-full p-3 border border-gray-600 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-black font-medium p-3 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 transition-colors"
                            >
                                Registrarse
                            </button>

                            {/* Alertas visibles */}
                            {mensaje && (
                                <div className="bg-green-600 text-white text-center p-4 rounded-md shadow-md border border-green-400">
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-sm font-semibold">{mensaje}</span>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-600 text-white text-center p-4 rounded-md shadow-md border border-red-400">
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                        <span className="text-sm font-semibold">{error}</span>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 text-center">
                                <p className="text-gray-400">
                                    ¿Ya tienes una cuenta?{" "}
                                    <Link
                                        to="/login/user"
                                        className="text-yellow-400 hover:text-yellow-300 hover:underline font-medium"
                                    >
                                        Inicia sesión
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default RegistroUsuario;
