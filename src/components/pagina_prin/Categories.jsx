import React, { useState, useEffect } from "react";

const Categories = () => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    rating: "",
    inStock: false,
    freeShipping: false,
  });
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Electrónica", "Moda", "Hogar", "Deportes", "Juguetes", "Belleza", "Libros"];
  const prices = ["Menos de $50", "$50 - $200", "$200 - $500", "Más de $500"];
  const ratings = ["⭐ 1+ Estrella", "⭐⭐ 2+ Estrellas", "⭐⭐⭐ 3+ Estrellas", "⭐⭐⭐⭐ 4+ Estrellas", "⭐⭐⭐⭐⭐ 5 Estrellas"];

  useEffect(() => {
    // Comprobar si algún filtro está activo
    const activeFilters = Object.values(filters).some(value => 
      typeof value === "boolean" ? value : value !== "");
    setIsFilterActive(activeFilters);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleApplyFilters = () => {
    setIsLoading(true);
    // Simulación de envío de petición al backend
    setTimeout(() => {
      console.log("Filtros aplicados:", filters);
      setIsLoading(false);
      // Aquí iría la lógica para actualizar los productos según los filtros
    }, 800);
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      price: "",
      rating: "",
      inStock: false,
      freeShipping: false,
    });
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Filtrar Productos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filtro por Categoría */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Categoría:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all"
            value={filters.category}
            name="category"
            onChange={handleInputChange}
          >
            <option value="">Todas las categorías</option>
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all"
            value={filters.price}
            name="price"
            onChange={handleInputChange}
          >
            <option value="">Todos los precios</option>
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all"
            value={filters.rating}
            name="rating"
            onChange={handleInputChange}
          >
            <option value="">Todas las valoraciones</option>
            {ratings.map((rating, index) => (
              <option key={index} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtros adicionales */}
      <div className="mt-4 flex flex-wrap gap-8 justify-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={filters.inStock}
            onChange={handleInputChange}
            className="w-5 h-5 text-yellow-500 rounded focus:ring-yellow-500"
          />
          <label htmlFor="inStock" className="ml-2 text-gray-700">Disponible en stock</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="freeShipping"
            name="freeShipping"
            checked={filters.freeShipping}
            onChange={handleInputChange}
            className="w-5 h-5 text-yellow-500 rounded focus:ring-yellow-500"
          />
          <label htmlFor="freeShipping" className="ml-2 text-gray-700">Envío gratis</label>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button 
          onClick={handleApplyFilters}
          disabled={isLoading}
          className={`bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all transform hover:scale-105 flex items-center justify-center min-w-40 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              Aplicando...
            </>
          ) : (
            <>Aplicar Filtros</>
          )}
        </button>
        
        {isFilterActive && (
          <button 
            onClick={handleResetFilters}
            className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all min-w-40"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Indicador de filtros activos */}
      {isFilterActive && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Filtros activos: {Object.entries(filters).filter(([key, value]) => 
            typeof value === "boolean" ? value : value !== "").length}
        </div>
      )}
    </div>
  );
};

export default Categories;