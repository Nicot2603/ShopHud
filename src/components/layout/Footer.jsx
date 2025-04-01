import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10"> 
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left">

          {/* Soporte al Cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Soporte al Cliente</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white">Métodos de Pago</a></li>
              <li><a href="#" className="hover:text-white">Devoluciones</a></li>
              <li><a href="#" className="hover:text-white">Garantía</a></li>
              <li><a href="#" className="hover:text-white">Contáctanos</a></li>
            </ul>
          </div>

          {/* Sobre ShopHub */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Sobre ShopHub</h3>
            <ul className="text-gray-400 space-y-2">
              <li><Link to="/about" className="hover:text-white">Quiénes Somos</Link></li>
              <li><a href="#" className="hover:text-white">Ofertas</a></li>
              <li><a href="#" className="hover:text-white">Políticas</a></li>
              <li><a href="#" className="hover:text-white">Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Métodos de Pago */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Métodos de Pago</h3>
            <div className="flex justify-center md:justify-start space-x-2">
              <img src="/visa.png" alt="Visa" className="h-8"/>
              <img src="/mastecard.png" alt="Mastercard" className="h-8"/>
              <img src="/paypal.png" alt="PayPal" className="h-8"/>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-xl"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-xl"><FaInstagram /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-xl"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-xl"><FaLinkedin /></a>
            </div>
          </div>

          {/* Descargar App */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Descargar App</h3>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex space-x-2">
                <img src="/google-play.png" alt="Google Play" className="h-8"/>
                <img src="/app-store.png" alt="App Store" className="h-8"/>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-gray-700 my-6" />

        {/* Derechos de autor */}
        <p className="text-center text-gray-500 text-sm">
          &copy; 2025 ShopHub - Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
