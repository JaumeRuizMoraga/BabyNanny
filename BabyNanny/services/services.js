export const login = async (newBabyData,token) => {
  try {
    const response = await fetch('https://api.ejemplo.com/bebes', {
      method: 'POST',
      body: JSON.stringify(newBabyData),
    });
    const json = await response.json();
    console.log("Creado con éxito:", json);
    return json
  } catch (error) {
    console.error("Error al crear:", error);
  }
};