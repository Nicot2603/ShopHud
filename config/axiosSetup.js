import axios from "axios";

axios.defaults.baseURL = " https://5fe9-186-154-161-237.ngrok-free.app/api";

// Agregar headers globales
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
