import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer";
import { FaBullseye, FaEye, FaStar, FaUsers, FaHistory } from "react-icons/fa";
import Navbar from "../../layout/Navbar";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow flex flex-col items-center justify-center p-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Quiénes Somos</h1>
          <div className="h-1 w-24 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bienvenido a <span className="text-yellow-500 font-semibold">ShopHub</span>. 
            Nos dedicamos a ofrecerte los mejores productos con la mejor calidad y servicio.
            Creemos en la innovación, el compromiso y la satisfacción del cliente.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full mb-12">
          {/* Misión */}
          <div className="bg-white shadow-lg rounded-lg p-8 transform transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaBullseye className="text-yellow-500 text-2xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Nuestra Misión</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              En <span className="font-semibold">ShopHub</span>, nuestra misión es facilitar el acceso a productos de calidad, 
              brindando una experiencia de compra segura, rápida y confiable que supere las expectativas de nuestros clientes.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-white shadow-lg rounded-lg p-8 transform transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaEye className="text-yellow-500 text-2xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Nuestra Visión</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Aspiramos a ser la plataforma líder en comercio electrónico, reconocida por nuestra 
              innovación, compromiso con el cliente y excelencia en el servicio, transformando la forma en que las personas compran en línea.
            </p>
          </div>

          {/* Historia */}
          <div className="bg-white shadow-lg rounded-lg p-8 transform transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaHistory className="text-yellow-500 text-2xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Nuestra Historia</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Fundada en 2018, <span className="font-semibold">ShopHub</span> nació con la visión de revolucionar 
              el comercio electrónico. Comenzamos como un pequeño emprendimiento y hemos crecido hasta convertirnos 
              en un referente del sector, siempre manteniendo nuestros valores fundamentales.
            </p>
          </div>

          {/* Equipo */}
          <div className="bg-white shadow-lg rounded-lg p-8 transform transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaUsers className="text-yellow-500 text-2xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Nuestro Equipo</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Contamos con un equipo diverso de profesionales apasionados por la tecnología y el servicio al cliente. 
              Cada miembro aporta su experiencia única para crear la mejor experiencia de compra posible para nuestros usuarios.
            </p>
          </div>
        </div>

        {/* Valores Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl w-full mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <FaStar className="text-yellow-500 text-2xl" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">Nuestros Valores</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">Compromiso</h3>
              <p className="text-gray-600">Nos dedicamos a ofrecer la mejor experiencia de compra posible en cada interacción.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">Innovación</h3>
              <p className="text-gray-600">Buscamos mejorar continuamente con nuevas tecnologías y soluciones creativas.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">Confianza</h3>
              <p className="text-gray-600">Priorizamos la seguridad y satisfacción de nuestros clientes en cada transacción.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 className="font-semibold text-lg text-gray-800">Calidad</h3>
              <p className="text-gray-600">Trabajamos con los mejores proveedores para ofrecer productos que superen expectativas.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">¿Listo para descubrir ShopHub?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="px-8 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition font-medium">
              Volver al Inicio
            </Link>
            
            <Link to="/contacto" className="px-8 py-3 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-50 transition font-medium">
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;