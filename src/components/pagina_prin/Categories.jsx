import React, { useState } from "react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const categories = ["Electrónica", "Moda", "Hogar", "Deportes", "Juguetes"];
  const prices = ["Menos de $50", "$50 - $200", "Más de $200"];
  const ratings = ["⭐ 1+ Estrella", "⭐⭐ 2+ Estrellas", "⭐⭐⭐ 3+ Estrellas", "⭐⭐⭐⭐ 4+ Estrellas", "⭐⭐⭐⭐⭐ 5 Estrellas"];

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Filtrar Productos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro por Categoría */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Categoría:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Precio */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Rango de Precio:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Todos</option>
            {prices.map((price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Valoración */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Valoración:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="">Todas</option>
            {ratings.map((rating, index) => (
              <option key={index} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón Aplicar Filtros */}
      <div className="flex justify-center mt-6">
        <button className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105">
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default Categories;
