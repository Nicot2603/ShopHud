import React from "react";

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: "Smartphone", price: "$500", img: "/product1.jpg" },
    { id: 2, name: "Zapatillas", price: "$80", img: "/product2.jpg" },
    { id: 3, name: "Laptop", price: "$1000", img: "/product3.jpg" },
  ];

  return (
    <div className="py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Productos Destacados</h2>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img src={prod.img} alt={prod.name} className="w-full h-56 object-cover" />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-gray-800">{prod.name}</h3>
              <p className="text-yellow-600 font-bold text-lg mt-2">{prod.price}</p>
              <button className="mt-4 px-5 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition">
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
