import axios from "axios";

axios.defaults.baseURL = " https://97d9-186-154-59-147.ngrok-free.app/api";

// Agregar headers globales
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
