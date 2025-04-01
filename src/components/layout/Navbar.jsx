import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo y barra de búsqueda */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <span className="text-white">Shop</span>
          <span className="bg-yellow-500 text-black px-2 rounded-md transition-transform duration-300 transform hover:scale-110">
            hub
          </span>
        </Link>
        <input
          type="text"
          placeholder="Buscar productos..."
          className="p-2 rounded-md w-80 border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Íconos y menú de usuario */}
      <div className="flex items-center space-x-6">
        {/* Menú de usuario */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 text-yellow-400"
          >
            <FaUser className="text-2xl cursor-pointer" />
            <FaBars className="text-xl" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-gray-800 shadow-lg rounded-md w-40">
              <Link
                to="/login/user"
                className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
              >
                Ingresar como usuario
              </Link>
              <Link
                to="/login/admin"
                className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
              >
                Ingresar como admin
              </Link>
            </div>
          )}
        </div>

        {/* Carrito de compras */}
        <Link to="/login/user" className="text-2xl text-yellow-400">
          <FaShoppingCart className="cursor-pointer" />
        </Link>

        {/* Botón Crear Ofertas */}
        <Link to="/login/user" className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition">
          Crear Ofertas
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
