import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../layout/Navbar"; // Importamos el Navbar

const PerfilUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioId = usuario?.id;
    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCarrito, setTotalCarrito] = useState(0);

    useEffect(() => {
        if (!usuarioId) {
            setLoading(false);
            return;
        }
        obtenerProductos();
        obtenerCarrito();
    }, [usuarioId]);

    useEffect(() => {
        // Calcular el total del carrito
        if (Array.isArray(carrito) && carrito.length > 0) {
            const total = carrito.reduce((sum, item) => {
                return sum + (item.producto.precio * item.cantidad);
            }, 0);
            setTotalCarrito(total);
        } else {
            setTotalCarrito(0);
        }
    }, [carrito]);

    const obtenerProductos = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/producto/obtenerProductos", {
                headers: {
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true"
                }
            });
            console.log("Respuesta de productos:", res.data);
            setProductos(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error al obtener productos", err);
        } finally {
            setLoading(false);
        }
    };

    const obtenerCarrito = async () => {
        if (!usuarioId) {
            console.error("Intento de obtener carrito sin usuarioId");
            return;
        }

        try {
            const res = await axios.get(`/carrito/${usuarioId}`, {
                headers: {
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true"
                }
            });

            console.log("Respuesta de carrito:", res.data);
            setCarrito(Array.isArray(res.data) ? res.data : []);

            if (Array.isArray(res.data) && res.data.length > 0) {
                const carritoId = res.data[0].id;
                localStorage.setItem("carritoId", String(carritoId));
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
            }, {
                headers: {
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true"
                }
            });

            await obtenerCarrito();
            
            // Notificación mejorada
            const notificacion = document.getElementById('notificacion');
            notificacion.textContent = "¡Producto agregado al carrito!";
            notificacion.classList.remove('hidden');
            notificacion.classList.add('flex');
            
            setTimeout(() => {
                notificacion.classList.add('hidden');
                notificacion.classList.remove('flex');
            }, 3000);
        } catch (err) {
            console.error("Error al agregar al carrito", err);
            alert(err.response?.data?.error || "Error al agregar al carrito");
        }
    };

    const eliminarDelCarrito = async (productoId) => {
        const carritoId = localStorage.getItem("carritoId");

        if (!carritoId) {
            alert("No se encontró el carritoId en localStorage");
            return;
        }

        try {
            await axios.delete(`/carrito/eliminar/${usuarioId}`, {
                headers: {
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
                data: { carritoId: Number(carritoId) },
            });

            await obtenerCarrito();
            
            // Notificación mejorada
            const notificacion = document.getElementById('notificacion');
            notificacion.textContent = "Producto eliminado del carrito";
            notificacion.classList.remove('hidden');
            notificacion.classList.add('flex', 'bg-red-500');
            
            setTimeout(() => {
                notificacion.classList.add('hidden');
                notificacion.classList.remove('flex', 'bg-red-500');
                notificacion.classList.add('bg-green-500');
            }, 3000);
        } catch (err) {
            console.error("Error al eliminar del carrito", err);
            alert(err.response?.data?.error || "Error al eliminar del carrito");
        }
    };

    // Función para cargar imágenes con headers de Ngrok
    const fetchImagen = async (event, imagenUrl) => {
        try {
            const response = await axios.get(`https://5fe9-186-154-161-237.ngrok-free.app/${imagenUrl}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                },
                responseType: "blob" // Para recibir la imagen como archivo
            });

            const imageUrl = URL.createObjectURL(response.data);
            event.target.src = imageUrl; // Reemplaza la imagen en el `<img />`
        } catch (err) {
            console.error("Error al cargar la imagen:", err);
            event.target.src = "/fallback-image.jpg"; // Imagen de respaldo si falla la carga
        }
    };

    const cerrarSesion = () => {
        localStorage.clear();
        navigate("/");
    };

    if (!usuarioId) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-10">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h1 className="text-2xl font-bold mb-4">Acceso Restringido</h1>
                        <p className="mb-6">Por favor inicia sesión para ver tu perfil y acceder a todas las funcionalidades.</p>
                        <div className="flex space-x-4 justify-center">
                            <button 
                                onClick={() => navigate('/login/user')}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition duration-200"
                            >
                                Iniciar Sesión
                            </button>
                            <button 
                                onClick={() => navigate('/register/user')}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div id="notificacion" className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 hidden items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>¡Producto agregado al carrito!</span>
            </div>

            <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
                {/* Sección principal */}
                <div className="w-full md:w-3/4 p-6">
                    {/* Panel de perfil */}
                    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
                                <p className="text-gray-800 mt-1">Información de tu cuenta</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center">
                                <div className="mr-4 text-right">
                                    <p className="text-gray-800 font-semibold">ID de Usuario: #{usuarioId}</p>
                                    <p className="text-gray-800 text-sm">Miembro desde {new Date().getFullYear()}</p>
                                </div>
                                <button
                                    onClick={cerrarSesion}
                                    className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <h2 className="text-sm text-gray-400 mb-1">Nombre</h2>
                                    <p className="text-lg font-semibold">{usuario?.nombre || 'No disponible'}</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <h2 className="text-sm text-gray-400 mb-1">Correo electrónico</h2>
                                    <p className="text-lg font-semibold">{usuario?.email || 'No disponible'}</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button className="text-yellow-400 hover:text-yellow-300 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Editar perfil
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Productos disponibles */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Productos disponibles</h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    className="bg-gray-700 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.isArray(productos) && productos.length > 0 ? (
                                    productos.map((producto) => (
                                        <div key={producto.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="relative h-48">
                                                <img
                                                    src={`https://5fe9-186-154-161-237.ngrok-free.app/${producto.imagen}`}
                                                    alt={producto.nombre}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => fetchImagen(e, producto.imagen)}
                                                />
                                                <div className="absolute top-0 right-0 m-2 bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs font-bold">
                                                    NUEVO
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold">{producto.nombre}</h3>
                                                    <button className="text-gray-400 hover:text-yellow-400">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{producto.descripcion}</p>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-yellow-400 font-semibold text-lg">${producto.precio?.toLocaleString()}</p>
                                                    <button
                                                        onClick={() => agregarAlCarrito(producto.id)}
                                                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg flex items-center font-medium text-sm"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                        <h3 className="mt-4 text-xl font-semibold text-gray-400">No hay productos disponibles</h3>
                                        <p className="mt-2 text-gray-500">Los productos aparecerán aquí cuando estén disponibles</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Carrito lateral */}
                <div className="w-full md:w-1/4 bg-gray-800 p-4 border-l border-gray-700 md:h-screen md:sticky md:top-0 overflow-y-auto">
                    <div className="sticky top-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Mi Carrito
                            </h2>
                            <span className="bg-yellow-500 text-black rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                                {Array.isArray(carrito) ? carrito.length : 0}
                            </span>
                        </div>
                        
                        {Array.isArray(carrito) && carrito.length === 0 ? (
                            <div className="bg-gray-700 rounded-lg p-6 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p className="text-gray-400 mb-4">Tu carrito está vacío</p>
                                <p className="text-sm text-gray-500">¡Agrega productos para empezar a comprar!</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto pr-1">
                                    {Array.isArray(carrito) && carrito.map((item) => (
                                        <div key={item.id} className="bg-gray-700 p-3 rounded-lg flex items-start">
                                            <div className="w-16 h-16 mr-3 flex-shrink-0 bg-gray-600 rounded overflow-hidden">
                                                <img
                                                    src={`https://c37b-186-154-59-147.ngrok-free.app/${item.producto?.imagen}`}
                                                    alt={item.producto?.nombre}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => fetchImagen(e, item.producto?.imagen)}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h4 className="font-semibold text-sm">{item.producto?.nombre}</h4>
                                                    <button
                                                        onClick={() => eliminarDelCarrito(item.producto?.id)}
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center bg-gray-800 rounded">
                                                        <button className="px-2 py-1 text-gray-400 hover:text-white">-</button>
                                                        <span className="px-2 text-sm">{item.cantidad}</span>
                                                        <button className="px-2 py-1 text-gray-400 hover:text-white">+</button>
                                                    </div>
                                                    <p className="text-yellow-400 font-medium">${item.producto?.precio}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="border-t border-gray-700 pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Subtotal:</span>
                                        <span>${totalCarrito.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Envío:</span>
                                        <span>Gratis</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total:</span>
                                        <span className="text-yellow-400">${totalCarrito.toLocaleString()}</span>
                                    </div>
                                    
                                    <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition duration-200 mt-4 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Proceder al pago
                                    </button>
                                    
                                    <button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white py-2 rounded-lg mt-2 text-sm">
                                        Seguir comprando
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PerfilUsuario;
