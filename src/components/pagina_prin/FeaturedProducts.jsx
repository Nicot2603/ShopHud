import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/producto/obtenerProductos");
        // Tomar los primeros 3 productos
        setProducts(response.data.slice(0, 4));
      } catch (err) {
        console.error("Error al obtener productos destacados:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Productos Destacados</h2>
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((producto) => (
          <div key={producto.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={`https://c37b-186-154-59-147.ngrok-free.app/${producto.imagen}`} // Mostrar la imagen desde el servidor
              alt={producto.nombre}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{producto.nombre}</h3>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-green-600 font-bold">${producto.precio}</p>
            <button
              onClick={() => navigate("/login/user")}
              className="mt-4 px-5 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition"
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
