import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBars, FaSearch, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  // Check if current path is a login page
  const isLoginPage = location.pathname.includes("/login");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Toggle menu"]')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
    // You would typically redirect to search results page here
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center text-3xl font-bold" aria-label="ShopHub Home">
          <span className="text-white">Shop</span>
          <span className="bg-yellow-500 text-black px-2 rounded-md transition-transform duration-300 transform hover:scale-110">
            hub
          </span>
        </Link>

        {/* Search Form - Only visible when not on login pages */}
        {!isLoginPage && (
          <form onSubmit={handleSearch} className="flex-1 mx-4 flex">
            <div className="relative w-full max-w-2xl mx-auto flex items-center">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 pl-4 pr-10 rounded-md w-full border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                aria-label="Buscar productos"
              />
              <button 
                type="submit" 
                className="absolute right-3 text-gray-400 hover:text-yellow-400 transition"
                aria-label="Buscar"
              >
                <FaSearch />
              </button>
            </div>
          </form>
        )}

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden text-yellow-400 p-2 hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              aria-expanded={showDropdown}
              aria-haspopup="true"
              className="flex items-center space-x-2 text-yellow-400 p-2 hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <FaUser className="text-xl" />
              <span className="hidden lg:inline">Mi Cuenta</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-gray-800 shadow-lg rounded-md w-48 py-1 z-10 transition transform origin-top-right" role="menu">
                <Link
                  to="/login/user"
                  className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition"
                  role="menuitem"
                >
                  Ingresar como usuario
                </Link>
                <Link
                  to="/login/admin"
                  className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition"
                  role="menuitem"
                >
                  Ingresar como admin
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <div 
        className={`fixed md:hidden inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      
      <div 
        ref={menuRef}
        className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="menu"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Menú</h2>
          <button 
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-white"
            aria-label="Cerrar menú"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>
        
        <div className="py-2 overflow-y-auto h-full">
          <Link
            to="/login/user"
            className="block px-4 py-3 text-white hover:bg-gray-700 flex items-center transition"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser className="mr-3" /> Ingresar como usuario
          </Link>
          <Link
            to="/login/admin"
            className="block px-4 py-3 text-white hover:bg-gray-700 flex items-center transition"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser className="mr-3" /> Ingresar como admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;