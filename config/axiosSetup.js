const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`https://9440-186-29-84-254.ngrok-free.app/api${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchData:", error);
    throw error;
  }
};

export default fetchData;
