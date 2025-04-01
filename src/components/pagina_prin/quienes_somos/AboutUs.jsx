import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer"; // Importamos el Footer
import { FaBullseye, FaEye, FaStar } from "react-icons/fa"; // Importamos iconos

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiénes Somos</h1>
        
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-6">
          Bienvenido a <span className="text-yellow-500 font-semibold">ShopHub</span>. Nos dedicamos a ofrecerte los mejores productos con la mejor calidad y servicio.  
          Creemos en la innovación, el compromiso y la satisfacción del cliente.
        </p>

        {/* Misión */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mb-6 flex items-start space-x-4">
          <FaBullseye className="text-yellow-500 text-3xl mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-yellow-500 mb-2">Nuestra Misión</h2>
            <p className="text-gray-700">
              En <span className="font-semibold">ShopHub</span>, nuestra misión es facilitar el acceso a productos de calidad, brindando una experiencia de compra segura, rápida y confiable.
            </p>
          </div>
        </div>

        {/* Visión */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mb-6 flex items-start space-x-4">
          <FaEye className="text-yellow-500 text-3xl mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-yellow-500 mb-2">Nuestra Visión</h2>
            <p className="text-gray-700">
              Aspiramos a ser la plataforma líder en comercio electrónico, reconocida por nuestra innovación, compromiso con el cliente y excelencia en el servicio.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mb-6 flex items-start space-x-4">
          <FaStar className="text-yellow-500 text-3xl mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-yellow-500 mb-2">Nuestros Valores</h2>
            <ul className="text-gray-700 list-disc list-inside">
              <li><span className="font-semibold">Compromiso:</span> Nos dedicamos a ofrecer la mejor experiencia de compra.</li>
              <li><span className="font-semibold">Innovación:</span> Buscamos mejorar continuamente con nuevas tecnologías.</li>
              <li><span className="font-semibold">Confianza:</span> Priorizamos la seguridad y satisfacción de nuestros clientes.</li>
              <li><span className="font-semibold">Calidad:</span> Trabajamos con los mejores proveedores para ofrecer productos excepcionales.</li>
            </ul>
          </div>
        </div>

        {/* Botón de Volver */}
        <Link to="/" className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition">
          Volver al Inicio
        </Link>
      </div>

      {/* Footer agregado */}
      <Footer />
    </div>
  );
};

export default AboutUs;
