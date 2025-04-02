const fetchVisits = async () => {
  try {
    const response = await fetch("https://9440-186-29-84-254.ngrok-free.app/api/admin/visitas", {
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
    console.error("Error al obtener visitas:", err);
  }
};
