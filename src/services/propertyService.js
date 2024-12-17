import { db } from '../firebase/firebaseConfig';

// Crear una propiedad
export const addProperty = async (property) => {
    try {
      console.log("Agregando propiedad:", property); // Para depuración
      const response = await db.collection('properties').add(property);
      console.log("Propiedad agregada con ID:", response.id);
      return { success: true };
    } catch (error) {
      console.error("Error al agregar la propiedad: ", error);
      return { success: false, error };
    }
  };
  
// Leer todas las propiedades
export const getProperties = async () => {
  try {
    const snapshot = await db.collection('properties').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener propiedades: ", error);
    return [];
  }
};

// Actualizar una propiedad
export const updateProperty = async (id, updatedData) => {
  try {
    await db.collection('properties').doc(id).update(updatedData);
    console.log("Propiedad actualizada:", id);
    return { success: true };
  } catch (error) {
    console.error("Error al actualizar la propiedad: ", error);
    return { success: false, error };
  }
};

// Eliminar una propiedad
export const deleteProperty = async (id) => {
  try {
    await db.collection('properties').doc(id).delete();
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la propiedad: ", error);
    return { success: false, error };
  }
};
