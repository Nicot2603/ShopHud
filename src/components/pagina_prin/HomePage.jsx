import React, { useEffect } from "react";
import Categories from "./Categories.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import Footer from "../layout/Footer.jsx";
import Navbar from "../layout/Navbar.jsx";

const HomePage = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        console.log("Haciendo GET a: /api/admin/visitas");

        const response = await fetch("https://086b-186-29-234-218.ngrok-free.app/api/admin/visitas", {
          headers: {
            "Accept": "application/json",
            "ngrok-skip-browser-warning": "true"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos obtenidos del servidor:", data);
      } catch (err) {
        console.error("Error al registrar visita:", err);
      }
    };

    trackVisit();
  }, []);

  return (
    <div>
      <Navbar />
      {/* Imagen Principal */}
      <div
        className="relative w-full h-[400px] sm:h-[600px] bg-cover bg-center z-[-1]"
        style={{ backgroundImage: "url('/mejorado.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4 sm:p-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">¡Bienvenido a nuestra tienda!</h1>
          <p className="text-base sm:text-lg max-w-2xl">
            Descubre los mejores productos al mejor precio. Explora nuestras
            categorías y encuentra lo que necesitas.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <Categories />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default HomePage;
