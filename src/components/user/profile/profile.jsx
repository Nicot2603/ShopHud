import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PerfilUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarioId = usuario?.id;
    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        if (usuarioId) {
            obtenerProductos();
            obtenerCarrito();
        }
    }, [usuarioId]);

    const obtenerProductos = async () => {
        try {
            const res = await axios.get("/producto/obtenerProductos", {
          headers: {
            "Accept": "application/json",
            "ngrok-skip-browser-warning": "true"
          }
        });
            setProductos(res.data);
        } catch (err) {
            console.error("Error al obtener productos", err);
        }
    };

    const obtenerCarrito = async () => {
        try {
            const res = await axios.get(`/carrito/${usuarioId}`);
            setCarrito(res.data);

            // Guardar carritoId en localStorage
            if (res.data.length > 0) {
                const carritoId = res.data[0].id; // Tomar el primer id del carrito
                localStorage.setItem("carritoId", carritoId);
            }
        } catch (err) {
            console.error("Error al obtener carrito", err);
        }
    };

    const agregarAlCarrito = async (productoId) => {
        if (!usuarioId || !productoId) {
            alert("Usuario o producto no válido");
            return;
        }

        try {
            await axios.post("/producto/agregarCarrito", {
                usuarioId: Number(usuarioId),
                productoId: Number(productoId),
                cantidad: 1,
            });
            await obtenerCarrito();
            alert("Producto agregado al carrito");
        } catch (err) {
            console.error("Error al agregar al carrito", err);
            alert(err.response?.data?.error || "Error al agregar al carrito");
        }
    };

    const eliminarDelCarrito = async (productoId) => {
        try {
            // Obtener carritoId desde localStorage
            const carritoId = localStorage.getItem("carritoId");

            if (!carritoId) {
                alert("No se encontró el carritoId en localStorage");
                return;
            }

            // Enviar carritoId en el cuerpo de la solicitud DELETE
            await axios.delete(`/carrito/eliminar/${usuarioId}`, {
                data: { carritoId: Number(carritoId) }, // Enviar el carritoId en el formato esperado
            });
            await obtenerCarrito();
            alert("Producto eliminado del carrito");
        } catch (err) {
            console.error("Error al eliminar del carrito", err);
            alert(err.response?.data?.error || "Error al eliminar del carrito");
        }
    };

    const cerrarSesion = () => {
        localStorage.clear();
        // Redirigir al usuario a la página de inicio de sesión
        navigate("/");
    };

    if (!usuarioId) {
        return (
            <div className="text-white p-10">
                <h1>Por favor inicia sesión para ver tu perfil.</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            <div className="w-3/4 p-6">
                <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
                            <p className="text-gray-800 mt-1">Información de tu cuenta</p>
                        </div>
                        <button
                            onClick={cerrarSesion}
                            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                        >
                            Cerrar sesión
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-sm text-gray-400">Nombre</h2>
                                <p className="text-lg font-semibold">{usuario?.nombre}</p>
                            </div>
                            <div>
                                <h2 className="text-sm text-gray-400">Correo electrónico</h2>
                                <p className="text-lg font-semibold">{usuario?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Productos disponibles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {productos.map((producto) => (
                            <div key={producto.id} className="bg-gray-700 rounded-lg p-4 shadow">
                                <img
                                    src={`https://c37b-186-154-59-147.ngrok-free.app/${producto.imagen}`} // Mostrar la imagen desde el servidor
                                    alt={producto.nombre}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-lg font-bold">{producto.nombre}</h3>
                                <p className="text-sm text-gray-300">{producto.descripcion}</p>
                                <p className="mt-2 text-yellow-400 font-semibold">${producto.precio}</p>
                                <button
                                    onClick={() => agregarAlCarrito(producto.id)}
                                    className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded"
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-1/4 bg-gray-800 p-4 border-l border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">🛒 Mi Carrito</h2>
                {carrito.length === 0 ? (
                    <p className="text-gray-400">Tu carrito está vacío</p>
                ) : (
                    carrito.map((item) => (
                        <div key={item.id} className="bg-gray-700 p-3 rounded mb-3">
                            <h4 className="font-semibold">{item.producto.nombre}</h4>
                            <p className="text-sm text-gray-300">Cantidad: {item.cantidad}</p>
                            <p className="text-sm text-yellow-400">${item.producto.precio}</p>
                            <button
                                onClick={() => eliminarDelCarrito(item.producto.id)}
                                className="mt-2 text-red-400 hover:underline text-sm"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PerfilUsuario;
