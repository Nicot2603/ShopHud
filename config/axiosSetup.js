import axios from "axios";

axios.defaults.baseURL = " https://a67c-201-245-240-74.ngrok-free.app/api";

// Agregar headers globales
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
